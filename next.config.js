// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  experimental: {
    // see https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation
    instrumentationHook: true,
  },
  poweredByHeader: false,

  reactStrictMode: true,

  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
