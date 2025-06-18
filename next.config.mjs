/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Jika deploy ke subdirectory (bukan root domain)
  basePath: '/tmp-birthday',
  assetPrefix: '/tmp-birthday/',
};

export default nextConfig;
