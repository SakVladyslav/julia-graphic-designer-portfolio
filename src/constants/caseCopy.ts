export interface CaseCopy {
  id: string;
  title: string;
  description: string;
  imageAlt: string;
}

/** Share-card text only. The long case sections stay in the project route. */
export const caseCopy: readonly CaseCopy[] = [
  {
    id: "lovespace",
    title: "Lovespace — Julia Samchuk",
    description:
      "Visual Identity Redesign. Lovespace — a space for sexual products, knowledge, and experimentation for people ready to embrace who they are.",
    imageAlt: "Lovespace, Julia Samchuk",
  },
  {
    id: "molfaria",
    title: "Molfaria — Julia Samchuk",
    description:
      "Specialty Coffee Branding. Molfaria is a specialty coffee shop without pretension or snobbery. No “this is the right way” and no “you’re doing it wrong.”…",
    imageAlt: "Molfaria, Julia Samchuk",
  },
  {
    id: "amaryllis",
    title: "Amaryllis — Julia Samchuk",
    description:
      "Poster Series & Merch. Each poster was created from the same graphic elements, arranged according to different composition principles. The amaryllis flower…",
    imageAlt: "Amaryllis, Julia Samchuk",
  },
  {
    id: "bbg",
    title: "Best Budova Group — Julia Samchuk",
    description:
      "Construction Company Visual Identity. Best Budova Group is a construction and renovation company that needed a recognizable logo and a visual system to…",
    imageAlt: "Best Budova Group, Julia Samchuk",
  },
  {
    id: "olx",
    title: "OLX Business Hub — Julia Samchuk",
    description:
      "B2B Website Redesign. OLX B2B is a website redesign for OLX business users. The goal was to turn the platform into a clear and user-friendly business hub,…",
    imageAlt: "OLX Business Hub, Julia Samchuk",
  },
  {
    id: "novyny",
    title: "Novyny LIVE — Julia Samchuk",
    description:
      "News Website Redesign. Novyny LIVE is a Ukrainian news platform that came to the agency for a full website redesign. The goal was to modernize the interface…",
    imageAlt: "Novyny LIVE, Julia Samchuk",
  },
];

export function caseCopyById(id: string): CaseCopy | undefined {
  return caseCopy.find((item) => item.id === id);
}
