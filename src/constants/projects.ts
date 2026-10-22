import { cardSizes, cardSrcSet, percentScale } from "../utils/cardSources";
import { withBaseUrl } from "../utils/withBaseUrl";

type LovespaceImage = {
  kind: "lovespace";
  photo: string;
  photoWidth: number;
  photoHeight: number;
  photoSrcSet: string;
  photoSizes: string;
  texture: string;
  textureWidth: number;
  textureHeight: number;
  textureSrcSet: string;
  textureSizes: string;
  ring: string;
  ringWidth: number;
  ringHeight: number;
};

export interface ImageCrop {
  width: string;
  height: string;
  left: string;
  top: string;
}

type FramedImage = {
  kind: "offset" | "cover";
  src: string;
  width: number;
  height: number;
  srcSet: string;
  sizes: string;
  crop?: ImageCrop;
};

export interface Project {
  id: string;
  /** Case page this card opens. Defaults to `id`. */
  caseId?: string;
  title: string;
  tags: readonly string[];
  image: LovespaceImage | FramedImage;
}

export interface ProjectGroup {
  id: string;
  title: string;
  projectIds: readonly string[];
}

/** `$molfaria-window-width` in the card stylesheet. */
const MOLFARIA_WINDOW_SCALE = percentScale("131.92%");

function framedImage(
  kind: FramedImage["kind"],
  src: string,
  width: number,
  height: number,
  displayScale = 1,
  crop?: ImageCrop,
): FramedImage {
  return {
    kind,
    src,
    width,
    height,
    srcSet: cardSrcSet(src, width),
    sizes: cardSizes(displayScale),
    ...(crop === undefined ? {} : { crop }),
  };
}

export const projects: readonly Project[] = [
  {
    id: "lovespace",
    title: "Lovespace",
    tags: ["visual identity", "rebranding", "art direction"],
    image: {
      kind: "lovespace",
      photo: withBaseUrl("projects/lovespace/lovespace-photo.webp"),
      photoWidth: 683,
      photoHeight: 1024,
      photoSrcSet: cardSrcSet(withBaseUrl("projects/lovespace/lovespace-photo.webp"), 1400),
      photoSizes: cardSizes(),
      texture: withBaseUrl("projects/lovespace/lovespace-texture.webp"),
      textureWidth: 900,
      textureHeight: 900,
      textureSrcSet: cardSrcSet(withBaseUrl("projects/lovespace/lovespace-texture.webp"), 900),
      textureSizes: cardSizes(),
      ring: withBaseUrl("projects/lovespace/lovespace-ring.svg"),
      ringWidth: 374,
      ringHeight: 356,
    },
  },
  {
    id: "molfaria-window",
    caseId: "molfaria",
    title: "Molfaria",
    tags: ["brand identity", "coffee branding", "art direction"],
    image: framedImage(
      "offset",
      withBaseUrl("projects/molfaria/molfaria-window.webp"),
      1600,
      1000,
      MOLFARIA_WINDOW_SCALE,
    ),
  },
  {
    id: "amaryllis",
    title: "Amaryllis Poster Series",
    tags: ["poster design", "merch design"],
    image: framedImage("cover", withBaseUrl("projects/amaryllis/amaryllis.webp"), 1600, 1252),
  },
  {
    id: "bbg",
    title: "Best Budova Group",
    tags: ["logo design", "visual identity"],
    image: framedImage("cover", withBaseUrl("projects/bbg/BBG-04.webp"), 1896, 1350),
  },
  {
    id: "twitchvrotfl",
    title: "Twitchvrotfl",
    tags: ["logo design", "brand mark"],
    image: framedImage("cover", withBaseUrl("projects/twitchvrotfl/cover.webp"), 1232, 964),
  },
  {
    id: "book-covers",
    title: "Book covers",
    tags: ["visual identity", "rebranding"],
    image: framedImage(
      "cover",
      withBaseUrl("projects/book-covers/cover.webp"),
      1920,
      1439,
      percentScale("119.16%"),
      {
        width: "119.16%",
        height: "119.07%",
        left: "-9.58%",
        top: "-11.39%",
      },
    ),
  },
  {
    id: "olx",
    title: "OLX Business Hub",
    tags: ["web design", "ui/ux redesign", "wireframing"],
    image: framedImage(
      "cover",
      withBaseUrl("projects/olx/OLX.webp"),
      2400,
      1600,
      percentScale("163.19%"),
      {
        width: "163.19%",
        height: "145.02%",
        left: "-23.73%",
        top: "-22.51%",
      },
    ),
  },
  {
    id: "novyny",
    title: "Novyny LIVE",
    tags: ["web design", "ui design", "design system"],
    image: framedImage(
      "cover",
      withBaseUrl("projects/novyny/Novyny.webp"),
      1400,
      701,
      percentScale("217.46%"),
      {
        width: "217.46%",
        height: "145.18%",
        left: "-87.46%",
        top: "-9.47%",
      },
    ),
  },
];

export const projectGroups: readonly ProjectGroup[] = [
  {
    id: "web-design",
    title: "[Web Design Experience]",
    projectIds: ["olx", "novyny"],
  },
];
