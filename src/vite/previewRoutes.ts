import type { Plugin } from "vite";

/** Serve prerendered `page/index.html` files at `/page` during `vite preview`. */
export function previewRoutes(): Plugin {
  return {
    name: "preview-routes",
    configurePreviewServer(server) {
      server.middlewares.use((request, _response, next) => {
        const url = request.url;
        if (url === undefined) {
          next();
          return;
        }

        const queryIndex = url.indexOf("?");
        const pathname = queryIndex === -1 ? url : url.slice(0, queryIndex);
        const query = queryIndex === -1 ? "" : url.slice(queryIndex);

        if (pathname === "/" || pathname.includes(".")) {
          next();
          return;
        }

        const withoutSlash = pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
        request.url = `${withoutSlash}/index.html${query}`;
        next();
      });
    },
  };
}
