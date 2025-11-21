/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  poweredByHeader: false,

  reactStrictMode: true,

  // https://nextjs.org/docs/app/api-reference/config/next-config-js/typedRoutes
  typedRoutes: true,

  /*
    when building fails because of well known issues, but blocks fast dev
    cycles locally, this could be helping temporarily, see
    https://nextjs.org/docs/app/api-reference/config/next-config-js/typescript
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  */

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
