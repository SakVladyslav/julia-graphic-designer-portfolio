import { SITE_OWNER } from "../constants/site.ts";

const SAME_AS = [
  "https://www.linkedin.com/in/julia-samchuk-5b21791a1/",
  "https://t.me/juliasamchuk",
];

/** schema.org/Person for the homepage. Case pages do not repeat it. */
export function personJsonLd(pageUrl: string, jobTitle: string): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_OWNER,
    jobTitle,
    url: pageUrl,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kyiv",
      addressCountry: "UA",
    },
    sameAs: SAME_AS,
  });
}
