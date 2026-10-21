import type { CSSProperties } from "react";

import type { CaseImage } from "../../constants/projectCase";

interface CaseFrameProps {
  image: CaseImage;
  caption?: string;
  captionAlign?: "start" | "end";
  framed?: boolean;
  priority?: boolean;
  className?: string;
  style?: CSSProperties;
}

export default function CaseFrame({
  image,
  caption,
  captionAlign = "start",
  framed = false,
  priority = false,
  className,
  style,
}: CaseFrameProps) {
  const captionClass = captionAlign === "end" ? "case-caption case-caption--end" : "case-caption";
  const img = (
    <img
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : undefined}
    />
  );
  const picture =
    image.phone === undefined ? (
      img
    ) : (
      <picture>
        <source
          media="(max-width: 479px)"
          srcSet={image.phone.src}
          width={image.phone.width}
          height={image.phone.height}
        />
        {img}
      </picture>
    );

  return (
    <figure className={className} style={style}>
      {framed ? <div className="case-frame">{picture}</div> : picture}
      {caption === undefined ? null : <figcaption className={captionClass}>{caption}</figcaption>}
    </figure>
  );
}
