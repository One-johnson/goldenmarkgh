import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  serverExternalPackages: ["pg", "drizzle-kit"],
  experimental: {
    globalNotFound: true,
  },
};

export default withPayload(nextConfig);
