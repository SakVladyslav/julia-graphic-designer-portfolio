import type {
  CaseImage,
  CaseMarksSection,
  CaseMediaSection,
  CasePosterSection,
  CaseSpace,
  ProjectCase,
} from "../projectCase";

import { withBaseUrl } from "../../utils/withBaseUrl";

const asset = (file: string) => withBaseUrl(`projects/molfaria/${file}`);

function media(
  file: string,
  width: number,
  height: number,
  alt: string,
  spaceBefore?: CaseSpace,
): CaseMediaSection {
  const image = {
    src: asset(file),
    width,
    height,
    alt,
  };

  if (spaceBefore === undefined) {
    return { type: "media", image };
  }

  return { type: "media", spaceBefore, image };
}

const cream = "#FFF4F2";
const blue = "#335978";

const primaryLogo: CaseImage = {
  src: asset("logo-primary.svg"),
  width: 658,
  height: 320,
  alt: "Molfaria logo",
};

const lightStacked: CaseImage = {
  src: asset("logo-dark-stacked.svg"),
  width: 359,
  height: 141,
  alt: "Molfaria logo, stacked, on blue",
};

const lightHorizontal: CaseImage = {
  src: asset("logo-dark-horizontal.svg"),
  width: 425,
  height: 72,
  alt: "Molfaria logo, horizontal, on blue",
};

const darkStacked: CaseImage = {
  src: asset("logo-light-stacked.svg"),
  width: 359,
  height: 141,
  alt: "Molfaria logo, stacked, on cream",
};

const darkHorizontal: CaseImage = {
  src: asset("logo-light-horizontal.svg"),
  width: 425,
  height: 72,
  alt: "Molfaria logo, horizontal, on cream",
};

const blueMark: CaseImage = {
  src: asset("mark-light.svg"),
  width: 474,
  height: 474,
  alt: "",
};

const creamMark: CaseImage = {
  src: asset("mark-dark.svg"),
  width: 474,
  height: 474,
  alt: "",
};

const logoBoard: CaseMarksSection = {
  type: "marks",
  layout: "board",
  tiles: [{ background: cream, image: primaryLogo }],
};

const logoGrid: CaseMarksSection = {
  type: "marks",
  layout: "grid",
  tiles: [
    { background: blue, image: lightStacked },
    { background: blue, image: lightHorizontal },
    { background: cream, image: darkStacked },
    { background: cream, image: darkHorizontal },
  ],
};

function poster(
  headingId: string,
  background: string,
  panel: string,
  ink: string,
  detail: string,
  title: string,
  subtitle: string,
  mark: CaseImage,
): CasePosterSection {
  return {
    type: "poster",
    spaceBefore: "stack",
    headingId,
    background,
    panel,
    ink,
    detail,
    title,
    subtitle,
    mark,
  };
}

export const molfariaCase: ProjectCase = {
  id: "molfaria",
  title: "Molfaria",
  sections: [
    media("molf-hero.webp", 2400, 1500, "Molfaria paper cup under an espresso machine"),
    {
      type: "intro",
      spaceBefore: "block",
      eyebrow: "[Self-initiated project]",
      title: "Molfaria",
      subtitle: "Specialty Coffee Branding",
      paragraphs: [
        "Molfaria is a specialty coffee shop without pretension or snobbery. No “this is the right way” and no “you’re doing it wrong.” Here, you decide what your coffee should be. A latte with syrup or a filter with milk — that works too. We don’t change your taste, we work with it. The only rule is great beans and an honest approach to coffee.",
        "The name “Molfaria” isn’t about magic as a spectacle. It’s about a feeling. A space where you can pause, let go of expectations, and simply be in the moment.",
        "The visual identity reflects this idea through simplicity, calmness, and the absence of excess. So nothing distracts from what matters most: Your coffee. Your rules.",
      ],
      tags: ["brand identity", "coffee branding", "art direction"],
    },
    logoBoard,
    logoGrid,
    media("molf-mockup-1.webp", 2200, 1375, "Two Molfaria posters in a shop window"),
    media("molf-mockup-2.webp", 2200, 1375, "Molfaria lightbox sign on a concrete facade", "stack"),
    media("molf-mockup-3.webp", 2400, 1500, "Barista in a Molfaria t-shirt", "stack"),
    media("molf-mockup-4.webp", 2000, 1250, "Molfaria menu cards", "stack"),
    media("molf-mockup-5.webp", 2160, 1350, "Molfaria coffee cup and a cold brew can", "stack"),
    media("molf-mockup-6.webp", 2160, 1350, "Molfaria shopping bag and cap", "none"),
    poster(
      "case-poster-slow",
      blue,
      cream,
      blue,
      "#402722",
      "Можна не\nпоспішати",
      "Допивай каву спокійно",
      blueMark,
    ),
    media("molf-mockup-8.webp", 2400, 1583, "Molfaria cup carrier", "stack"),
    media("molf-mockup-9.webp", 2400, 1583, "Iced coffee and Molfaria coasters", "stack"),
    media("molf-mockup-10.webp", 2400, 1600, "Molfaria tote bag", "stack"),
    media("molf-mockup-11.webp", 2400, 1500, "Three Molfaria coffee bags", "stack"),
    poster(
      "case-poster-taste",
      cream,
      blue,
      cream,
      cream,
      "Смакуй\nпо-своєму",
      "Навіть якщо це фільтр з молоком",
      creamMark,
    ),
  ],
};
