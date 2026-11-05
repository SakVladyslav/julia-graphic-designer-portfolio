/** Home-page anchor that still works from a project page. */
export function homeHash(id: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${base}/#${id}`;
}
