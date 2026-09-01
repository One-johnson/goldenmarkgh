import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Payload } from "payload";

const contentDirectory = path.join(process.cwd(), "content");
const pageSlugs = ["home", "about", "services"] as const;

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
  for (const slug of pageSlugs) {
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
      });
    }

    payload.logger.info("Markdown seed complete");
    return;
  }

  payload.logger.info("Site settings already seeded — skipping");
  await ensureRichTextBodies(payload);
}
