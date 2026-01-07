/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove 'output: export' to allow server-side features
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
