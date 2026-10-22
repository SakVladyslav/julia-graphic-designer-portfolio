import type { CaseImage, CaseMediaSection, CaseSpace, ProjectCase } from "../projectCase";

import { withBaseUrl } from "../../utils/withBaseUrl";

const asset = (file: string) => withBaseUrl(`projects/olx/${file}`);

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

export const olxCase: ProjectCase = {
  id: "olx",
  title: "OLX Business Hub",
  sections: [
    withPhone(
      media(
        "Cover_OLX.webp",
        2528,
        1580,
        "OLX Business Hub on a laptop, with the site open on a mint background",
      ),
      "Cover_OLX-phone.webp",
      1029,
      1026,
    ),
    {
      type: "intro",
      spaceBefore: "block",
      eyebrow: "[Agency project]",
      title: "OLX Business Hub",
      subtitle: "B2B Website Redesign",
      paragraphs: [
        "OLX B2B is a website redesign for OLX business users. The goal was to turn the platform into a clear and user-friendly business hub, improve the structure and navigation, simplify access to important information, and create a system that could easily grow with new pages.",
        "I led the design process from the initial structure to the final UI. Based on the provided content and technical requirements, I worked on the page structure, created low-fidelity and high-fidelity wireframes, built a clickable prototype, and designed the final interface using the existing OLX guidelines and design system. I also created reusable components and content blocks in Figma, so they could be used to build new pages more efficiently.",
        "During the project, I presented design solutions to the client, worked with feedback, prepared the files for development, and reviewed the implemented pages after handoff. The project was created within an agency team and included internal design review.",
      ],
      tags: ["web design", "ui/ux redesign", "wireframing"],
      link: {
        label: "View case on Behance",
        href: "https://www.behance.net/gallery/217930743/OLX-B2B-UIUX-Redesign",
      },
    },
  ],
};
