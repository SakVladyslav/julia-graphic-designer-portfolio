import type { CaseLogoPairSection } from "../../constants/projectCase";

import CaseWordmarkLogo from "./CaseWordmarkLogo";
import { sectionClass } from "./sectionClass";

interface CaseLogoPairProps {
  section: CaseLogoPairSection;
}

export default function CaseLogoPair({ section }: CaseLogoPairProps) {
  return (
    <ul className={sectionClass("case-logo-pair", section.spaceBefore)}>
      {section.tiles.map((tile) => (
        <li key={tile.background} style={{ backgroundColor: tile.background }}>
          <CaseWordmarkLogo logo={tile.logo} />
        </li>
      ))}
    </ul>
  );
}
