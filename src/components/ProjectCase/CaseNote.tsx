import type { CaseNoteSection } from "../../constants/projectCase";

import { sectionClass } from "./sectionClass";

interface CaseNoteProps {
  section: CaseNoteSection;
}

export default function CaseNote({ section }: CaseNoteProps) {
  return (
    <section className={sectionClass("case-note", section.spaceBefore)}>
      <div className="case-note-copy" style={{ color: section.ink }}>
        <h2>
          <span>{section.title}</span>
          <span className="case-note-emphasis">{section.emphasis}</span>
        </h2>
        <p style={{ color: section.detail }}>{section.body}</p>
      </div>
      <img
        className="case-note-ornament"
        src={section.ornament.src}
        alt=""
        width={section.ornament.width}
        height={section.ornament.height}
        loading="lazy"
        decoding="async"
      />
    </section>
  );
}
