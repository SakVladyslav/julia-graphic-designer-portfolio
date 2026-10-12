import type {
  CaseImage,
  CaseMarksSection,
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

export const lovespaceCase: ProjectCase = {
  id: "lovespace",
  title: "Lovespace",
  sections: [
    media("hero.webp", 2160, 1278, "Lovespace visual identity, a portrait framed by an open ring"),
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
    media("statement.webp", 1264, 746, "We refuse the cult of perfection"),
    {
      type: "split",
      heading: "Brand philosophy",
      paragraphs: [
        "Life is imperfect, and sex is no exception. Sex is not about standards, but about experimentation, sometimes about laughter and vulnerability, moments that become meaningful.",
        "The circle remains at the core of the visual identity, but it is no longer perfect.",
      ],
    },
    logoLockup,
    media("posters.webp", 2371, 1481, "Three Lovespace posters"),
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
    {
      type: "cluster",
      lead: {
        src: asset("mockup1.webp"),
        width: 1256,
        height: 1510,
        alt: "Open kraft Lovespace mailer box",
      },
      stack: [
        {
          src: asset("mockup2.webp"),
          width: 1860,
          height: 1110,
          alt: "Black Lovespace mailer box",
        },
        {
          src: asset("mockup3.webp"),
          width: 1860,
          height: 1110,
          alt: "Red Lovespace mailer box",
        },
      ],
    },
    media(
      "mockup4.webp",
      2160,
      1350,
      "Open Lovespace box with tissue paper and an instruction card",
      "stack",
    ),
    media(
      "mockup5.webp",
      2160,
      1350,
      "Lovespace shopping bag beside a portrait with the ring mark",
      "stack",
    ),
    media("mockup6.webp", 2160, 1350, "Lovespace instruction sheet", "stack"),
    media(
      "mockup7.webp",
      2160,
      1350,
      "Lovespace campaign card and portrait with the ring mark",
      "stack",
    ),
    media("Lovespace-15.webp", 2160, 1350, "Lovespace lightbox sign", "stack"),
    {
      type: "split",
      heading: "Extended palette",
      paragraphs: [
        "Inspired by the brand's product range, these colors continue the same soft, organic direction. They add flexibility across social media, content categories, and educational projects.",
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
    media("social.webp", 1893, 1571, "Lovespace social media posts"),
    {
      type: "split",
      heading: "Brand phrases",
      paragraphs: [
        "Brendov had his own signature, recognizable phrases that he used for merchandise; they were important to the community. That’s why I kept them in the updated brand identity, incorporating them into the new design.",
      ],
    },
    media("merch1.webp", 2400, 1599, "Two Lovespace tote bags", "block"),
    media("merch2.webp", 2160, 2234, "Lovespace tote bag on a red sofa", "stack"),
    media("merch3.webp", 2160, 1350, "Person wearing a black Lovespace t-shirt", "stack"),
  ],
};
