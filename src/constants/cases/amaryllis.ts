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
  extras?: Pick<CaseMediaSection, "caption" | "captionAlign" | "framed" | "modifier">,
): CaseMediaSection {
  const image = picture(file, width, height, alt);

  return {
    type: "media",
    image,
    ...extras,
    ...(spaceBefore === undefined ? {} : { spaceBefore }),
  };
}

function withPhone(
  section: CaseMediaSection,
  file: string,
  width: number,
  height: number,
  modifier: string,
): CaseMediaSection {
  return {
    ...section,
    modifier,
    image: {
      ...section.image,
      phone: { src: asset(file), width, height },
    },
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
  title: "Linear Illustration",
  emphasis: "& Bold Color",
  body: "This poster takes the concept in a more abstract and graphic direction. The linear illustration and bold color create a different mood while keeping the visual language consistent with the rest of the series.",
  mark: line,
};

const note: CaseNoteSection = {
  type: "note",
  spaceBefore: "none",
  ink: lime,
  detail: caption,
  title: "Posters Beyond",
  emphasis: "the Wall",
  body: "To extend the project, I applied the poster designs to a range of merchandise, exploring how the visual system could work across different formats and real-life applications.",
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
    withPhone(
      media("hero.webp", 1896, 1185, "Amaryllis poster leaning on a green sofa"),
      "hero-phone.webp",
      1026,
      1284,
      "cover",
    ),
    {
      type: "intro",
      spaceBefore: "block",
      eyebrow: "[Self-initiated project]",
      title: "Amaryllis",
      subtitle: "Poster Series & Merch",
      paragraphs: [
        "The project explores composition through a series of posters built within one visual system. Each poster uses the same set of graphic elements arranged in different ways, with the amaryllis flower as the main visual motif. The system was then extended into merchandise applications.",
      ],
      tags: ["poster design", "merch design"],
    },
    posters,
    withPhone(
      media(
        "frames.webp",
        1896,
        1317,
        "Three framed Amaryllis posters on a concrete wall",
        "group",
      ),
      "frames-phone.webp",
      1200,
      1200,
      "posters",
    ),
    banner,
    withPhone(
      media(
        "line-poster.webp",
        2160,
        1500,
        "Framed lime line-illustration poster in a sunlit room",
        "stack",
      ),
      "line-poster-phone.webp",
      1026,
      1284,
      "line",
    ),
    note,
    media("tote.webp", 1896, 2202, "Person holding an Amaryllis tote bag", "group", {
      caption: "// Tote Bag",
      framed: true,
      modifier: "tote",
    }),
    merch,
    media("vinyl.webp", 1896, 1680, "Amaryllis record sleeve and a green vinyl", "group", {
      caption: "// Vinyl Record",
      framed: true,
      modifier: "vinyl",
    }),
    media("tshirt.webp", 1896, 1317, "Person wearing a black Amaryllis t-shirt", "group", {
      modifier: "shirt",
    }),
    withPhone(
      media("thanks.webp", 2160, 1500, "Framed poster that reads Thanks for watching", "stack"),
      "thanks-phone.webp",
      1026,
      1284,
      "thanks",
    ),
  ],
};
