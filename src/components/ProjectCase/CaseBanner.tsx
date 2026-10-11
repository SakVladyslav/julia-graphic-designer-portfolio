import type { CaseBannerSection } from "../../constants/projectCase";

import { sectionClass } from "./sectionClass";

interface CaseBannerProps {
  section: CaseBannerSection;
}

export default function CaseBanner({ section }: CaseBannerProps) {
  return (
    <section
      className={sectionClass("case-banner", section.spaceBefore)}
      style={{ backgroundColor: section.background, color: section.ink }}
    >
      <img
        className="case-banner-mark"
        src={section.mark.src}
        alt=""
        width={section.mark.width}
        height={section.mark.height}
        loading="lazy"
        decoding="async"
      />
      <div className="case-banner-copy">
        <h2>
          <span className="case-banner-title" style={{ backgroundColor: section.background }}>
            {section.title}
          </span>
          <span className="case-banner-emphasis">{section.emphasis}</span>
        </h2>
        <p>{section.body}</p>
      </div>
    </section>
  );
}
