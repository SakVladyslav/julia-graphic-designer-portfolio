import type {
  CaseImage,
  CaseMarksSection,
  CaseMediaQuote,
  CaseMediaSection,
  CaseSpace,
  ProjectCase,
} from "../projectCase";

import { withBaseUrl } from "../../utils/withBaseUrl";

const asset = (file: string) => encodeURI(withBaseUrl(`projects/lovespace/${file}`));

function media(
  file: string,
  width: number,
  height: number,
  alt: string,
  spaceBefore?: CaseSpace,
  modifier?: string,
): CaseMediaSection {
  const image = {
    src: asset(file),
    width,
    height,
    alt,
  };

  return {
    type: "media",
    image,
    ...(spaceBefore === undefined ? {} : { spaceBefore }),
    ...(modifier === undefined ? {} : { modifier }),
  };
}

function withPhone(
  section: CaseMediaSection,
  file: string,
  width: number,
  height: number,
  modifier?: string,
): CaseMediaSection {
  return {
    ...section,
    ...(modifier === undefined ? {} : { modifier }),
    image: {
      ...section.image,
      phone: { src: asset(file), width, height },
    },
  };
}

function post(number: string, alt: string): CaseImage {
  return { src: asset(`post-${number}.webp`), width: 832, height: 1040, alt };
}

const white = "#FFFFFF";
const ink = "#2A2A2A";
const kissedLips = "#A23C49";

const primaryLogo: CaseImage = {
  src: asset("logo-primary.svg"),
  width: 351,
  height: 71,
  alt: "Lovespace logo on white",
};

const logoOnBlack: CaseImage = {
  src: asset("logo-light.svg"),
  width: 351,
  height: 71,
  alt: "Lovespace logo on black",
};

const logoOnRed: CaseImage = {
  src: asset("logo-light.svg"),
  width: 351,
  height: 71,
  alt: "Lovespace logo on red",
};

const logoLockup: CaseMarksSection = {
  type: "marks",
  layout: "lockup",
  spaceBefore: "block",
  tiles: [
    { background: white, image: primaryLogo },
    { background: ink, image: logoOnBlack },
    { background: kissedLips, image: logoOnRed },
  ],
};

/** Open ring mark from Figma — overlaid on cover, bag, and portrait frames. */
const ringMark: CaseImage = {
  src: asset("portrait-ring.svg"),
  width: 157,
  height: 149,
  alt: "",
};

const statementQuote: CaseMediaQuote = {
  panel: {
    src: asset("statement-ring.svg"),
    width: 284,
    height: 248,
    alt: "",
  },
  accent: {
    src: asset("statement-accent.svg"),
    width: 88,
    height: 32,
    alt: "",
  },
  lines: ["We refuse the cult", "of perfection"],
  accentWord: "refuse",
};

function withMark(section: CaseMediaSection, mark: CaseImage = ringMark): CaseMediaSection {
  return {
    ...section,
    image: {
      ...section.image,
      mark,
    },
  };
}

function withQuote(section: CaseMediaSection, quote: CaseMediaQuote): CaseMediaSection {
  return { ...section, quote };
}

