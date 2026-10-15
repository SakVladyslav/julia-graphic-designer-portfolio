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

type FramedImage = {
  kind: "offset" | "cover";
  src: string;
  width: number;
  height: number;
};

export type Project = {
  id: string;
  /** Case page this card opens. Defaults to `id`. */
  caseId?: string;
  title: string;
  tags: readonly string[];
  image: LovespaceImage | FramedImage;
};

export const projects: readonly Project[] = [
  {
    id: "lovespace",
    title: "Lovespace",
    tags: ["visual identity", "rebranding"],
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
    tags: ["branding", "concept"],
    image: {
      kind: "offset",
      src: withBaseUrl("projects/molfaria/molfaria-window.webp"),
      width: 1600,
      height: 1000,
    },
  },
  {
    id: "amaryllis",
    title: "Amaryllis",
    tags: ["branding", "concept"],
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
      src: withBaseUrl("projects/bbg/BBG-01.webp"),
      width: 1896,
      height: 1185,
    },
  },
  {
    id: "molfaria-building",
    caseId: "molfaria",
    title: "Molfaria",
    tags: ["branding", "concept"],
    image: {
      kind: "cover",
      src: withBaseUrl("projects/molfaria/molfaria-budova.webp"),
      width: 825,
      height: 1024,
    },
  },
];
