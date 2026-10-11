import { readdir, unlink } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

const INPUT_DIR = path.join(rootDir, "public", "projects");
const RASTER_EXTENSIONS = new Set([".png", ".jpg", ".jpeg"]);

/** Homepage card ~616px × 2. Case photos display at 1264px, so pass --max-width=2400. */
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

async function collectRasters(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      const nested = await collectRasters(fullPath);
      files.push(...nested);
      continue;
    }

    if (RASTER_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }

  return files;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const rasters = await collectRasters(INPUT_DIR);

  if (rasters.length === 0) {
    console.log(`No PNG/JPG files found in ${path.relative(rootDir, INPUT_DIR)}`);
    console.log("Drop source images there, then run: npm run optimize:images");
    return;
  }

  console.log(
    `Optimizing ${rasters.length} file(s) → WebP (max-width=${options.maxWidth}, quality=${options.quality})`,
  );

  for (const filePath of rasters) {
    await optimizeFile(filePath, options);
  }

  console.log("Done. Point case and project image paths at the new WebP files.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
