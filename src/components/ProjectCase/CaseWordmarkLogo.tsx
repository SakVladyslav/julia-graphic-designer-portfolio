import type { CaseWordmarkLogo as CaseWordmarkLogoData } from "../../constants/projectCase";

interface CaseWordmarkLogoProps {
  logo: CaseWordmarkLogoData;
}

export default function CaseWordmarkLogo({ logo }: CaseWordmarkLogoProps) {
  return (
    <div className="case-wordmark-logo">
      <img
        className="case-wordmark-mark"
        src={logo.mark.src}
        alt={logo.mark.alt}
        width={logo.mark.width}
        height={logo.mark.height}
        loading="lazy"
        decoding="async"
      />
      <div className="case-wordmark-rule">
        <img src={logo.rule.src} alt="" width={logo.rule.width} height={logo.rule.height} />
      </div>
      <div className="case-wordmark-type">
        <img
          className="case-wordmark-top"
          src={logo.top.src}
          alt=""
          width={logo.top.width}
          height={logo.top.height}
        />
        <img
          className="case-wordmark-middle"
          src={logo.middle.src}
          alt=""
          width={logo.middle.width}
          height={logo.middle.height}
        />
        <img
          className="case-wordmark-bottom"
          src={logo.bottom.src}
          alt=""
          width={logo.bottom.width}
          height={logo.bottom.height}
        />
      </div>
    </div>
  );
}
