import type { CaseSplitSection } from "../../constants/projectCase";

import { sectionClass } from "./sectionClass";

interface CaseSplitProps {
  section: CaseSplitSection;
}

export default function CaseSplit({ section }: CaseSplitProps) {
  const headingId = `case-${section.heading.toLowerCase().replaceAll(" ", "-")}`;

  return (
    <section
      className={sectionClass("case-split", section.spaceBefore)}
      aria-labelledby={headingId}
    >
      <h2 id={headingId}>{section.heading}</h2>
      <div className="case-copy">
        {section.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
