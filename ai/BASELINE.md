# Subletly MVP Baseline (70% Complete)

**Date Established**: 2026-01-28
**Last Commit**: 94fc95b "Add property detail page components and utilities"
**Completion Status**: ~70% MVP Complete
**Purpose**: Reference document for what's working - DO NOT BREAK THESE FEATURES

---

## Project Overview

**Subletly** is a Next.js 15-based sublet marketplace platform connecting landlords with renters for short-term sublet arrangements.

### Tech Stack
- **Frontend**: Next.js 15 (App Router), React 19, TypeScript, TailwindCSS
- **Backend**: Next.js API Routes, Server Actions
- **Database**: PostgreSQL via Supabase
- **ORM**: Prisma
- **Authentication**: NextAuth.js v5 (Auth.js)
- **Hosting**: Vercel (planned)
- **File Storage**: Supabase Storage (planned, not yet implemented)
- **Email**: Not yet implemented
- **Payments**: Not yet implemented

---

## Database Schema (5 Models)

### User Model
```prisma
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  emailVerified DateTime?
  image         String?
  role          UserRole  @default(RENTER)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  // Relations
  accounts         Account[]
  sessions         Session[]
  properties       Property[]        // Landlord's properties
  inquiries        Inquiry[]         // Renter's inquiries
  savedProperties  SavedProperty[]   // Renter's saved properties
}

enum UserRole {
  LANDLORD
  RENTER
  ADMIN
}
```

### Property Model
```prisma
model Property {
  id              String          @id @default(cuid())
  title           String
  description     String
  address         String
  city            String
  state           String
  zipCode         String
  price           Float
  bedrooms        Int
  bathrooms       Float
  squareFeet      Int?
  availableFrom   DateTime
  availableUntil  DateTime
  images          String[]        // Array of image URLs
  amenities       String[]        // Array of amenities
  status          PropertyStatus  @default(AVAILABLE)
  landlordId      String
  createdAt       DateTime        @default(now())
  updatedAt       DateTime        @updatedAt

  // Relations
  landlord        User            @relation(fields: [landlordId], references: [id], onDelete: Cascade)
  inquiries       Inquiry[]
  savedBy         SavedProperty[]
}

enum PropertyStatus {
  AVAILABLE
  PENDING
  RENTED
  INACTIVE
}
```

### Inquiry Model
```prisma
model Inquiry {
  id          String        @id @default(cuid())
  message     String
  moveInDate  DateTime
  moveOutDate DateTime
  status      InquiryStatus @default(PENDING)
  propertyId  String
  renterId    String
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt

  // Relations
  property    Property      @relation(fields: [propertyId], references: [id], onDelete: Cascade)
  renter      User          @relation(fields: [renterId], references: [id], onDelete: Cascade)
}

enum InquiryStatus {
  PENDING
  ACCEPTED
  REJECTED
  EXPIRED
}
```

### SavedProperty Model
```prisma
model SavedProperty {
  id         String   @id @default(cuid())
  userId     String
  propertyId String
  createdAt  DateTime @default(now())

  // Relations
  user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  property   Property @relation(fields: [propertyId], references: [id], onDelete: Cascade)

  @@unique([userId, propertyId])
}
```

### Session/Account Models (NextAuth)
Standard NextAuth.js v5 models for authentication.

---

## What's Currently Working ✅

### 1. Authentication System
- ✅ Email/password authentication via NextAuth v5
- ✅ User registration with role selection (Landlord/Renter)
- ✅ Protected routes and middleware
- ✅ Session management
- ✅ Role-based access control
- ❌ Email verification (not implemented)
- ❌ OAuth providers (not implemented)
- ❌ Password reset (not implemented)

**Files**:
- `app/api/auth/[...nextauth]/route.ts`
- `middleware.ts`
- `auth.ts` or `lib/auth.ts`

### 2. Property Management (Landlord Features)
- ✅ Create new property listings
- ✅ Edit existing properties
- ✅ Delete properties (soft delete via status)
- ✅ View all owned properties in dashboard
- ✅ Property status management (Available/Pending/Rented/Inactive)
- ✅ Multiple images support (URL array)
- ✅ Amenities management (tags/array)
- ❌ Image upload to storage (only URL input works)
- ❌ Landlord can't respond to inquiries yet
- ❌ No analytics/insights dashboard

