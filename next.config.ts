import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.ortusclub.com",
      },
    ],
  },
};

export default nextConfig;
