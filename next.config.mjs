/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif'],
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
