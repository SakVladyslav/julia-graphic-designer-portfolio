export function caseHtmlAlreadyInDocument(): boolean {
  if (typeof document === "undefined") {
    return false;
  }

  const root = document.getElementById("root");
  if (root === null) {
    return false;
  }

  return root.querySelector(".case-page") !== null;
}
