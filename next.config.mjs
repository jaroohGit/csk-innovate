/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/csk-innovate',
  assetPrefix: '/csk-innovate/',
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
