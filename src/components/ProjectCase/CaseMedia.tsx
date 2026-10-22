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
  modifier?: string;
}

export default function CaseMedia({
  image,
  priority = false,
  spaceBefore = "section",
  caption,
  captionAlign,
  framed = false,
  modifier,
}: CaseMediaProps) {
  const modifierClass =
    modifier === undefined
      ? ""
      : modifier
          .split(" ")
          .map((name) => `case-media--${name}`)
          .join(" ");
  const frameClass = modifierClass === "" ? "case-media" : `case-media ${modifierClass}`;

  return (
    <CaseFrame
      className={sectionClass(frameClass, spaceBefore)}
      image={image}
      caption={caption}
      captionAlign={captionAlign}
      framed={framed}
      priority={priority}
    />
  );
}
