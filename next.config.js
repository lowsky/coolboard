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

  experimental: {
    mcpServer: true,
  },

  // Added during Pages → App Router migration. We kept URLs the same, so there are
  // no path changes. Returning an empty redirects list avoids accidental loops.
  async redirects() {
    return [
      // Example (leave commented to avoid loops):
      // { source: '/about', destination: '/about', permanent: true },
    ];
  },
};

export default nextConfig;
