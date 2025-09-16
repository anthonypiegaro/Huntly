import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: ["pdf-parse"],
  experimental: {
    serverActions: {
      allowedOrigins: [
        "localhost:3000"
      ]
    }
  },
};

export default nextConfig;
