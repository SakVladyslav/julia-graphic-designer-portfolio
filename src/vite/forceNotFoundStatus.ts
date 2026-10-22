import type { ServerResponse } from "node:http";

type WriteHead = ServerResponse["writeHead"];
type End = ServerResponse["end"];

/**
 * Vite's HTML fallback always sends 200. For an address that is not a page,
 * keep that HTML (so the app can render the not-found screen) but report 404.
 */
export function forceNotFoundStatus(res: ServerResponse): void {
  const writeHead: WriteHead = res.writeHead.bind(res);
  const end: End = res.end.bind(res);

  res.writeHead = ((...args: Parameters<WriteHead>) => {
    if (args[0] === 200) {
      args[0] = 404;
    }

    return writeHead(...args);
  }) as WriteHead;

  res.end = ((...args: Parameters<End>) => {
    if (res.statusCode === 200) {
      res.statusCode = 404;
    }

    return end(...args);
  }) as End;
}
