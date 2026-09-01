import {
  FixedToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

export const defaultLexical = lexicalEditor({
  features: ({ defaultFeatures }) => [
    ...defaultFeatures,
    FixedToolbarFeature(),
  ],
});
