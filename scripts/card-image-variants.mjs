import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/** Keep in step with `CARD_VARIANT_WIDTHS` in `src/utils/cardSources.ts`. */
const WIDTHS = [640, 960, 1280];
const QUALITY = 80;

/**
 * Grain shown at 15% opacity. A lower quality is invisible in the blend and
 * keeps the largest first paint from downloading the full 900px file.
 */
const TEXTURE_QUALITY = 50;

const FILES = [
  { file: "public/projects/lovespace/lovespace-photo.webp", quality: QUALITY },
  { file: "public/projects/lovespace/lovespace-texture.webp", quality: TEXTURE_QUALITY },
  { file: "public/projects/molfaria/molfaria-window.webp", quality: QUALITY },
  { file: "public/projects/amaryllis/amaryllis.webp", quality: QUALITY },
  { file: "public/projects/bbg/BBG-04.webp", quality: QUALITY },
  { file: "public/projects/twitchvrotfl/cover.webp", quality: QUALITY },
  { file: "public/projects/book-covers/cover.webp", quality: QUALITY },
  { file: "public/projects/olx/OLX.webp", quality: QUALITY },
  { file: "public/projects/novyny/Novyny.webp", quality: QUALITY },
];

function formatKb(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

async function writeVariant(filePath, width, quality) {
  const metadata = await sharp(filePath).metadata();
  const originalWidth = metadata.width ?? 0;
  if (originalWidth <= width) {
    return;
  }

  const extension = path.extname(filePath);
  const outputPath = path.join(
    path.dirname(filePath),
    `${path.basename(filePath, extension)}-${width}w${extension}`,
  );
  const { size } = await sharp(filePath)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality })
    .toFile(outputPath);

  console.log(
    `${path.basename(filePath)} → ${path.basename(outputPath)} (${width}px, ${formatKb(size)})`,
  );
}

for (const entry of FILES) {
  const filePath = path.join(rootDir, entry.file);
  for (const width of WIDTHS) {
    await writeVariant(filePath, width, entry.quality);
  }
}
