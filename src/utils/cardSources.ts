/** Widths written by `scripts/card-image-variants.mjs`. The full file stays the largest candidate. */
export const CARD_VARIANT_WIDTHS = [640, 960, 1280] as const;

const MOBILE_CARD = "calc(100vw - 48px)";
const DESKTOP_CARD_PX = 616;

/** `163.19%` → `1.632`. Crop and offset frames are wider than the card. */
export function percentScale(percent: string): number {
  return Number(percent.slice(0, -1)) / 100;
}

/**
 * Slot width the browser uses to pick a candidate.
 * One column below 599px, otherwise the desktop card (616px), times the crop scale.
 */
export function cardSizes(displayScale = 1): string {
  const scale = Math.round(displayScale * 1000) / 1000;
  const mobile = scale === 1 ? MOBILE_CARD : `calc(${MOBILE_CARD} * ${scale})`;
  const desktop = Math.round(DESKTOP_CARD_PX * scale);

  return `(max-width: 599px) ${mobile}, ${desktop}px`;
}

const CASE_PAGE_MAX_PX = 1440;

/**
 * Full-bleed case frames. Below the page max the slot is the viewport,
 * so a phone does not download the 2400px original.
 */
export function caseImageSizes(): string {
  return `(max-width: ${CASE_PAGE_MAX_PX}px) 100vw, ${CASE_PAGE_MAX_PX}px`;
}

function variantPath(src: string, width: number): string {
  return src.replace(/\.webp$/i, `-${width}w.webp`);
}

/** `image.webp 1600w` plus each smaller file the variant script writes. */
export function cardSrcSet(src: string, fullWidth: number): string {
  const variants = CARD_VARIANT_WIDTHS.filter((width) => width < fullWidth).map(
    (width) => `${variantPath(src, width)} ${width}w`,
  );

  return [...variants, `${src} ${fullWidth}w`].join(", ");
}

/** Width descriptors when smaller files exist. Logos, spaced names, and already-small frames stay on `src` alone. */
export function optionalSrcSet(src: string, fullWidth: number): string | undefined {
  if (!src.toLowerCase().endsWith(".webp") || src.includes(" ") || src.includes("%20")) {
    return undefined;
  }

  const set = cardSrcSet(src, fullWidth);
  if (set === `${src} ${fullWidth}w`) {
    return undefined;
  }

  return set;
}
