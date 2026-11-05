interface CanvasBinding {
  layer: "page" | "menu";
  tone: "default" | "inverse";
}

type DocumentCanvas = "default" | "inverse" | "menu";

const bindings: CanvasBinding[] = [];
const themeColorSelector = 'meta[name="theme-color"][data-canvas-theme]';

function activeCanvas(): DocumentCanvas {
  let pageInverse = false;
  for (let index = bindings.length - 1; index >= 0; index -= 1) {
    const binding = bindings[index];
    if (binding === undefined) {
      continue;
    }
    if (binding.layer === "menu" && binding.tone === "inverse") {
      return "menu";
    }
    if (binding.layer === "page" && binding.tone === "inverse") {
      pageInverse = true;
    }
  }
  return pageInverse ? "inverse" : "default";
}

function syncThemeColor(canvas: DocumentCanvas): void {
  const existing = document.head.querySelector(themeColorSelector);
  if (canvas === "default") {
    existing?.remove();
    return;
  }

  const color = getComputedStyle(document.documentElement)
    .getPropertyValue("--document-canvas")
    .trim();
  if (color === "") {
    existing?.remove();
    return;
  }

  const meta = existing instanceof HTMLMetaElement ? existing : document.createElement("meta");
  meta.name = "theme-color";
  meta.dataset.canvasTheme = "true";
  meta.content = color;
  if (existing === null) {
    document.head.append(meta);
  }
}

function applyCanvas(): void {
  const root = document.documentElement;
  const canvas = activeCanvas();
  if (canvas === "default") {
    delete root.dataset.canvas;
  } else {
    root.dataset.canvas = canvas;
  }
  syncThemeColor(canvas);
}

/**
 * Pins the document canvas for an inverse page or an open inverse menu.
 * The menu layer sits above the page layer. Releasing it restores the page.
 */
export function bindDocumentCanvas(
  layer: CanvasBinding["layer"],
  tone: CanvasBinding["tone"],
): () => void {
  const binding: CanvasBinding = { layer, tone };
  bindings.push(binding);
  applyCanvas();

  return () => {
    const index = bindings.indexOf(binding);
    if (index !== -1) {
      bindings.splice(index, 1);
    }
    applyCanvas();
  };
}
