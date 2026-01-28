import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  webpack: (config, { isServer, nextRuntime }) => {
    // Exclude bcrypt and @prisma/client from middleware bundle
    if (nextRuntime === 'edge') {
      config.resolve = config.resolve || {};
      config.resolve.alias = config.resolve.alias || {};
      config.resolve.alias['bcrypt'] = false;
      config.resolve.alias['@prisma/client'] = false;
    }
    return config;
  },
};

export default nextConfig;
