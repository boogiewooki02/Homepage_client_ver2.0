/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
