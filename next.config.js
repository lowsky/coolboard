module.exports = {
  // prisma binary was not available when webpack was bundling it, so netlify's zip-it... did not find the
  // binaries, see https://github.com/prisma/prisma/issues/6051#issuecomment-831136748
  // netlify is working on it...
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('@prisma/client');
      // When working on webpack5 there was this runtime-error:
      // Module "ts-tiny-invariant" was not found. PR...
      config.externals.push('ts-is-defined');
      // config.externals.push('ts-tiny-invariant')
    }

    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    });

    return config;
  },
  compiler: {
    // see https://nextjs.org/docs/advanced-features/compiler#styled-components
    // ssr and displayName are configured by default
    styledComponents: true,
  },

  reactStrictMode: true,

  // "For faster deploy times, build IDs should be set to a static value..."
  generateBuildId: () => 'build',

  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};
