import { readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const projectsDir = path.join(rootDir, "public", "projects");

/** Keep in step with `CARD_VARIANT_WIDTHS` in `src/utils/cardSources.ts`. */
const WIDTHS = [640, 960, 1280];
const QUALITY = 80;

/**
 * Grain shown at 15% opacity. A lower quality is invisible in the blend and
 * keeps the largest first paint from downloading the full 900px file.
 */
const TEXTURE_QUALITY = 50;
const TEXTURE_FILE = "public/projects/lovespace/lovespace-texture.webp";

function formatKb(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

function collectWebp(directory) {
  const files = [];
  for (const entry of readdirSync(directory, { recursive: true, withFileTypes: true })) {
    if (
      !entry.isFile() ||
      !entry.name.endsWith(".webp") ||
      entry.name.includes(" ") ||
      /-\d+w\.webp$/.test(entry.name)
    ) {
      continue;
    }

    const parent = entry.parentPath ?? entry.path;
    const relative = path
      .relative(rootDir, path.join(parent, entry.name))
      .split(path.sep)
      .join("/");
    files.push(relative);
  }

  return files;
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

const files = collectWebp(projectsDir);

for (const relative of files) {
  const filePath = path.join(rootDir, relative);
  const quality = relative === TEXTURE_FILE ? TEXTURE_QUALITY : QUALITY;
  for (const width of WIDTHS) {
    await writeVariant(filePath, width, quality);
  }
}
