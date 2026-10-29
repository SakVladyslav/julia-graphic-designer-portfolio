import type { CSSProperties, ReactNode } from "react";

import type { CaseImage, CaseMediaQuote } from "../../constants/projectCase";

import { caseImageSizes, optionalSrcSet } from "../../utils/cardSources";

interface CaseFrameProps {
  image: CaseImage;
  caption?: string;
  captionAlign?: "start" | "end";
  framed?: boolean;
  priority?: boolean;
  className?: string;
  style?: CSSProperties;
  quote?: CaseMediaQuote;
}

function quoteCopy(quote: CaseMediaQuote): ReactNode {
  const [first, second] = quote.lines;
  const accentAt = first.indexOf(quote.accentWord);
  const before = accentAt === -1 ? first : first.slice(0, accentAt);
  const after = accentAt === -1 ? "" : first.slice(accentAt + quote.accentWord.length);

  return (
    <p className="case-statement-copy">
      <span className="case-statement-line">
        {before}
        {accentAt === -1 ? null : (
          <span className="case-statement-accent">
            {quote.accentWord}
            <img
              src={quote.accent.src}
              alt=""
              width={quote.accent.width}
              height={quote.accent.height}
              decoding="async"
            />
          </span>
        )}
        {after}
      </span>
      <span className="case-statement-line">{second}</span>
    </p>
  );
}

export default function CaseFrame({
  image,
  caption,
  captionAlign = "start",
  framed = false,
  priority = false,
  className,
  style,
  quote,
}: CaseFrameProps) {
  const captionClass = captionAlign === "end" ? "case-caption case-caption--end" : "case-caption";
  const srcSet = optionalSrcSet(image.src, image.width);
  const img = (
    <img
      className="case-media-photo"
      src={image.src}
      srcSet={srcSet}
      sizes={srcSet === undefined ? undefined : caseImageSizes()}
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
  const quoteLayer =
    quote === undefined ? null : (
      <div className="case-statement" aria-hidden="true">
        <img
          className="case-statement-panel"
          src={quote.panel.src}
          alt=""
          width={quote.panel.width}
          height={quote.panel.height}
          decoding="async"
        />
        {quoteCopy(quote)}
      </div>
    );
  const needsStage = mark !== null || quoteLayer !== null;
  const media = needsStage ? (
    <div className="case-media-stage">
      {picture}
      {mark}
      {quoteLayer}
    </div>
  ) : (
    picture
  );

  return (
    <figure className={className} style={style}>
      {framed ? <div className="case-frame">{media}</div> : media}
      {caption === undefined ? null : <figcaption className={captionClass}>{caption}</figcaption>}
    </figure>
  );
}
