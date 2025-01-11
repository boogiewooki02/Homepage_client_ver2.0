/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif'],
    domains: ['kahlua-bucket.s3.ap-northeast-2.amazonaws.com'],
  },

  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
