import CaseComparison from "./CaseComparison";
import CaseIntro from "./CaseIntro";
import CaseMedia from "./CaseMedia";
import CasePalette from "./CasePalette";
import CaseRelated from "./CaseRelated";
import CaseSplit from "./CaseSplit";

import type { CaseSection, ProjectCase as ProjectCaseData } from "../../constants/projectCase";
import type { Project } from "../../constants/projects";

import "./ProjectCase.scss";

interface ProjectCaseProps {
  projectCase: ProjectCaseData;
  related: readonly Project[];
}

export default function ProjectCase({ projectCase, related }: ProjectCaseProps) {
  return (
    <article className="case-page">
      <div className="case-flow">
        {projectCase.sections.map((section, index) => renderSection(section, index))}
      </div>
      <CaseRelated projects={related} />
    </article>
  );
}

function renderSection(section: CaseSection, index: number) {
  const key = `${section.type}-${index}`;

  switch (section.type) {
    case "intro":
      return <CaseIntro key={key} section={section} />;
    case "media":
      return (
        <CaseMedia
          key={key}
          image={section.image}
          priority={index === 0}
          spaceBefore={section.spaceBefore}
        />
      );
    case "comparison":
      return <CaseComparison key={key} section={section} />;
    case "split":
      return <CaseSplit key={key} section={section} />;
    case "palette":
      return <CasePalette key={key} section={section} />;
  }
}
