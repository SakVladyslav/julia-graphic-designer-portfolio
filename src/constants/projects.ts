import { withBaseUrl } from "../utils/withBaseUrl";

type LovespaceImage = {
  kind: "lovespace";
  photo: string;
  photoWidth: number;
  photoHeight: number;
  texture: string;
  textureWidth: number;
  textureHeight: number;
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
      texture: withBaseUrl("projects/lovespace/lovespace-texture.webp"),
      textureWidth: 900,
      textureHeight: 900,
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
    image: {
      kind: "offset",
      src: withBaseUrl("projects/molfaria/molfaria-window.webp"),
      width: 1600,
      height: 1000,
    },
  },
  {
    id: "amaryllis",
    title: "Amaryllis Poster Series",
    tags: ["poster design", "merch design"],
    image: {
      kind: "cover",
      src: withBaseUrl("projects/amaryllis/amaryllis.webp"),
      width: 1600,
      height: 1252,
    },
  },
  {
    id: "bbg",
    title: "Best Budova Group",
    tags: ["logo design", "visual identity"],
    image: {
      kind: "cover",
      src: withBaseUrl("projects/bbg/BBG-04.webp"),
      width: 1896,
      height: 1350,
    },
  },
  {
    id: "twitchvrotfl",
    title: "Twitchvrotfl",
    tags: ["logo design", "brand mark"],
    image: {
      kind: "cover",
      src: withBaseUrl("projects/twitchvrotfl/cover.webp"),
      width: 1232,
      height: 964,
    },
  },
  {
    id: "book-covers",
    title: "Book covers",
    tags: ["visual identity", "rebranding"],
    image: {
      kind: "cover",
      src: withBaseUrl("projects/book-covers/cover.webp"),
      width: 1920,
      height: 1439,
      crop: {
        width: "119.16%",
        height: "119.07%",
        left: "-9.58%",
        top: "-11.39%",
      },
    },
  },
  {
    id: "olx",
    title: "OLX Business Hub",
    tags: ["web design", "ui/ux redesign", "wireframing"],
    image: {
      kind: "cover",
      src: withBaseUrl("projects/olx/OLX.webp"),
      width: 2400,
      height: 1600,
      crop: {
        width: "163.19%",
        height: "145.02%",
        left: "-23.73%",
        top: "-22.51%",
      },
    },
  },
  {
    id: "novyny",
    title: "Novyny LIVE",
    tags: ["web design", "ui design", "design system"],
    image: {
      kind: "cover",
      src: withBaseUrl("projects/novyny/Novyny.webp"),
      width: 1400,
      height: 701,
      crop: {
        width: "217.46%",
        height: "145.18%",
        left: "-87.46%",
        top: "-9.47%",
      },
    },
  },
];

export const projectGroups: readonly ProjectGroup[] = [
  {
    id: "web-design",
    title: "[Web Design Experience]",
    projectIds: ["olx", "novyny"],
  },
];
