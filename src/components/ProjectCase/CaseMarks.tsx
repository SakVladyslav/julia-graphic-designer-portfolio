import type { CaseMarksSection } from "../../constants/projectCase";

import { sectionClass } from "./sectionClass";

interface CaseMarksProps {
  section: CaseMarksSection;
}

export default function CaseMarks({ section }: CaseMarksProps) {
  return (
    <ul className={sectionClass(`case-marks case-marks--${section.layout}`, section.spaceBefore)}>
      {section.tiles.map((tile) => (
        <li key={tile.image.src} style={{ backgroundColor: tile.background }}>
          <img
            src={tile.image.src}
            alt={tile.image.alt}
            width={tile.image.width}
            height={tile.image.height}
            loading="lazy"
            decoding="async"
          />
        </li>
      ))}
    </ul>
  );
}
