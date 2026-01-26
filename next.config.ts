import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
