import { postgresAdapter } from "@payloadcms/db-postgres";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Media } from "./collections/Media";
import { Users } from "./collections/Users";
import { defaultLexical } from "./fields/defaultLexical";
import { About } from "./globals/About";
import { Home } from "./globals/Home";
import { Services } from "./globals/Services";
import { Settings } from "./globals/Settings";
import { seedFromMarkdown } from "./lib/seed";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media],
  editor: defaultLexical,
  globals: [Settings, Home, About, Services],
  secret: process.env.PAYLOAD_SECRET || "change-me-in-production",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "",
    },
  }),
  sharp,
  async onInit(payload) {
    await seedFromMarkdown(payload);
  },
});
