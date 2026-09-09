import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Payload } from "payload";

const contentDirectory = path.join(process.cwd(), "content");
const pageSlugs = ["home", "about", "services", "contact"] as const;
const richTextPageSlugs = ["home", "about", "services"] as const;

const seedContext = { disableRevalidate: true };

function readMarkdown(slug: string) {
  const fullPath = path.join(contentDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  return { data, content: content.trim() };
}

function textNode(text: string) {
  return {
    type: "text",
    detail: 0,
    format: 0,
    mode: "normal",
    style: "",
    text,
    version: 1,
  };
}

function paragraphNode(text: string) {
  return {
    type: "paragraph",
    children: [textNode(text)],
    direction: "ltr" as const,
    format: "" as const,
    indent: 0,
    textFormat: 0,
    version: 1,
  };
}

function headingNode(tag: "h2" | "h3", text: string) {
  return {
    type: "heading",
    tag,
    children: [textNode(text)],
    direction: "ltr" as const,
    format: "" as const,
    indent: 0,
    version: 1,
  };
}

function listNode(items: string[]) {
  return {
    type: "list",
    listType: "bullet",
    tag: "ul",
    start: 1,
    children: items.map((item, index) => ({
      type: "listitem",
      value: index + 1,
      children: [textNode(item)],
      direction: "ltr" as const,
      format: "" as const,
      indent: 0,
      version: 1,
    })),
    direction: "ltr" as const,
    format: "" as const,
    indent: 0,
    version: 1,
  };
}

function markdownToLexical(markdown: string) {
  const blocks = markdown
    .replace(/\r\n/g, "\n")
    .split(/\n\n+/)
    .map((block) => block.trim())
    .filter(Boolean);

  const children = blocks.map((block) => {
    if (block.startsWith("## ")) return headingNode("h2", block.slice(3));
    if (block.startsWith("### ")) return headingNode("h3", block.slice(4));

    const lines = block.split("\n");
    if (lines.length > 0 && lines.every((line) => line.startsWith("- "))) {
      return listNode(lines.map((line) => line.slice(2).trim()));
    }

    return paragraphNode(block.replace(/\n/g, " "));
  });

  return {
    root: {
      type: "root",
      children,
      direction: "ltr" as const,
      format: "" as const,
      indent: 0,
      version: 1,
    },
  };
}

function isLexicalBody(value: unknown): boolean {
  return Boolean(value && typeof value === "object" && "root" in value);
}

async function ensureRichTextBodies(payload: Payload) {
  for (const slug of richTextPageSlugs) {
    const file = readMarkdown(slug);
    const doc = await payload.findGlobal({
      slug,
      overrideAccess: true,
    });
    const body: unknown = "body" in doc ? doc.body : undefined;

    if (isLexicalBody(body)) continue;

    const markdown =
      typeof body === "string" && body.trim().length > 0
        ? body
        : file?.content || "";

    if (!markdown) continue;

    await payload.updateGlobal({
      slug,
      data: {
        body: markdownToLexical(markdown),
      } as Record<string, unknown>,
      overrideAccess: true,
      context: seedContext,
    });
    payload.logger.info(`Converted ${slug} body to rich text`);
  }
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

  if (!existing?.brandName) {
    payload.logger.info("Seeding Payload globals from content/*.md…");

    const settingsMatter = matter(fs.readFileSync(settingsPath, "utf8"));
    await payload.updateGlobal({
      slug: "settings",
      data: settingsMatter.data as Record<string, unknown>,
      overrideAccess: true,
      context: seedContext,
    });

    for (const slug of pageSlugs) {
      const page = readMarkdown(slug);
      if (!page) continue;
      await payload.updateGlobal({
        slug,
        data: {
          ...page.data,
          body: page.content ? markdownToLexical(page.content) : null,
        } as Record<string, unknown>,
        overrideAccess: true,
        context: seedContext,
      });
    }

    payload.logger.info("Markdown seed complete");
    return;
  }

  payload.logger.info("Site settings already seeded — skipping");
  await ensureSiteUrl(payload);
  await ensureHeaderFooterSettings(payload);
  await ensureContactGlobal(payload);
  await ensureRichTextBodies(payload);
  await ensureHomeHeroSlides(payload);
}

async function ensureSiteUrl(payload: Payload) {
  const settingsPath = path.join(contentDirectory, "settings.md");
  if (!fs.existsSync(settingsPath)) return;

  const settings = await payload.findGlobal({
    slug: "settings",
    overrideAccess: true,
  });

  if (settings.siteUrl) return;

  const settingsMatter = matter(fs.readFileSync(settingsPath, "utf8"));
  const siteUrl = settingsMatter.data.siteUrl as string | undefined;
  if (!siteUrl) return;

  payload.logger.info("Adding siteUrl to Site Settings…");
  await payload.updateGlobal({
    slug: "settings",
    data: { siteUrl },
    overrideAccess: true,
    context: seedContext,
  });
}

async function ensureHeaderFooterSettings(payload: Payload) {
  const settingsPath = path.join(contentDirectory, "settings.md");
  if (!fs.existsSync(settingsPath)) return;

  const settings = await payload.findGlobal({
    slug: "settings",
    overrideAccess: true,
  });

  const file = matter(fs.readFileSync(settingsPath, "utf8")).data as Record<
    string,
    unknown
  >;

  const updates: Record<string, unknown> = {};

  if (!settings.navLinks || settings.navLinks.length === 0) {
    updates.navLinks = file.navLinks;
  }
  if (!settings.navBadgeText && file.navBadgeText) {
    updates.navBadgeText = file.navBadgeText;
  }
  if (!settings.footerPagesHeading && file.footerPagesHeading) {
    updates.footerPagesHeading = file.footerPagesHeading;
  }
  if (!settings.footerContactHeading && file.footerContactHeading) {
    updates.footerContactHeading = file.footerContactHeading;
  }
  if (!settings.footerCopyright && file.footerCopyright) {
    updates.footerCopyright = file.footerCopyright;
  }

  if (Object.keys(updates).length === 0) return;

  payload.logger.info("Updating header/footer settings from content/settings.md…");
  await payload.updateGlobal({
    slug: "settings",
    data: updates,
    overrideAccess: true,
    context: seedContext,
  });
}

async function ensureContactGlobal(payload: Payload) {
  const file = readMarkdown("contact");
  if (!file) return;

  let contact: Record<string, unknown>;
  try {
    contact = (await payload.findGlobal({
      slug: "contact",
      overrideAccess: true,
    })) as unknown as Record<string, unknown>;
  } catch {
    contact = {};
  }

  const filePhone = file.data.phone as string | undefined;
  const needsSeed =
    !contact.emailInfo ||
    !contact.phone ||
    !contact.address ||
    String(contact.emailInfo).includes("@goldenmarkgh.com") ||
    (filePhone && contact.phone !== filePhone);

  if (!needsSeed) return;

  payload.logger.info("Seeding Contact global from content/contact.md…");
  await payload.updateGlobal({
    slug: "contact",
    data: {
      ...file.data,
      body: file.content ? markdownToLexical(file.content) : null,
    } as Record<string, unknown>,
    overrideAccess: true,
    context: seedContext,
  });
}

async function ensureHomeHeroSlides(payload: Payload) {
  const file = readMarkdown("home");
  if (!file) return;

  const slides = file.data.heroSlides;
  if (!Array.isArray(slides) || slides.length === 0) return;

  const home = (await payload.findGlobal({
    slug: "home",
    overrideAccess: true,
  })) as {
    heroSlides?: { heading?: string | null }[] | null;
    heroHeading?: string | null;
    heroDescription?: string | null;
  };

  const existing = home.heroSlides ?? [];
  const firstHeading = existing[0]?.heading;
  const needsUpdate =
    existing.length !== slides.length ||
    firstHeading !== slides[0]?.heading ||
    home.heroHeading !== file.data.heroHeading ||
    home.heroDescription !== file.data.heroDescription;

  if (!needsUpdate) return;

  payload.logger.info("Updating home hero slides from content/home.md…");
  await payload.updateGlobal({
    slug: "home",
    data: {
      heroHeading: file.data.heroHeading,
      heroDescription: file.data.heroDescription,
      heroSlides: slides,
    } as Record<string, unknown>,
    overrideAccess: true,
    context: seedContext,
  });
}
