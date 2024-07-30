/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "yard-manager.s3.eu-central-003.backblazeb2.com",
      },
      {
        protocol: "https",
        hostname: "yard-manager.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "yard-manager.s3.eu-west-2.amazonaws.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/admin/employees",
        destination: "/employees",
      },
      {
        source: "/admin/deleted-items",
        destination: "/deleted-items",
      },
      {
        source: "/admin/vehicle",
        destination: "/vehicle",
      },
    ];
  },
};

export default nextConfig;
