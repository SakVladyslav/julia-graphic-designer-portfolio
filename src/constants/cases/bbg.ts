import type {
  CaseIconBoardSection,
  CaseIconSlot,
  CaseImage,
  CaseLogoPairSection,
  CaseLogoStackSection,
  CaseMediaSection,
  CaseSpace,
  CaseTypefacesSection,
  CaseWordmarkLogo,
  ProjectCase,
} from "../projectCase";

import { withBaseUrl } from "../../utils/withBaseUrl";

const asset = (file: string) => withBaseUrl(`projects/bbg/${file}`);

const blue = "#003879";
const ink = "#313335";
const paper = "#EEF1F2";

function picture(file: string, width: number, height: number, alt: string): CaseImage {
  return { src: asset(file), width, height, alt };
}

function media(
  file: string,
  width: number,
  height: number,
  alt: string,
  spaceBefore?: CaseSpace,
): CaseMediaSection {
  const image = picture(file, width, height, alt);

  if (spaceBefore === undefined) {
    return { type: "media", image };
  }

  return { type: "media", spaceBefore, image };
}

function withPhone(
  section: CaseMediaSection,
  file: string,
  width: number,
  height: number,
): CaseMediaSection {
  return {
    ...section,
    image: {
      ...section.image,
      phone: { src: asset(file), width, height },
    },
  };
}

function wordmarkLogo(tone: "light" | "dark"): CaseWordmarkLogo {
  return {
    mark: picture(`logo-${tone}-mark.svg`, 111, 113, "Best Budova Group logo"),
    rule: picture("logo-rule.svg", 150, 4, ""),
    top: picture(`logo-${tone}-top.svg`, 133, 53, ""),
    middle: picture(`logo-${tone}-mid.svg`, 227, 53, ""),
    bottom: picture(`logo-${tone}-bot.svg`, 191, 53, ""),
  };
}

const logoStack: CaseLogoStackSection = {
  type: "logoStack",
  spaceBefore: "section",
  background: blue,
  mark: picture("mark.svg", 439, 444, "BBG monogram"),
  letters: [
    picture("B-1.svg", 117, 133, ""),
    picture("B-2.svg", 112, 133, ""),
    picture("G.svg", 112, 133, ""),
  ],
};

const logoPair: CaseLogoPairSection = {
  type: "logoPair",
  spaceBefore: "section",
  tiles: [
    { background: ink, logo: wordmarkLogo("light") },
    { background: paper, logo: wordmarkLogo("dark") },
  ],
};

function icon(
  file: string,
  width: number,
  height: number,
  alt: string,
  inset: string,
): CaseIconSlot {
  return { image: picture(file, width, height, alt), inset };
}

const typefaces: CaseTypefacesSection = {
  type: "typefaces",
  spaceBefore: "section",
  background: paper,
  ink,
  accent: blue,
  panels: [
    {
      role: "logo",
      label: "Logo typeface",
      weights: ["Regular"],
      name: "Lexend\nDeca",
    },
    {
      role: "communication",
      label: "Communication typeface",
      weights: ["Medium", "SemiBold"],
      name: "Wix Madefor Display",
    },
  ],
};

const iconBoard: CaseIconBoardSection = {
  type: "iconBoard",
  spaceBefore: "block",
  background: blue,
  icons: [
    icon("icon-house.svg", 117, 106, "House", "9.29% 4.83%"),
    icon("icon-brush.svg", 87, 108, "Paint roller", "8.46% 16.4%"),
    icon("icon-wall.svg", 118, 94, "Brick wall", "13.94% 4.81%"),
    icon("icon-helmet.svg", 120, 80, "Safety helmet", "19.24% 3.85%"),
    icon("icon-advice.svg", 120, 113, "Consultation", "6.4% 3.85%"),
    icon("icon-wardrobe.svg", 94, 115, "Wardrobe", "5.73% 13.81%"),
    icon("icon-plan.svg", 105, 105, "Floor plan", "9.61% 9.62% 9.61% 9.61%"),
    icon("icon-last.svg", 115, 104, "Building facade", "10.86% 6.05% 10.86% 7.22%"),
  ],
};

export const bbgCase: ProjectCase = {
  id: "bbg",
  title: "Best Budova Group",
  sections: [
    withPhone(
      media("BBG-01.webp", 1896, 1185, "Best Budova Group construction fence banner"),
      "BBG-01-phone.webp",
      684,
      700,
    ),
    {
      type: "intro",
      spaceBefore: "block",
      eyebrow: "[Client project]",
      title: "Best Budova Group",
      subtitle: "Construction Company Visual Identity",
      paragraphs: [
        "Best Budova Group is a construction and renovation company that needed a recognizable logo and a visual system to support its communication.",
        "The final concept is based on a BBG monogram, with the letter G also forming a subtle house shape — a reference to the company’s field. I developed a basic visual system around the logo, including brand colors, typography, usage guidelines, and an icon set for digital communication. The project was delivered with a set of brand guidelines to support consistent use across different materials.",
      ],
      tags: ["logo design", "visual identity"],
    },
    logoStack,
    logoPair,
    withPhone(
      media(
        "BBG-07.webp",
        1264,
        900,
        "Best Budova Group lightbox sign on a concrete facade",
        "section",
      ),
      "BBG-07-phone.webp",
      684,
      800,
    ),
    typefaces,
    {
      type: "split",
      spaceBefore: "section",
      heading: "Icons",
      paragraphs: [
        "I prepared a consistent icon set by selecting and adapting icons to match the brand’s visual style. It can be used across social media and other brand touchpoints.",
      ],
    },
    iconBoard,
    media("BBG-05.webp", 1896, 1350, "Best Budova Group Instagram profile on a phone", "stack"),
    withPhone(
      media("BBG-06.webp", 1896, 1350, "Best Budova Group business cards on concrete", "section"),
      "BBG-06-phone.webp",
      684,
      800,
    ),
  ],
};
