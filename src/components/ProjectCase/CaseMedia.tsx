import type { CaseImage, CaseSpace } from "../../constants/projectCase";

import CaseFrame from "./CaseFrame";
import { sectionClass } from "./sectionClass";

interface CaseMediaProps {
  image: CaseImage;
  priority?: boolean;
  spaceBefore?: CaseSpace;
  caption?: string;
  captionAlign?: "start" | "end";
  framed?: boolean;
}

export default function CaseMedia({
  image,
  priority = false,
  spaceBefore = "section",
  caption,
  captionAlign,
  framed = false,
}: CaseMediaProps) {
  return (
    <CaseFrame
      className={sectionClass("case-media", spaceBefore)}
      image={image}
      caption={caption}
      captionAlign={captionAlign}
      framed={framed}
      priority={priority}
    />
  );
}
