import type { DefaultTypedEditorState } from "@payloadcms/richtext-lexical";
import type { PageBody } from "@/lib/content";

export type StorySection = {
  heading: string;
  body: string;
};

type LexicalNode = {
  type?: string;
  tag?: string;
  text?: string;
  format?: number;
  children?: LexicalNode[];
};

function lexicalInlineMarkdown(node: LexicalNode): string {
  if (node.type === "text") {
    const text = node.text ?? "";
    return (node.format ?? 0) & 1 ? `**${text}**` : text;
  }

  if (!node.children?.length) {
    return "";
  }

  return node.children.map(lexicalInlineMarkdown).join("");
}

function normalizeBodyToProse(body: string): string {
  return body
    .split(/\n\n+/)
    .map((part) => {
      const trimmed = part.trim();
      if (!/^\*\s+/.test(trimmed)) return trimmed;

      return trimmed
        .split("\n")
        .map((line) => line.replace(/^\*\s+/, "").trim())
        .filter(Boolean)
        .join("\n\n");
    })
    .filter(Boolean)
    .join("\n\n");
}

function parseMarkdownSections(content: string): StorySection[] {
  const trimmed = content.trim();
  if (!trimmed) return [];

  const chunks = trimmed.split(/\n(?=## )/);

  return chunks
    .map((chunk) => {
      const lines = chunk.trim().split("\n");
      const headingLine = lines[0] ?? "";
      const headingMatch = headingLine.match(/^## (.+)$/);
      if (!headingMatch) return null;

      const body = lines.slice(1).join("\n").trim();
      if (!body) return null;

      return {
        heading: headingMatch[1],
        body: normalizeBodyToProse(body),
      };
    })
    .filter((section): section is StorySection => Boolean(section));
}

function parseLexicalSections(content: DefaultTypedEditorState): StorySection[] {
  const root = content.root as LexicalNode | undefined;
  if (!root?.children?.length) return [];

  const sections: StorySection[] = [];
  let current: StorySection | null = null;

  const appendBody = (markdown: string) => {
    if (!current || !markdown) return;
    current.body = current.body ? `${current.body}\n\n${markdown}` : markdown;
  };

  const pushCurrent = () => {
    if (!current?.body) {
      current = null;
      return;
    }

    sections.push({
      ...current,
      body: normalizeBodyToProse(current.body),
    });
    current = null;
  };

  for (const node of root.children) {
    if (node.type === "heading" && node.tag === "h2") {
      pushCurrent();
      current = {
        heading: lexicalInlineMarkdown(node).replace(/\*\*/g, ""),
        body: "",
      };
      continue;
    }

    if (!current) continue;

    if (node.type === "paragraph") {
      appendBody(lexicalInlineMarkdown(node).trim());
      continue;
    }

    if (node.type === "list") {
      const items = (node.children ?? [])
        .map((item) =>
          lexicalInlineMarkdown(item)
            .trim()
            .replace(/^\*\s+/, ""),
        )
        .filter(Boolean)
        .join("\n\n");

      appendBody(items);
    }
  }

  pushCurrent();

  return sections;
}

export function parseStorySections(content: PageBody): StorySection[] {
  if (!content) return [];

  if (typeof content === "string") {
    return parseMarkdownSections(content);
  }

  if (!content.root) return [];

  return parseLexicalSections(content);
}
