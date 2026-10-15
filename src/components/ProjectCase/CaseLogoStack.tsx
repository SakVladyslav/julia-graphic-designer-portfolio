import type { CaseLogoStackSection } from "../../constants/projectCase";

import { sectionClass } from "./sectionClass";

interface CaseLogoStackProps {
  section: CaseLogoStackSection;
}

export default function CaseLogoStack({ section }: CaseLogoStackProps) {
  return (
    <div
      className={sectionClass("case-logo-stack", section.spaceBefore)}
      style={{ backgroundColor: section.background }}
    >
      <div className="case-logo-stack-mark">
        <img
          src={section.mark.src}
          alt={section.mark.alt}
          width={section.mark.width}
          height={section.mark.height}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="case-logo-stack-word">
        <img
          src={section.wordmark.src}
          alt={section.wordmark.alt}
          width={section.wordmark.width}
          height={section.wordmark.height}
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
}
