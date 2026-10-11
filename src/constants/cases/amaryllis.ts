import type {
  CaseBannerSection,
  CaseImage,
  CaseMediaSection,
  CaseNoteSection,
  CaseSpace,
  CaseStaggerSection,
  ProjectCase,
} from "../projectCase";

import { withBaseUrl } from "../../utils/withBaseUrl";

const asset = (file: string) => withBaseUrl(`projects/amaryllis/${file}`);

const lime = "#C1F76B";
const ink = "#4E5559";
const caption = "#E7F4C9";

function picture(file: string, width: number, height: number, alt: string): CaseImage {
  return { src: asset(file), width, height, alt };
}

function media(
  file: string,
  width: number,
  height: number,
  alt: string,
  spaceBefore?: CaseSpace,
  extras?: Pick<CaseMediaSection, "caption" | "captionAlign" | "framed">,
): CaseMediaSection {
  const image = picture(file, width, height, alt);

  return {
    type: "media",
    image,
    ...extras,
    ...(spaceBefore === undefined ? {} : { spaceBefore }),
  };
}

const leaf = picture("leaf.svg", 410, 779, "");
const leafSmall = picture("leaf-small.svg", 508, 463, "");
const line = picture("line.svg", 906, 1084, "");

const posters: CaseStaggerSection = {
  type: "stagger",
  spaceBefore: "section",
  ornament: leaf,
  frames: [
    {
      image: picture(
        "poster-symmetrical.webp",
        843,
        1192,
        "Symmetrical Amaryllis poster with three flowers",
      ),
      caption: "// symmetrical, dynamic\n& Open composition",
      captionAlign: "end",
    },
    {
      image: picture(
        "poster-asymmetrical.webp",
        843,
        1192,
        "Asymmetrical Amaryllis poster with one hanging flower",
      ),
      caption: "// asymmetrical, static\n& Open composition",
      captionAlign: "start",
    },
  ],
};

const banner: CaseBannerSection = {
  type: "banner",
  spaceBefore: "stack",
  background: lime,
  ink,
  title: "Poster with Linear Illustration",
  emphasis: "& Bold Color Accent",
  body: "This poster has a special place in the series. It reframes the concept in a more abstract and graphic style, while maintaining the consistency of the visual system.",
  mark: line,
};

const note: CaseNoteSection = {
  type: "note",
  spaceBefore: "none",
  ink: lime,
  detail: caption,
  title: "Posters Beyond",
  emphasis: "the Wall",
  body: "To extend the project, I created a range of items with these prints to explore how the poster designs could be transformed into merchandise and applied in real-life contexts.",
  ornament: leafSmall,
};

const merch: CaseStaggerSection = {
  type: "stagger",
  spaceBefore: "group",
  frames: [
    {
      image: picture("box.webp", 1264, 1264, "Lime Amaryllis box leaning on a chair"),
      caption: "// Branded Box",
      captionAlign: "end",
    },
    {
      image: picture("cup.webp", 1264, 1264, "Hand holding a lime Amaryllis coffee cup"),
      caption: "// coffee cup",
      captionAlign: "start",
    },
  ],
};

export const amaryllisCase: ProjectCase = {
  id: "amaryllis",
  title: "Amaryllis",
  sections: [
    media("hero.webp", 1896, 1185, "Amaryllis poster leaning on a green sofa"),
    {
      type: "intro",
      spaceBefore: "block",
      eyebrow: "[Self-initiated project]",
      title: "Amaryllis",
      subtitle: "Poster Series & Merch",
      paragraphs: [
        "Each poster was created from the same graphic elements, arranged according to different composition principles. The amaryllis flower became the main visual motif.",
      ],
      tags: ["poster design", "merch design"],
    },
    posters,
    media("frames.webp", 1896, 1317, "Three framed Amaryllis posters on a concrete wall", "group"),
    banner,
    media(
      "line-poster.webp",
      2160,
      1500,
      "Framed lime line-illustration poster in a sunlit room",
      "stack",
    ),
    note,
    media("tote.webp", 1896, 2202, "Person holding an Amaryllis tote bag", "group", {
      caption: "// Tote Bag",
      framed: true,
    }),
    merch,
    media("vinyl.webp", 1896, 1680, "Amaryllis record sleeve and a green vinyl", "group", {
      caption: "// Vinyl Record",
      framed: true,
    }),
    media("tshirt.webp", 1896, 1317, "Person wearing a black Amaryllis t-shirt", "group"),
    media("thanks.webp", 2160, 1500, "Framed poster that reads Thanks for watching", "stack"),
  ],
};
