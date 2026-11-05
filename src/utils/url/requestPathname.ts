/** Pathname from a Node request URL, ignoring the query string. */
export function requestPathname(url: string | undefined): string | undefined {
  if (url === undefined || url === "") {
    return undefined;
  }

  const query = url.indexOf("?");
  const path = query === -1 ? url : url.slice(0, query);

  try {
    return decodeURIComponent(path);
  } catch (error) {
    console.error("Skipped a request with an invalid path", error);
    return undefined;
  }
}
