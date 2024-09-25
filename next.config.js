// @ts-check

const disableOtel = process.env.OTEL_DISABLED;
const instrumentationHook = disableOtel !== 'true';
console.log(
  `instrumentation via OTEL: ${
    instrumentationHook ? 'enabled' : 'disabled'
  } - by env: OTEL_DISABLED=${disableOtel}`
);

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  experimental: {
    // https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation
    instrumentationHook,
  },
  poweredByHeader: false,

  reactStrictMode: true,

  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // Your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
