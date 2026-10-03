import "./Logo.scss"

type LogoProps = {
  tone?: "header"
}

export default function Logo({ tone }: LogoProps) {
  const className = tone === "header" ? "logo logo--header" : "logo"

  return (
    <a className={className} href="#top">
      <span className="logo-bracket">[</span>SMCHK<span className="logo-bracket">]</span>
    </a>
  )
}
