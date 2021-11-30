module.exports = {
  // prisma binary was not available when webpack was bundling it, so netlify's zip-it... did not find the
  // binaries, see https://github.com/prisma/prisma/issues/6051#issuecomment-831136748
  // netlify is working on it...
  webpack: (config, { isServer } ) => {
    if (isServer) {
      config.externals.push('@prisma/client')
      // When working on webpack5 there was this runtime-error:
      // Module "ts-tiny-invariant" was not found. PR...
      config.externals.push('ts-is-defined')
      // config.externals.push('ts-tiny-invariant')
    }

    return config
  },

  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
}
