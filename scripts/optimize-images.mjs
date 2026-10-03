import { readdir, unlink } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

const INPUT_DIR = path.join(rootDir, "public", "projects");
const RASTER_EXTENSIONS = new Set([".png", ".jpg", ".jpeg"]);

/** Display card ~616px × 2 (retina) + margin ≈ 1400–1600. */
const DEFAULT_MAX_WIDTH = 1600;
const DEFAULT_QUALITY = 82;

function parseArgs(argv) {
  const options = {
    maxWidth: DEFAULT_MAX_WIDTH,
    quality: DEFAULT_QUALITY,
    deleteOriginals: false,
  };

  for (const arg of argv) {
    if (arg === "--delete-originals") {
      options.deleteOriginals = true;
      continue;
    }

    if (arg.startsWith("--max-width=")) {
      options.maxWidth = Number(arg.slice("--max-width=".length));
      continue;
    }

    if (arg.startsWith("--quality=")) {
      options.quality = Number(arg.slice("--quality=".length));
    }
  }

  if (!Number.isFinite(options.maxWidth) || options.maxWidth <= 0) {
    throw new Error(`Invalid --max-width: ${options.maxWidth}`);
  }

  if (!Number.isFinite(options.quality) || options.quality < 1 || options.quality > 100) {
    throw new Error(`Invalid --quality: ${options.quality}`);
  }

  return options;
}

function formatKb(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

async function optimizeFile(filePath, { maxWidth, quality, deleteOriginals }) {
  const extension = path.extname(filePath).toLowerCase();
  const baseName = path.basename(filePath, extension);
  const outputPath = path.join(path.dirname(filePath), `${baseName}.webp`);

  const input = sharp(filePath);
  const metadata = await input.metadata();
  const width = metadata.width ?? maxWidth;

  const pipeline =
    width > maxWidth
      ? input.resize({
          width: maxWidth,
          withoutEnlargement: true,
        })
      : input;

  const { size } = await pipeline.webp({ quality }).toFile(outputPath);
  const outputMeta = await sharp(outputPath).metadata();

  console.log(
    `${path.basename(filePath)} → ${path.basename(outputPath)} ` +
      `(${outputMeta.width}×${outputMeta.height}, ${formatKb(size)})`,
  );

  if (deleteOriginals) {
    await unlink(filePath);
    console.log(`  removed ${path.basename(filePath)}`);
  }
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const entries = await readdir(INPUT_DIR);
  const rasters = entries.filter((name) => RASTER_EXTENSIONS.has(path.extname(name).toLowerCase()));

  if (rasters.length === 0) {
    console.log(`No PNG/JPG files found in ${path.relative(rootDir, INPUT_DIR)}`);
    console.log("Drop source images there, then run: npm run optimize:images");
    return;
  }

  console.log(
    `Optimizing ${rasters.length} file(s) → WebP (max-width=${options.maxWidth}, quality=${options.quality})`,
  );

  for (const name of rasters) {
    await optimizeFile(path.join(INPUT_DIR, name), options);
  }

  console.log("Done. Update paths in src/constants/projects.ts if filenames changed.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
