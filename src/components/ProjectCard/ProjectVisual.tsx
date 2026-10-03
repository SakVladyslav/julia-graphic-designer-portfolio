import type { Project } from "../../constants/projects";

type ProjectVisualProps = {
  project: Project;
  /** First visible card: eager load for LCP; others lazy. */
  priority?: boolean;
};

export default function ProjectVisual({ project, priority = false }: ProjectVisualProps) {
  const image = project.image;
  const loading = priority ? "eager" : "lazy";
  const fetchPriority = priority ? "high" : undefined;

  if (image.kind === "lovespace") {
    return (
      <div className="project-media">
        <img
          className="lovespace-photo"
          src={image.photo}
          alt={project.title}
          width={image.photoWidth}
          height={image.photoHeight}
          loading={loading}
          decoding="async"
          fetchPriority={fetchPriority}
        />
        <img
          className="lovespace-texture"
          src={image.texture}
          alt=""
          width={image.textureWidth}
          height={image.textureHeight}
          loading={loading}
          decoding="async"
          aria-hidden="true"
        />
        <div className="lovespace-ring">
          <img
            src={image.ring}
            alt=""
            width={image.ringWidth}
            height={image.ringHeight}
            loading={loading}
            decoding="async"
            aria-hidden="true"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`project-media project-media--${image.kind}`}>
      <img
        src={image.src}
        alt={project.title}
        width={image.width}
        height={image.height}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
      />
    </div>
  );
}