**Routes**:
- `/dashboard/landlord` - Landlord dashboard
- `/dashboard/landlord/properties` - Property list
- `/dashboard/landlord/properties/new` - Create property
- `/dashboard/landlord/properties/[id]/edit` - Edit property

**Components**:
- Property form components
- Property card/list views

### 3. Property Browse (Renter Features)
- ✅ Browse all available properties
- ✅ Search by city, price range, bedrooms, bathrooms
- ✅ Filter by amenities
- ✅ Filter by availability dates
- ✅ Property detail view
- ✅ Responsive grid layout
- ❌ Map view (not implemented)
- ❌ Advanced filters (not implemented)
- ❌ Pagination (shows all results)
- ❌ Sort options (not implemented)

**Routes**:
- `/browse` - Browse properties
- `/properties/[id]` - Property detail page

**Components**:
- Property search/filter UI
- Property card components
- Property detail components

### 4. Saved Properties (Renter Feature)
- ✅ Save/unsave properties (bookmark)
- ✅ View all saved properties in dashboard
- ✅ Remove saved properties
- ✅ Optimistic UI updates
- ✅ Unique constraint (user can't save same property twice)

**Routes**:
- `/dashboard/renter/saved` - Saved properties view

**Database**:
- SavedProperty table with composite unique key

### 5. Inquiry System (Renter-Side Only)
- ✅ Renters can submit inquiries to landlords
- ✅ Inquiry form with message, move-in/out dates
- ✅ View submitted inquiries in renter dashboard
- ✅ Inquiry status tracking (Pending/Accepted/Rejected/Expired)
- ❌ Landlords can't view inquiries yet
- ❌ Landlords can't respond/accept/reject inquiries
- ❌ No email notifications when inquiry is submitted
- ❌ No messaging/conversation thread

**Routes**:
- `/dashboard/renter/inquiries` - Renter's inquiries list
- Inquiry form embedded in property detail page

**Components**:
- Inquiry form component
- Inquiry list/card components

### 6. Dashboard System
- ✅ Role-based dashboard routing
- ✅ Landlord dashboard with property overview
- ✅ Renter dashboard with saved properties and inquiries
- ✅ Dashboard navigation
- ❌ Admin dashboard (not implemented)
- ❌ Analytics/metrics (not implemented)

**Routes**:
- `/dashboard` - Redirects based on user role
- `/dashboard/landlord` - Landlord overview
- `/dashboard/renter` - Renter overview

---

## What's NOT Working ❌ (The Remaining 30%)

### Critical Path (Must Have Before Launch)
1. **Landlord Inquiry Management** - Landlords can't see or respond to inquiries
2. **Email Notification System** - No emails sent for inquiries, bookings, etc.
3. **Payment Integration** - No Stripe, no transactions
4. **Booking System** - No formal booking flow after inquiry acceptance
5. **Legal Pages** - No Terms, Privacy Policy, etc.

### Important Features
6. **Image Upload** - Currently only accepts image URLs, need Supabase storage
7. **Reviews/Ratings** - No trust system yet
8. **Admin Dashboard** - No admin controls
9. **Testing** - No automated tests written
10. **Error Handling** - Basic error handling, needs improvement
11. **Performance Optimization** - No caching, indexing, etc.

### Nice to Have
12. **In-app Messaging** - Direct landlord-renter chat
13. **SMS Notifications** - Text alerts
14. **Advanced Search** - Saved searches, alerts, map view
15. **Social Features** - Share listings, invite friends
16. **Mobile App** - Native iOS/Android apps
17. And 15+ more features...

---

## Environment Setup

### Required Environment Variables
```bash
# Database
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_SECRET="random-secret-here"
NEXTAUTH_URL="http://localhost:3000"

# Supabase (for future image upload)
NEXT_PUBLIC_SUPABASE_URL="https://xxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJxxx..."

# Email (not yet configured)
# SMTP_HOST=
# SMTP_PORT=
# SMTP_USER=
# SMTP_PASSWORD=

# Stripe (not yet configured)
# STRIPE_SECRET_KEY=
# NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

### Installation Steps
```bash
# Clone/navigate to project
cd /Users/preem/Desktop/Subletly\ WebApp\ Build

# Install dependencies
npm install

# Setup database
npx prisma generate
npx prisma db push

# Run development server
npm run dev
```

### Testing Baseline Health
```bash
# 1. Verify environment
node --version  # Should be 18+
npm --version

# 2. Check dependencies installed
ls node_modules | wc -l  # Should be > 0

# 3. Verify Prisma
npx prisma validate

# 4. Test database connection
npx prisma db execute --stdin <<< "SELECT 1"

# 5. Run dev server
npm run dev

# 6. Manual testing checklist:
# - Navigate to http://localhost:3000
# - Register as landlord → create property → verify in dashboard
# - Register as renter → browse properties → save property → submit inquiry
# - Login as landlord → verify property shows in dashboard
# - Login as renter → verify saved properties and inquiries show
```

---

## Known Limitations & Technical Debt

### Security
- ⚠️ No rate limiting on API routes
- ⚠️ No CSRF protection beyond NextAuth defaults
- ⚠️ No input sanitization library (relying on Prisma)
- ⚠️ No file upload validation (when implemented)

### Performance
- ⚠️ No database indexes beyond Prisma defaults
- ⚠️ No caching layer (Redis, etc.)
- ⚠️ No image optimization beyond Next.js defaults
- ⚠️ All queries return full objects (no field selection)
- ⚠️ No pagination on property browse (returns all)

### Data Integrity
- ⚠️ No validation for overlapping availability dates
- ⚠️ No validation for past dates
- ⚠️ No cascade delete handling for related records
- ⚠️ No soft delete implementation

### UX
- ⚠️ No loading states on most actions
- ⚠️ Basic error messages (no toast notifications)
- ⚠️ No empty states for dashboards
- ⚠️ No mobile optimization (basic responsive only)

### Observability
- ⚠️ No logging system
- ⚠️ No error tracking (Sentry, etc.)
- ⚠️ No analytics (PostHog, etc.)
- ⚠️ No monitoring (Vercel Analytics only)

---

## File Structure Overview

```
subletly/
├── app/
│   ├── api/
│   │   └── auth/[...nextauth]/
│   ├── browse/
│   ├── dashboard/
│   │   ├── landlord/
│   │   │   └── properties/
│   │   └── renter/
│   │       ├── inquiries/
│   │       └── saved/
│   ├── properties/[id]/
│   ├── login/
│   ├── register/
│   └── layout.tsx
├── components/
│   ├── property/
│   ├── inquiry/
│   ├── ui/
│   └── layout/
├── lib/
│   ├── auth.ts
│   ├── prisma.ts
│   └── utils.ts
├── prisma/
│   └── schema.prisma
├── public/
├── .env
├── .env.example
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

---

## Critical Success Factors

When implementing new features, ensure:

1. **Don't Break Auth** - The NextAuth system is working, don't modify core auth flows without testing
2. **Maintain Role Separation** - Landlords and renters have different dashboards and capabilities
3. **Preserve Data Models** - The 5 core Prisma models are stable, migrations must be careful
4. **Keep Existing Routes** - Renters rely on `/browse`, `/dashboard/renter/*` routes
5. **Test Existing Features** - After changes, verify auth, property CRUD, browse, saved properties, and inquiries still work

---

## Next Steps (Priority Order)

See `ai/FEATURES.json` for the complete feature manifest.

**Immediate Priorities**:
1. F-021: Legal Pages (Privacy, Terms, etc.)
2. F-001: Landlord Inquiry Management
3. F-006: Email Notification System
4. F-011: Stripe Payment Integration
5. F-012: Booking System

**Week 1 Goal**: Complete items 1-5 above to reach MVP launch readiness.

---

## Baseline Verification Checklist

Before starting new work, verify baseline health:

- [ ] `npm run dev` starts without errors
- [ ] Can register new landlord account
- [ ] Can create new property listing
- [ ] Can register new renter account
- [ ] Can browse properties
- [ ] Can save a property
- [ ] Can submit an inquiry
- [ ] Landlord can see their properties in dashboard
- [ ] Renter can see saved properties in dashboard
- [ ] Renter can see inquiries in dashboard

If any of the above fail, **STOP** and fix the baseline before implementing new features.

---

**Last Updated**: 2026-01-28
**Maintained By**: Claude Code Agent
**Status**: REFERENCE ONLY - Do not modify this file. Use PROGRESS.md for session updates.
