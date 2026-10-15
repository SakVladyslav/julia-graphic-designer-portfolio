import CaseBanner from "./CaseBanner";
import CaseCluster from "./CaseCluster";
import CaseComparison from "./CaseComparison";
import CaseIconBoard from "./CaseIconBoard";
import CaseIntro from "./CaseIntro";
import CaseLogoPair from "./CaseLogoPair";
import CaseLogoStack from "./CaseLogoStack";
import CaseMarks from "./CaseMarks";
import CaseMedia from "./CaseMedia";
import CaseNote from "./CaseNote";
import CasePalette from "./CasePalette";
import CasePoster from "./CasePoster";
import CaseRelated from "./CaseRelated";
import CaseSplit from "./CaseSplit";
import CaseStagger from "./CaseStagger";

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
          caption={section.caption}
          captionAlign={section.captionAlign}
          framed={section.framed}
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
    case "marks":
      return <CaseMarks key={key} section={section} />;
    case "poster":
      return <CasePoster key={key} section={section} />;
    case "cluster":
      return <CaseCluster key={key} section={section} />;
    case "stagger":
      return <CaseStagger key={key} section={section} />;
    case "banner":
      return <CaseBanner key={key} section={section} />;
    case "note":
      return <CaseNote key={key} section={section} />;
    case "logoStack":
      return <CaseLogoStack key={key} section={section} />;
    case "logoPair":
      return <CaseLogoPair key={key} section={section} />;
    case "iconBoard":
      return <CaseIconBoard key={key} section={section} />;
  }
}
