const withImages = require('next-images')

module.exports = {
  ...withImages(),
  // Target must be serverless (for use with netlify)
  target: "serverless",
  // would be true by default. Need to switch back for prisma
  // to avoid this error:
  // Module not found: Error: Can't resolve '_http_common' in '/opt/build/repo/node_modules/@prisma/client/runtime'
  webpack5: false,
  //
  // Remove this to leverage Next.js' static image handling
  // read more here: https://nextjs.org/docs/api-reference/next/image
  // images: { disableStaticImages: true }
}
