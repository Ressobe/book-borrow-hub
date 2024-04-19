/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cjbagycqrvmcxltocbfq.supabase.co",
      },
    ],
  },
};

export default nextConfig;
