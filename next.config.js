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
    /* from
     * https://chakra-ui.com/docs/get-started/frameworks/next-pages#optimize-bundle
     * Optimize Bundle
     * We recommend using the experimental.optimizePackageImports feature in Next.js to optimize your bundle size by loading only the modules that you are actually using.#
     */
    optimizePackageImports: ['@chakra-ui/react'],
  },
};

export default nextConfig;
