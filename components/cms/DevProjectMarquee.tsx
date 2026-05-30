"use client";

import { BrowserFrame } from "@/components/cms/DevProjectCard";
import { WebflowLink } from "@/components/webflow/WebflowLink";
import { devProjectPath } from "@/lib/cms/paths";
import type { DevProject } from "@/lib/cms/types";

type DevProjectMarqueeProps = {
  projects: DevProject[];
};

function MarqueeCard({ project }: { project: DevProject }) {
  const accent = project.accentColor ?? "var(--tomato, #ea5342)";

  return (
    <WebflowLink
      href={devProjectPath(project.slug)}
      className="dev-project-marquee-card w-inline-block"
      aria-label={`View ${project.name}`}
    >
      <div className="dev-project-marquee-card__header">
        <div>
          {project.year ? <div className="dev-project-card__year">{project.year}</div> : null}
          <div className="dev-project-card__name">{project.name}</div>
        </div>
        <div className="inside-button-container hero">
          <div className="button-text red">View</div>
          <img src="/images/down-arrow.svg" loading="lazy" alt="" className="image cr-arrow" />
        </div>
      </div>

      <div className="dev-project-stack dev-project-marquee-card__stack">
        {project.stack.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="dev-project-stack__badge"
            style={project.accentColor ? { borderColor: `${project.accentColor}44` } : undefined}
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="dev-project-marquee-card__preview" style={{ borderColor: `${accent}33` }}>
        <BrowserFrame
          projectName={project.name}
          heroImage={project.heroImage}
          accentColor={project.accentColor}
        />
      </div>
    </WebflowLink>
  );
}

export function DevProjectMarquee({ projects }: DevProjectMarqueeProps) {
  if (projects.length === 0) {
    return (
      <div className="w-dyn-empty">
        <div>No items found.</div>
      </div>
    );
  }

  const items = projects.length === 1 ? [projects[0], projects[0]] : projects;
  const loop = [...items, ...items];

  return (
    <div className="dev-project-marquee" aria-label="Dev projects">
      <div className="dev-project-marquee__fade dev-project-marquee__fade--left" aria-hidden="true" />
      <div className="dev-project-marquee__fade dev-project-marquee__fade--right" aria-hidden="true" />
      <div className="dev-project-marquee__viewport">
        <div className="dev-project-marquee__track">
          {loop.map((project, index) => (
            <MarqueeCard key={`${project.slug}-${index}`} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
