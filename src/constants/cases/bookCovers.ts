import type { CaseImage, CaseMediaSection, CaseSpace, ProjectCase } from "../projectCase";

import { withBaseUrl } from "../../utils/url/withBaseUrl";

const asset = (file: string) => withBaseUrl(`projects/book-covers/${file}`);

function picture(file: string, width: number, height: number, alt: string): CaseImage {
  return { src: asset(file), width, height, alt };
}

function media(
  file: string,
  width: number,
  height: number,
  alt: string,
  spaceBefore?: CaseSpace,
  modifier?: string,
): CaseMediaSection {
  return {
    type: "media",
    image: picture(file, width, height, alt),
    ...(spaceBefore === undefined ? {} : { spaceBefore }),
    ...(modifier === undefined ? {} : { modifier }),
  };
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

export const bookCoversCase: ProjectCase = {
  id: "book-covers",
  title: "Educational Book Covers",
  sections: [
    withPhone(
      media(
        "hero.webp",
        2160,
        1350,
        "Discrete-voxel parametric design book on a sunlit wooden table",
        undefined,
        "hero",
      ),
      "hero-phone.webp",
      1026,
      1284,
    ),
    {
      type: "intro",
      spaceBefore: "block",
      eyebrow: "[Client project]",
      title: "Educational Book Covers",
      subtitle: "",
      paragraphs: [
        "A series of educational book covers created for the same client across different university disciplines. Each cover was developed as a separate visual concept, with the design adapted to the subject and character of the study material.",
      ],
      tags: ["book cover design", "editorial design"],
    },
    withPhone(
      media(
        "books.webp",
        2366,
        1479,
        "Flat lay of educational book covers for voxel design, engineering graphics, and web design",
        "section",
        "books",
      ),
      "books-phone.webp",
      1368,
      1368,
    ),
    {
      type: "split",
      spaceBefore: "section",
      heading: "Discrete-Voxel Parametric Design Cover",
      paragraphs: [
        "The cover was created for a university study guide on discrete-voxel parametric design in MagicaVoxel. Since there was no predefined visual direction, I developed the concept around the subject itself — voxel structures, modularity, and digital construction.",
        "The visual system is built from elements that reference the logic of voxel-based design: a modular grid, small square details, and a central voxel-inspired form. A pixel-style typeface was used as an accent for the MagicaVoxel name, while the main title remained in a more readable typeface to keep the cover clear and functional.",
        "The main graphic was generated with AI and then refined in Photoshop to better match the intended voxel aesthetic and the overall composition. The same visual language was carried through to the back cover to create a consistent system across the full design.",
      ],
    },
    media(
      "voxel-1.webp",
      2400,
      1500,
      "Front cover of the discrete-voxel parametric design book",
      "block",
      "voxel-1",
    ),
    withPhone(
      media(
        "voxel-2.webp",
        2348,
        1467,
        "Open discrete-voxel parametric design book showing the cover and inside pages",
        "stack",
        "voxel-2",
      ),
      "voxel-2-phone.webp",
      1368,
      1368,
    ),
    media(
      "voxel-3.webp",
      2400,
      1500,
      "Stack of discrete-voxel parametric design books showing the back cover",
      "stack",
      "voxel-3",
    ),
    {
      type: "split",
      spaceBefore: "section",
      heading: "Engineering and Computer Graphics Covers",
      paragraphs: [
        "This pair of covers was designed for university study materials on engineering and computer graphics. The visual concept draws directly from the language of technical drawings, using grids, construction lines, and engineering diagrams as the foundation of the composition.",
        "Both covers share the same graphic system while using different colors and technical imagery to distinguish the study guide from the practical workbook.",
      ],
    },
    withPhone(
      media(
        "engineering-1.webp",
        2232,
        1395,
        "Navy engineering and computer graphics textbook on a grey pedestal",
        "block",
        "engineering-1",
      ),
      "engineering-1-phone.webp",
      1044,
      1284,
    ),
    withPhone(
      media(
        "engineering-2.webp",
        2211,
        1382,
        "Burgundy engineering graphics workbook stacked on a navy textbook",
        "stack",
        "engineering-2",
      ),
      "engineering-2-phone.webp",
      1044,
      1026,
    ),
    withPhone(
      media(
        "engineering-3.webp",
        2223,
        1389,
        "Open navy engineering and computer graphics textbook",
        "stack",
        "engineering-3",
      ),
      "engineering-3-phone.webp",
      1044,
      1026,
    ),
    {
      type: "split",
      spaceBefore: "section",
      heading: "Web Design Technologies Cover",
      paragraphs: [
        "This cover was created for a university study guide on web design technologies. The visual direction is clean and minimal, combining bold typography with a bright digital image to create a contemporary, technology-focused look.",
        "The front cover keeps the composition simple and direct, while the back cover introduces a more expressive typographic treatment to add visual character and balance to the overall design.",
      ],
    },
    withPhone(
      media(
        "web-design-1.webp",
        2400,
        1500,
        "Black web design technologies book with a laptop on the cover",
        "block",
        "web-1",
      ),
      "web-design-1-phone.webp",
      1710,
      2140,
    ),
    withPhone(
      media(
        "web-design-2.webp",
        2400,
        1500,
        "Group of black web design technologies books, front and back covers",
        "stack",
        "web-2",
      ),
      "web-design-2-phone.webp",
      1710,
      1300,
    ),
  ],
};
