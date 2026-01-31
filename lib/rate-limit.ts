import { NextRequest, NextResponse } from 'next/server';

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

// In-memory store with TTL cleanup
const store = new Map<string, RateLimitEntry>();

// Cleanup old entries every 5 minutes
const CLEANUP_INTERVAL = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;

  lastCleanup = now;
  for (const [key, entry] of store.entries()) {
    if (entry.resetAt < now) {
      store.delete(key);
    }
  }
}

// Extract IP from request headers (Vercel/Cloudflare compatible)
export function getClientIP(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    request.headers.get('cf-connecting-ip') ||
    'unknown'
  );
}

interface RateLimitConfig {
  limit: number;
  windowMs: number;
}

// Pre-configured limits for each endpoint
export const RATE_LIMITS = {
  checkEmail: { limit: 5, windowMs: 60 * 1000 },           // 5 per minute
  signup: { limit: 5, windowMs: 24 * 60 * 60 * 1000 },     // 5 per day
  forgotPassword: { limit: 3, windowMs: 60 * 60 * 1000 },  // 3 per hour
  propertyView: { limit: 1, windowMs: 60 * 60 * 1000 },    // 1 per hour (per IP+property)
} as const;

interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
}

export function checkRateLimit(key: string, config: RateLimitConfig): RateLimitResult {
  cleanup();

  const now = Date.now();
  const entry = store.get(key);

  if (!entry || entry.resetAt < now) {
    // First request or window expired
    store.set(key, { count: 1, resetAt: now + config.windowMs });
    return {
      success: true,
      limit: config.limit,
      remaining: config.limit - 1,
      resetAt: now + config.windowMs,
    };
  }

  if (entry.count >= config.limit) {
    return {
      success: false,
      limit: config.limit,
      remaining: 0,
      resetAt: entry.resetAt,
    };
  }

  entry.count++;
  return {
    success: true,
    limit: config.limit,
    remaining: config.limit - entry.count,
    resetAt: entry.resetAt,
  };
}

// Create a 429 response with standard headers
export function rateLimitResponse(result: RateLimitResult): NextResponse {
  const retryAfter = Math.ceil((result.resetAt - Date.now()) / 1000);

  return NextResponse.json(
    { error: 'Too many requests. Please try again later.' },
    {
      status: 429,
      headers: {
        'Retry-After': String(retryAfter),
        'X-RateLimit-Limit': String(result.limit),
        'X-RateLimit-Remaining': '0',
        'X-RateLimit-Reset': String(Math.floor(result.resetAt / 1000)),
      },
    }
  );
}

// Add rate limit headers to successful responses
export function addRateLimitHeaders(
  response: NextResponse,
  result: RateLimitResult
): NextResponse {
  response.headers.set('X-RateLimit-Limit', String(result.limit));
  response.headers.set('X-RateLimit-Remaining', String(result.remaining));
  response.headers.set('X-RateLimit-Reset', String(Math.floor(result.resetAt / 1000)));
  return response;
}
