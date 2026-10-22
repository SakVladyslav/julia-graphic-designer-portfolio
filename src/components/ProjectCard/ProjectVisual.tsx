import type { CSSProperties } from "react";

import type { Project } from "../../constants/projects";

interface CropFrameStyle extends CSSProperties {
  "--crop-width": string;
  "--crop-height": string;
  "--crop-left": string;
  "--crop-top": string;
}

type ProjectVisualProps = {
  project: Project;
  /** First visible card loads immediately. High priority goes to the texture: it is the largest paint. */
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
          srcSet={image.photoSrcSet}
          sizes={image.photoSizes}
          alt={project.title}
          width={image.photoWidth}
          height={image.photoHeight}
          loading={loading}
          decoding="async"
        />
        <img
          className="lovespace-texture"
          src={image.texture}
          srcSet={image.textureSrcSet}
          sizes={image.textureSizes}
          alt=""
          width={image.textureWidth}
          height={image.textureHeight}
          loading={loading}
          decoding={priority ? "sync" : "async"}
          fetchPriority={fetchPriority}
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

  const cropStyle: CropFrameStyle | undefined =
    image.crop === undefined
      ? undefined
      : {
          "--crop-width": image.crop.width,
          "--crop-height": image.crop.height,
          "--crop-left": image.crop.left,
          "--crop-top": image.crop.top,
        };
  const mediaClass =
    image.crop === undefined
      ? `project-media project-media--${image.kind}`
      : `project-media project-media--${image.kind} project-media--crop`;

  return (
    <div className={mediaClass} style={cropStyle}>
      <img
        src={image.src}
        srcSet={image.srcSet}
        sizes={image.sizes}
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
