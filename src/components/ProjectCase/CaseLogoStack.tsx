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
      <div className="case-logo-stack-letters">
        {section.letters.map((letter) => (
          <img
            key={letter.src}
            src={letter.src}
            alt={letter.alt}
            width={letter.width}
            height={letter.height}
            loading="lazy"
            decoding="async"
          />
        ))}
      </div>
    </div>
  );
}
