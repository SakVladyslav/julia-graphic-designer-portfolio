import Logo from "../Logo/Logo";
import SiteNav from "../SiteNav/SiteNav";

import { COPYRIGHT_YEAR, SITE_OWNER } from "../../constants/site";

import { scrollToTop } from "../../utils/scrollToTop";

import toTopUrl from "../../assets/to-top.svg";

import "./Footer.scss";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <Logo tone="footer" />
        <SiteNav className="footer-nav" ariaLabel="Footer" />
        <div className="footer-end">
          <p className="copyright">
            © {COPYRIGHT_YEAR}. {SITE_OWNER}
          </p>
          <button type="button" className="to-top" onClick={scrollToTop}>
            <span className="to-top-icon">
              <img src={toTopUrl} alt="" width={24} height={24} aria-hidden="true" />
            </span>
            <span className="visually-hidden">Back to top</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
