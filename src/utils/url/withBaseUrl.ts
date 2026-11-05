/** Prefix a public-folder path with Vite's configured `base`. */
export function withBaseUrl(path: string): string {
  const normalized = path.startsWith("/") ? path.slice(1) : path;
  return `${import.meta.env.BASE_URL}${normalized}`;
}
