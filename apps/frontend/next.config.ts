import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // output: "export",
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:5000/api/:path*"
      }
    ]
  },
};

export default nextConfig;