import type { CaseImage, CaseSpace } from "../../constants/projectCase";

import { sectionClass } from "./sectionClass";

interface CaseMediaProps {
  image: CaseImage;
  priority?: boolean;
  spaceBefore?: CaseSpace;
}

export default function CaseMedia({
  image,
  priority = false,
  spaceBefore = "section",
}: CaseMediaProps) {
  return (
    <figure className={sectionClass("case-media", spaceBefore)}>
      <img
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
    </figure>
  );
}
