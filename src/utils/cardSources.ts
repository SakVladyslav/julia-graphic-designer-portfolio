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