export const lovespaceCase: ProjectCase = {
  id: "lovespace",
  title: "Lovespace",
  sections: [
    withMark(
      withPhone(
        media("hero.webp", 1896, 1185, "Lovespace visual identity, close-up of skin folds"),
        "hero-phone.webp",
        1023,
        1284,
        "hero",
      ),
    ),
    {
      type: "intro",
      spaceBefore: "block",
      eyebrow: "[Client-based course project]",
      title: "Lovespace",
      subtitle: "Visual Identity Redesign",
      paragraphs: [
        "Lovespace — a space for sexual products, knowledge, and experimentation for people ready to embrace who they are.",
        "The challenge was to refresh the Lovespace visual identity without losing its recognizability or emotional connection with the audience. To maintain trust while giving the brand a new, contemporary, open, and warmer voice. An identity that feels alive.",
      ],
      tags: ["visual identity", "rebranding", "art direction"],
    },
    {
      type: "comparison",
      before: {
        label: "Before",
        image: {
          src: asset("logo-before.svg"),
          width: 448,
          height: 50,
          alt: "Previous Lovespace wordmark",
        },
      },
      after: {
        label: "After",
        image: {
          src: asset("logo-after.svg"),
          width: 351,
          height: 71,
          alt: "Redesigned Lovespace wordmark",
        },
      },
    },
    withQuote(
      withPhone(
        media("statement.webp", 1896, 1119, "We refuse the cult of perfection"),
        "statement-phone.webp",
        1026,
        1284,
        "statement",
      ),
      statementQuote,
    ),
    {
      type: "split",
      heading: "Brand philosophy",
      paragraphs: [
        "Life is imperfect, and sex is no exception. Sex is not about standards, but about experimentation, sometimes about laughter and vulnerability, moments that become meaningful.",
        "The circle remains at the core of the visual identity, but it is no longer perfect.",
      ],
    },
    logoLockup,
    // Desktop: fitting-room poster after logos. Phone: two posters side by side.
    media("posters.webp", 1264, 1580, "Lovespace fitting-room poster", undefined, "wide"),
    media(
      "posters-duo-phone.webp",
      1368,
      1368,
      "Two Lovespace posters side by side",
      undefined,
      "phone duo",
    ),
    {
      type: "palette",
      size: "tall",
      colors: [
        {
          name: "Kissed Lips",
          hex: "A23C49",
          rgb: "162, 60, 73",
          cmyk: "0, 63, 55, 36",
          fill: "#A23C49",
          ink: "#EEEAE9",
          image: {
            src: asset("Color_Kissed Lips.webp"),
            width: 821,
            height: 450,
            alt: "",
          },
        },
        {
          name: "Skin Shadow",
          hex: "2A2A2A",
          rgb: "42, 42, 42",
          cmyk: "0, 0, 0, 84",
          fill: "#2A2A2A",
          ink: "#EEEAE9",
          image: {
            src: asset("Color_Skin Shadow.webp"),
            width: 821,
            height: 449,
            alt: "",
          },
        },
        {
          name: "Soft Skin Light",
          hex: "EEEAE9",
          rgb: "238, 234, 233",
          cmyk: "0, 2, 2, 7",
          fill: "#EEEAE9",
          ink: "#2A2A2A",
          image: {
            src: asset("Color_Soft Skin Light.webp"),
            width: 821,
            height: 450,
            alt: "",
          },
        },
      ],
    },
    // Desktop packaging layout (cluster + pair). Hidden on phone.
    {
      type: "cluster",
      lead: {
        src: asset("mockup1.webp"),
        width: 1248,
        height: 1522,
        alt: "Open kraft Lovespace mailer box",
      },
      stack: [
        {
          src: asset("mockup2.webp"),
          width: 1872,
          height: 1119,
          alt: "Black Lovespace mailer box",
        },
        {
          src: asset("mockup3.webp"),
          width: 1872,
          height: 1119,
          alt: "Red Lovespace mailer box",
        },
      ],
    },
    media(
      "mockup4.webp",
      1896,
      1185,
      "Open Lovespace box with tissue paper and an instruction card",
      "stack",
      "wide",
    ),
    {
      type: "pair",
      spaceBefore: "stack",
      frames: [
        {
          image: {
            src: asset("ring-portrait.webp"),
            width: 1264,
            height: 1580,
            alt: "Portrait with the Lovespace ring mark",
          },
          fit: "cover",
          grain: {
            src: asset("lovespace-grain.webp"),
            width: 1024,
            height: 1024,
            turned: true,
          },
          mark: ringMark,
        },
        {
          image: {
            src: asset("shopping-bag.webp"),
            width: 1264,
            height: 1580,
            alt: "Lovespace shopping bag",
          },
          fit: "fill",
          grain: {
            src: asset("lovespace-grain.webp"),
            width: 1024,
            height: 1024,
            turned: false,
          },
          mark: ringMark,
        },
      ],
    },
    media("mockup6.webp", 1700, 1076, "Lovespace instruction sheet", "stack", "wide"),
    media(
      "mockup7.webp",
      1264,
      1580,
      "Close-up of arms and knees with natural skin marks",
      "stack",
      "wide",
    ),
    media("Lovespace-15.webp", 1896, 1185, "Lovespace lightbox sign", "stack", "wide"),
    // Phone Packaging Showcase order from Figma 390px.
    media(
      "mockup1-phone.webp",
      1368,
      1368,
      "Open kraft Lovespace mailer box",
      undefined,
      "phone box",
    ),
    media("mockup2-phone.webp", 1368, 1368, "Black Lovespace mailer box", "stack", "phone box"),
    media(
      "mockup4-phone.webp",
      1368,
      1368,
      "Open Lovespace box with tissue paper and an instruction card",
      "stack",
      "phone box",
    ),
    withMark(
      media("shopping-bag-phone.webp", 1368, 1710, "Lovespace shopping bag", "stack", "phone tall"),
    ),
    media("mockup6-phone.webp", 1368, 1712, "Lovespace instruction sheet", "stack", "phone tall"),
    media("mockup3-phone.webp", 1368, 1712, "Red Lovespace mailer box", "stack", "phone tall"),
    withMark(
      media(
        "ring-portrait-phone.webp",
        1368,
        1712,
        "Portrait with the Lovespace ring mark",
        "stack",
        "phone tall",
      ),
    ),
    media(
      "posters-phone.webp",
      1368,
      1710,
      "Lovespace fitting-room poster",
      "stack",
      "phone posters",
    ),
    media("Lovespace-15-phone.webp", 1368, 1040, "Lovespace lightbox sign", "stack", "phone sign"),
    {
      type: "split",
      heading: "Extended palette",
      paragraphs: [
        "Inspired by the brand’s product range, these colors continue the same soft, organic direction. They add flexibility across social media, content categories, and educational projects.",
      ],
    },
    {
      type: "palette",
      spaceBefore: "block",
      size: "short",
      colors: [
        {
          name: "",
          hex: "25575C",
          rgb: "37, 87, 92",
          cmyk: "60, 5, 0, 64",
          fill: "#25575C",
          ink: "#EEEAE9",
          image: { src: asset("Color_green.webp"), width: 608, height: 360, alt: "" },
        },
        {
          name: "",
          hex: "2A3D73",
          rgb: "42, 61, 115",
          cmyk: "63, 47, 0, 55",
          fill: "#2A3D73",
          ink: "#EEEAE9",
          image: { src: asset("Color_blue.webp"), width: 608, height: 360, alt: "" },
        },
        {
          name: "",
          hex: "853857",
          rgb: "133, 56, 87",
          cmyk: "0, 58, 35, 48",
          fill: "#853857",
          ink: "#EEEAE9",
          image: { src: asset("Color_red.webp"), width: 608, height: 360, alt: "" },
        },
        {
          name: "",
          hex: "5E3C69",
          rgb: "94, 60, 105",
          cmyk: "10, 43, 0, 59",
          fill: "#5E3C69",
          ink: "#EEEAE9",
          image: { src: asset("Color_violet.webp"), width: 608, height: 360, alt: "" },
        },
      ],
    },
    {
      type: "grid",
      images: [
        post("01", "Lovespace post: questions for a gynecologist"),
        post("02", "Lovespace post: don't be perfect, be yourself"),
        post("03", "Lovespace post: how to choose a lubricant"),
        post("04", "Lovespace post: where there are no templates, only you"),
        post("05", "Lovespace post: your period, your vibe"),
        post("06", "Lovespace post: a woman's morning be like"),
      ],
    },
    {
      type: "split",
      heading: "Brand phrases",
      paragraphs: [
        "The brand had its own signature, recognizable phrases used on merchandise; they were important to the community. That’s why I kept them in the updated brand identity, incorporating them into the new design.",
      ],
    },
    media("merch1.webp", 2400, 1599, "Two Lovespace tote bags", "block", "wide"),
    withPhone(
      media("merch2.webp", 1400, 1446, "Lovespace tote bag on a red sofa", "stack"),
      "merch2-phone.webp",
      1368,
      1712,
      "tote",
    ),
    withPhone(
      media("merch3.webp", 1896, 1185, "Person wearing a black Lovespace t-shirt", "stack"),
      "merch3-phone.webp",
      1368,
      1040,
      "tshirt",
    ),
  ],
};
