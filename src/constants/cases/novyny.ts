import type { CaseImage, CaseMediaSection, CaseSpace, ProjectCase } from "../projectCase";

import { withBaseUrl } from "../../utils/withBaseUrl";

const asset = (file: string) => withBaseUrl(`projects/novyny/${file}`);

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

export const novynyCase: ProjectCase = {
  id: "novyny",
  title: "Novyny LIVE",
  sections: [
    media(
      "Cover_Novyny.webp",
      1896,
      1185,
      "Novyny LIVE homepage on a desktop, set against portraits and an orange band",
    ),
    {
      type: "intro",
      spaceBefore: "block",
      eyebrow: "[Agency project]",
      title: "Novyny LIVE",
      subtitle: "News Website Redesign",
      paragraphs: [
        "Novyny LIVE is a Ukrainian news platform that came to the agency for a full website redesign. The goal was to modernize the interface and create a clearer, more consistent system for working with a large amount of news content across different types of pages.",
        "At the beginning of the project, each of the three designers on the team prepared a separate visual concept for the client. After one direction was selected, we continued working on it together and developed it into a complete website design. I worked on individual pages within the approved concept and also helped create and organize UI components to keep the interface consistent.",
      ],
      tags: ["web design", "ui design", "design system"],
      link: {
        label: "View case on Behance",
        href: "https://www.behance.net/gallery/172888923/novini-LIVE-News-website-redesign",
      },
    },
  ],
};
