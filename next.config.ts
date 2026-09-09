import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  serverExternalPackages: ["pg", "drizzle-kit"],
  images: {
    qualities: [70, 75, 80],
  },
  experimental: {
    globalNotFound: true,
  },
};

export default withPayload(nextConfig);
