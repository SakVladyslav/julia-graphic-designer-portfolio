import type { CaseClusterSection } from "../../constants/projectCase";

import CaseFrame from "./CaseFrame";
import { sectionClass } from "./sectionClass";

interface CaseClusterProps {
  section: CaseClusterSection;
}

export default function CaseCluster({ section }: CaseClusterProps) {
  return (
    <div className={sectionClass("case-cluster", section.spaceBefore)}>
      <CaseFrame image={section.lead} />
      <div className="case-cluster-stack">
        {section.stack.map((image) => (
          <CaseFrame key={image.src} image={image} />
        ))}
      </div>
    </div>
  );
}
