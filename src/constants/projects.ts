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
      photo: "/projects/lovespace-photo.webp",
      photoWidth: 683,
      photoHeight: 1024,
      texture: "/projects/lovespace-texture.webp",
      textureWidth: 900,
      textureHeight: 900,
      ring: "/projects/lovespace-ring.svg",
      ringWidth: 374,
      ringHeight: 356,
    },
  },
  {
    id: "molfaria-window",
    title: "Molfaria",
    tags: ["branding", "concept"],
    image: {
      kind: "offset",
      src: "/projects/molfaria-window.webp",
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
      src: "/projects/amaryllis.webp",
      width: 1600,
      height: 1252,
    },
  },
  {
    id: "molfaria-building",
    title: "Molfaria",
    tags: ["branding", "concept"],
    image: {
      kind: "cover",
      src: "/projects/molfaria-budova.webp",
      width: 825,
      height: 1024,
    },
  },
];
