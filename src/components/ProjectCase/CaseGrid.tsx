import type { CaseGridSection } from "../../constants/projectCase";

import CaseFrame from "./CaseFrame";
import { sectionClass } from "./sectionClass";

interface CaseGridProps {
  section: CaseGridSection;
}

/** Two columns on phone, three from 480px up. */
const gridSizes = "(max-width: 479px) calc((100vw - 56px) / 2), (max-width: 1440px) 33vw, 480px";

export default function CaseGrid({ section }: CaseGridProps) {
  return (
    <ul className={sectionClass("case-grid", section.spaceBefore)}>
      {section.images.map((image) => (
        <li key={image.src}>
          <CaseFrame image={image} sizes={gridSizes} />
        </li>
      ))}
    </ul>
  );
}
