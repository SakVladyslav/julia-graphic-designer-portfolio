import { homeHash } from "../../utils/homeHash";

import "./Logo.scss";

type LogoProps = {
  tone?: "header" | "footer";
};

export default function Logo({ tone }: LogoProps) {
  const className = tone ? `logo logo--${tone}` : "logo";

  return (
    <a className={className} href={homeHash("top")}>
      <span className="logo-bracket">[</span>SMCHK<span className="logo-bracket">]</span>
    </a>
  );
}
