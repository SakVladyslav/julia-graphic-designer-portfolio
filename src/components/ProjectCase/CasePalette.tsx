import type { CasePaletteSection } from "../../constants/projectCase";

import { sectionClass } from "./sectionClass";

interface CasePaletteProps {
  section: CasePaletteSection;
}

export default function CasePalette({ section }: CasePaletteProps) {
  return (
    <ul className={sectionClass(`case-palette case-palette--${section.size}`, section.spaceBefore)}>
      {section.colors.map((color) => (
        <li className="case-color" key={color.hex}>
          {color.image ? (
            <img
              className="case-color-photo"
              src={color.image.src}
              alt={color.image.alt}
              width={color.image.width}
              height={color.image.height}
            />
          ) : (
            <div className="case-color-swatch" style={{ backgroundColor: color.fill }} />
          )}
          <div
            className={color.ink ? "case-color-info case-color-info--fill" : "case-color-info"}
            style={color.ink ? { backgroundColor: color.fill, color: color.ink } : undefined}
          >
            {color.name.length > 0 ? <p className="case-color-name">{color.name}</p> : null}
            <div className="case-color-specs">
              <p>HEX: {color.hex}</p>
              <p>RGB: {color.rgb}</p>
              <p>CMYK: {color.cmyk}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
