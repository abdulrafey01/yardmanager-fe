/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "yard-manager.s3.eu-central-003.backblazeb2.com",
      },
    ],
  },
};

export default nextConfig;
