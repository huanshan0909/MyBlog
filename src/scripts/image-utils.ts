// import type { ImageMetadata } from "astro";
// import  path from "path";
// // const images = import.meta.glob<{ default: ImageMetadata }>("@images/**");
// const images = import.meta.glob<{ default: ImageMetadata }>(
//   "src/config/images/**",
// );

// export function getImportImage(imagePath: string) {
//   const image = path.join("/src/config/images/", imagePath);
//   return images[image]();
// }

import type { ImageMetadata } from "astro";
import path from "path";

const images = import.meta.glob<{ default: ImageMetadata }>(
  "/src/config/images/**",
  { eager: true }
);

export function getImportImage(imagePath: string): ImageMetadata {
  const fullPath = path.posix.join("/src/config/images/", imagePath);
  const mod = images[fullPath];
  if (!mod) {
    throw new Error(`Image not found: ${fullPath}`);
  }
  return mod.default;
}