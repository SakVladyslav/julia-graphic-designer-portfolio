import type { CaseTypefacesSection } from "../../constants/projectCase";

import { sectionClass } from "./sectionClass";

interface CaseTypefacesProps {
  section: CaseTypefacesSection;
}

export default function CaseTypefaces({ section }: CaseTypefacesProps) {
  return (
    <ul className={sectionClass("case-typefaces", section.spaceBefore)}>
      {section.panels.map((panel) => (
        <li
          key={panel.role}
          className={`case-typeface case-typeface--${panel.role}`}
          style={{ backgroundColor: section.background, color: section.ink }}
        >
          <div className="case-typeface-meta">
            <p>{panel.label}</p>
            <p className="case-typeface-weights">
              {panel.weights
                .flatMap((weight, index) => (index === 0 ? [weight] : ["/", weight]))
                .map((item) => (
                  <span key={item}>{item}</span>
                ))}
            </p>
          </div>
          <p className="case-typeface-name" style={{ color: section.accent }}>
            {panel.name}
          </p>
        </li>
      ))}
    </ul>
  );
}
