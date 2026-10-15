import type { CaseIconBoardSection } from "../../constants/projectCase";

import { sectionClass } from "./sectionClass";

interface CaseIconBoardProps {
  section: CaseIconBoardSection;
}

export default function CaseIconBoard({ section }: CaseIconBoardProps) {
  return (
    <ul
      className={sectionClass("case-icon-board", section.spaceBefore)}
      style={{ backgroundColor: section.background }}
    >
      {section.icons.map((slot) => (
        <li key={slot.image.src}>
          <img
            src={slot.image.src}
            alt={slot.image.alt}
            width={slot.image.width}
            height={slot.image.height}
            style={{ inset: slot.inset }}
            loading="lazy"
            decoding="async"
          />
        </li>
      ))}
    </ul>
  );
}
