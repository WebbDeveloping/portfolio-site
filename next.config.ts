import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@prisma/client", "prisma"],
  redirects: async () => [
    { source: "/dev-projects", destination: "/projects", permanent: true },
    { source: "/links", destination: "/", permanent: true },
  ],
};

export default nextConfig;
