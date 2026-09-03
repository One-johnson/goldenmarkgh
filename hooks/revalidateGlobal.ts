import type { GlobalAfterChangeHook } from "payload";
import { revalidatePath } from "next/cache";

const GLOBAL_PAGE_PATHS: Record<string, string[]> = {
  home: ["/"],
  about: ["/about"],
  services: ["/services"],
  contact: ["/contact"],
  settings: ["/", "/about", "/services", "/contact"],
};

export const revalidateAfterGlobalChange: GlobalAfterChangeHook = ({
  doc,
  global,
  req: { payload },
}) => {
  const paths = GLOBAL_PAGE_PATHS[global.slug] ?? ["/"];

  for (const path of paths) {
    revalidatePath(path);
  }

  if (global.slug === "settings") {
    revalidatePath("/", "layout");
    revalidatePath("/sitemap.xml");
    revalidatePath("/robots.txt");
  }

  payload.logger.info(
    `Revalidated ${paths.join(", ")} after "${global.slug}" update`,
  );

  return doc;
};
