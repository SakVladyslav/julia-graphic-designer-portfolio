import type { CaseIntroSection } from "../../constants/projectCase";

import { isExternalHref } from "../../utils/isExternalHref";

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
        {section.link ? (
          <a
            className="case-intro-link"
            href={section.link.href}
            {...(isExternalHref(section.link.href)
              ? { target: "_blank", rel: "noopener noreferrer" }
              : undefined)}
          >
            {section.link.label}
            <span className="case-intro-link-arrow" aria-hidden="true" />
          </a>
        ) : null}
      </div>
    </section>
  );
}
