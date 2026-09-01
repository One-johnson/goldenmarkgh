import type { DefaultTypedEditorState } from "@payloadcms/richtext-lexical";
import { RichText } from "@payloadcms/richtext-lexical/react";
import MarkdownBody from "@/components/MarkdownBody";

interface RichTextBodyProps {
  content: DefaultTypedEditorState | string | null | undefined;
  className?: string;
}

export default function RichTextBody({
  content,
  className = "",
}: RichTextBodyProps) {
  if (!content) return null;

  if (typeof content === "string") {
    return <MarkdownBody content={content} className={className} />;
  }

  if (!content.root) return null;

  return (
    <RichText
      data={content}
      className={`prose-custom text-lg leading-relaxed text-stone sm:text-xl ${className}`}
    />
  );
}
