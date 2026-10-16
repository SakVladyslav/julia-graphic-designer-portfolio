import type { CasePosterSection } from "../../constants/projectCase";

import { sectionClass } from "./sectionClass";

interface CasePosterProps {
  section: CasePosterSection;
}

export default function CasePoster({ section }: CasePosterProps) {
  return (
    <section
      className={sectionClass("case-poster", section.spaceBefore)}
      style={{ backgroundColor: section.background, color: section.ink }}
      aria-labelledby={section.headingId}
    >
      <div className="case-poster-panel" style={{ backgroundColor: section.panel }} />
      <div className="case-poster-copy" lang={section.lang}>
        <h2 id={section.headingId}>{section.title}</h2>
        <p style={{ color: section.detail }}>{section.subtitle}</p>
      </div>
      <img
        src={section.mark.src}
        alt={section.mark.alt}
        width={section.mark.width}
        height={section.mark.height}
        loading="lazy"
        decoding="async"
      />
    </section>
  );
}
