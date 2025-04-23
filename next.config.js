/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Disable ESLint during production builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Disable TypeScript errors during production builds
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: 'volfubgmhuqlknugaxqf.supabase.co',
      },
    ],
  },
};

module.exports = nextConfig; 