import type { CaseComparisonSection } from "../../constants/projectCase";

import { sectionClass } from "./sectionClass";

interface CaseComparisonProps {
  section: CaseComparisonSection;
}

export default function CaseComparison({ section }: CaseComparisonProps) {
  const sides = [section.before, section.after];

  return (
    <div className={sectionClass("case-comparison", section.spaceBefore)}>
      {sides.map((side) => (
        <figure className="case-comparison-panel" key={side.label}>
          <figcaption>{side.label}</figcaption>
          <img
            src={side.image.src}
            alt={side.image.alt}
            width={side.image.width}
            height={side.image.height}
          />
        </figure>
      ))}
    </div>
  );
}
