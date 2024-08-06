/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-7b04930595db411aa87856817ec70f29.r2.dev',
      },
    ],
  },
};

export default nextConfig;