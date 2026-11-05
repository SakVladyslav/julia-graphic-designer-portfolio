/** React Router wants a basename without a trailing slash. Vite's BASE_URL has one. */
export function routerBasename(): string {
  return import.meta.env.BASE_URL.replace(/\/$/, "");
}
