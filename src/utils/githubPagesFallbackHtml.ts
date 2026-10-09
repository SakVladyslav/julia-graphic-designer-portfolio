/** 404 page GitHub Pages serves for unknown paths. The redirect target is the Vite base. */
export function githubPagesFallbackHtml(siteBase: string): string {
  const redirect = siteBase.endsWith("/") ? siteBase : `${siteBase}/`;

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Julia Samchuk</title>
    <script>
      sessionStorage.setItem("spa-redirect", location.href);
      location.replace(${JSON.stringify(redirect)});
    </script>
  </head>
  <body></body>
</html>
`;
}
