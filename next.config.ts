/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'volfubgmhuqlknugaxqf.supabase.co',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig;
