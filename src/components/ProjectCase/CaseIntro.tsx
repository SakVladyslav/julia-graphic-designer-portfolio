import type { CaseIntroSection } from "../../constants/projectCase";

import { sectionClass } from "./sectionClass";

interface CaseIntroProps {
  section: CaseIntroSection;
}

export default function CaseIntro({ section }: CaseIntroProps) {
  return (
    <section
      className={sectionClass("case-intro", section.spaceBefore)}
      aria-labelledby="case-title"
    >
      <div className="case-intro-title">
        <div className="case-intro-heading">
          <p className="case-eyebrow">{section.eyebrow}</p>
          <h1 id="case-title">{section.title}</h1>
        </div>
        <p className="case-subtitle">{section.subtitle}</p>
      </div>
      <div className="case-intro-copy">
        <div className="case-copy">
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <ul className="case-tags">
          {section.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
