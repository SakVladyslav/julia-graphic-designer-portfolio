import type { CaseStaggerSection } from "../../constants/projectCase";

import CaseFrame from "./CaseFrame";
import { sectionClass } from "./sectionClass";

interface CaseStaggerProps {
  section: CaseStaggerSection;
}

export default function CaseStagger({ section }: CaseStaggerProps) {
  const [lead, follow] = section.frames;
  const followOffset = `${(lead.image.height / lead.image.width) * 100}%`;

  return (
    <div className={sectionClass("case-stagger", section.spaceBefore)}>
      {section.ornament === undefined ? null : (
        <img
          className="case-stagger-ornament"
          src={section.ornament.src}
          alt=""
          width={section.ornament.width}
          height={section.ornament.height}
          loading="lazy"
          decoding="async"
        />
      )}
      <CaseFrame
        className="case-stagger-lead"
        image={lead.image}
        caption={lead.caption}
        captionAlign={lead.captionAlign}
        framed
      />
      <CaseFrame
        className="case-stagger-follow"
        image={follow.image}
        caption={follow.caption}
        captionAlign={follow.captionAlign}
        framed
        style={{ marginTop: followOffset }}
      />
    </div>
  );
}
