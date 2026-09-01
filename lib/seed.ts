import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Payload } from "payload";

const contentDirectory = path.join(process.cwd(), "content");

function readMarkdown(slug: string) {
  const fullPath = path.join(contentDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  return { data, content: content.trim() };
}

export async function seedFromMarkdown(payload: Payload) {
  const settingsPath = path.join(contentDirectory, "settings.md");
  if (!fs.existsSync(settingsPath)) {
    payload.logger.info("No content/ folder found — skipping markdown seed");
    return;
  }

  const existing = await payload.findGlobal({
    slug: "settings",
    overrideAccess: true,
  });

  if (existing?.brandName) {
    payload.logger.info("Site settings already seeded — skipping");
    return;
  }

  payload.logger.info("Seeding Payload globals from content/*.md…");

  const settingsMatter = matter(fs.readFileSync(settingsPath, "utf8"));
  await payload.updateGlobal({
    slug: "settings",
    data: settingsMatter.data as Record<string, unknown>,
    overrideAccess: true,
  });

  const home = readMarkdown("home");
  if (home) {
    await payload.updateGlobal({
      slug: "home",
      data: { ...home.data, body: home.content } as Record<string, unknown>,
      overrideAccess: true,
    });
  }

  const about = readMarkdown("about");
  if (about) {
    await payload.updateGlobal({
      slug: "about",
      data: { ...about.data, body: about.content } as Record<string, unknown>,
      overrideAccess: true,
    });
  }

  const services = readMarkdown("services");
  if (services) {
    await payload.updateGlobal({
      slug: "services",
      data: {
        ...services.data,
        body: services.content,
      } as Record<string, unknown>,
      overrideAccess: true,
    });
  }

  payload.logger.info("Markdown seed complete");
}
