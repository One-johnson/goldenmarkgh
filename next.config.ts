import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  serverExternalPackages: ["pg", "drizzle-kit"],
};

export default withPayload(nextConfig);
