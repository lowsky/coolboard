// @ts-check

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
