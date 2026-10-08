import Contacts from "../Contacts/Contacts";
import Logo from "../Logo/Logo";
import SiteNav from "../SiteNav/SiteNav";

import { COPYRIGHT_YEAR, SITE_OWNER } from "../../constants/site";

import { scrollToTop } from "../../utils/scrollToTop";

import "./Footer.scss";

export type FooterTone = "inverse" | "light";

interface FooterProps {
  tone?: FooterTone;
}

export default function Footer({ tone = "inverse" }: FooterProps) {
  return (
    <footer className={`site-footer site-footer--${tone}`}>
      <Contacts />
      <div className="footer-inner">
        <Logo tone="footer" />
        <SiteNav className="footer-nav" ariaLabel="Footer" />
        <p className="copyright">
          © {COPYRIGHT_YEAR}. {SITE_OWNER}
        </p>
        <button type="button" className="to-top" onClick={scrollToTop}>
          <span className="to-top-icon" aria-hidden="true" />
          <span className="visually-hidden">Back to top</span>
        </button>
      </div>
    </footer>
  );
}
