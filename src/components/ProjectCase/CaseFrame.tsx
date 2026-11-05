import type { CSSProperties } from "react";

import type { CaseImage } from "../../constants/projectCase";

import { caseImageSizes, optionalSrcSet } from "../../utils/projects/cardSources";

interface CaseFrameProps {
  image: CaseImage;
  caption?: string;
  captionAlign?: "start" | "end";
  framed?: boolean;
  priority?: boolean;
  className?: string;
  style?: CSSProperties;
  /** Slot width for `srcset`. Defaults to a full-bleed frame. */
  sizes?: string;
}

export default function CaseFrame({
  image,
  caption,
  captionAlign = "start",
  framed = false,
  priority = false,
  className,
  style,
  sizes = caseImageSizes(),
}: CaseFrameProps) {
  const captionClass = captionAlign === "end" ? "case-caption case-caption--end" : "case-caption";
  const srcSet = optionalSrcSet(image.src, image.width);
  const img = (
    <img
      className="case-media-photo"
      src={image.src}
      srcSet={srcSet}
      sizes={srcSet === undefined ? undefined : sizes}
      alt={image.alt}
      width={image.width}
      height={image.height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : undefined}
    />
  );
  const phoneSrcSet =
    image.phone === undefined ? undefined : optionalSrcSet(image.phone.src, image.phone.width);
  const picture =
    image.phone === undefined ? (
      img
    ) : (
      <picture>
        <source
          media="(max-width: 479px)"
          srcSet={phoneSrcSet ?? image.phone.src}
          sizes={phoneSrcSet === undefined ? undefined : "100vw"}
          width={image.phone.width}
          height={image.phone.height}
        />
        {img}
      </picture>
    );
  const mark =
    image.mark === undefined ? null : (
      <div className="case-ring" aria-hidden="true">
        <img
          src={image.mark.src}
          alt=""
          width={image.mark.width}
          height={image.mark.height}
          decoding="async"
        />
      </div>
    );
  const media =
    mark === null ? (
      picture
    ) : (
      <div className="case-media-stage">
        {picture}
        {mark}
      </div>
    );

  return (
    <figure className={className} style={style}>
      {framed ? <div className="case-frame">{media}</div> : media}
      {caption === undefined ? null : <figcaption className={captionClass}>{caption}</figcaption>}
    </figure>
  );
}
