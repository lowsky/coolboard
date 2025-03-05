// @ts-check

// eslint-disable-next-line no-undef
const disableOtel = process.env.OTEL_DISABLED;
const instrumentationHook = disableOtel !== 'true';
// eslint-disable-next-line no-undef
console.log(
  `instrumentation via OTEL: ${
    instrumentationHook ? 'enabled' : 'disabled'
  } - by env: OTEL_DISABLED=${disableOtel}`
);

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  poweredByHeader: false,

  reactStrictMode: true,

  eslint: {
    // Warning: This allows production builds to complete even if
    // Your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
