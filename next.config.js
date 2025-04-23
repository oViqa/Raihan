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
<<<<<<< HEAD
    remotePatterns: [
      {
        hostname: 'volfubgmhuqlknugaxqf.supabase.co',
=======
    domains: ['cdn.discordapp.com', 'volfubgmhuqlknugaxqf.supabase.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**volfubgmhuqlknugaxqf.supabase.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.co',
        pathname: '/**',
>>>>>>> refs/remotes/origin/main
      },
    ],
  },
  // Add output configuration for Vercel
  output: 'standalone',
  // Disable source maps in production
  productionBrowserSourceMaps: false,
};

module.exports = nextConfig; 