import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { pathToFileURL } from "node:url";

const root = join(import.meta.dirname, "..");
const dist = join(root, "dist");
const templatePath = join(dist, "index.html");
const template = readFileSync(templatePath, "utf8");

if (template.includes('property="og:title"')) {
  throw new Error("Prerender expected the built index.html to have no share tags yet");
}

const serverEntry = pathToFileURL(join(dist, "server", "entry-server.js")).href;
const { renderPages } = await import(serverEntry);
const pages = await renderPages();
const assetsDir = join(dist, "assets");
const arrowFile = readdirSync(assetsDir).find(
  (name) => name.startsWith("hero-arrow-") && name.endsWith(".svg"),
);

function alignBundledAssets(html) {
  if (arrowFile === undefined) {
    return html;
  }

  return html.replaceAll(/\/assets\/hero-arrow-[^"']+/g, `/assets/${arrowFile}`);
}

function escapeText(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;");
}

for (const page of pages) {
  if (!/<title>[\s\S]*?<\/title>/.test(template)) {
    throw new Error("Prerender could not find the document title", {
      cause: { pathname: page.pathname },
    });
  }

  const titled = template.replace(
    /<title>[\s\S]*?<\/title>/,
    `<title>${escapeText(page.title)}</title>\n    ${page.head}`,
  );

  const withBody = titled.replace(
    '<div id="root"></div>',
    `<div id="root">${alignBundledAssets(page.html)}</div>`,
  );
  if (withBody === titled) {
    throw new Error("Prerender could not find the root element", {
      cause: { pathname: page.pathname },
    });
  }

  const file = join(dist, page.output);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, withBody);
  console.log(`prerendered ${page.pathname} -> ${page.output}`);
}

rmSync(join(dist, "server"), { recursive: true, force: true });
