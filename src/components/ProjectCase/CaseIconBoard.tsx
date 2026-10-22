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
          <span className="case-icon-board-glyph" style={{ inset: slot.inset }}>
            <span style={{ inset: slot.bleed ?? "0" }}>
              <img
                src={slot.image.src}
                alt={slot.image.alt}
                width={slot.image.width}
                height={slot.image.height}
                loading="lazy"
                decoding="async"
              />
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
}
