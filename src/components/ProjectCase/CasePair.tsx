import { sectionClass } from "./sectionClass";

import type { CasePairSection } from "../../constants/projectCase";

import { optionalSrcSet } from "../../utils/cardSources";

/** Half of the 1264px row. Stacked frames use the full viewport. */
const frameSizes = "(max-width: 800px) 100vw, (max-width: 1440px) 50vw, 632px";

/** Grain tile is 142.222% of the frame. */
const grainSizes = "(max-width: 800px) 142vw, (max-width: 1440px) 71vw, 899px";

interface CasePairProps {
  section: CasePairSection;
}

export default function CasePair({ section }: CasePairProps) {
  return (
    <div className={sectionClass("case-pair", section.spaceBefore)}>
      {section.frames.map((frame) => {
        const photoSet = optionalSrcSet(frame.image.src, frame.image.width);
        const grainSet = optionalSrcSet(frame.grain.src, frame.grain.width);
        const fitClass = frame.fit === "cover" ? "case-pair-photo--cover" : "case-pair-photo--fill";
        const grain = (
          <img
            src={frame.grain.src}
            srcSet={grainSet}
            sizes={grainSet === undefined ? undefined : grainSizes}
            alt=""
            width={frame.grain.width}
            height={frame.grain.height}
            loading="lazy"
            decoding="async"
          />
        );

        return (
          <figure key={frame.image.src} className="case-pair-frame">
            <img
              className={`case-pair-photo ${fitClass}`}
              src={frame.image.src}
              srcSet={photoSet}
              sizes={photoSet === undefined ? undefined : frameSizes}
              alt={frame.image.alt}
              width={frame.image.width}
              height={frame.image.height}
              loading="lazy"
              decoding="async"
            />
            {frame.grain.turned ? (
              <div className="case-pair-grain case-pair-grain--turned" aria-hidden="true">
                <span className="case-pair-grain-turn">{grain}</span>
              </div>
            ) : (
              <div className="case-pair-grain" aria-hidden="true">
                {grain}
              </div>
            )}
            {frame.mark === undefined ? null : (
              <div className="case-pair-mark" aria-hidden="true">
                <img
                  src={frame.mark.src}
                  alt=""
                  width={frame.mark.width}
                  height={frame.mark.height}
                  decoding="async"
                />
              </div>
            )}
          </figure>
        );
      })}
    </div>
  );
}
