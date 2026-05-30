"use client";

import Reveal from "@/components/motion/Reveal";
import { WebflowLink } from "@/components/webflow/WebflowLink";
import { devProjectPath } from "@/lib/cms/paths";
import type { DevProject } from "@/lib/cms/types";

const GRID_STAGGER = 0.08;

type StackBadgesProps = {
  stack: string[];
  accentColor?: string;
};

function StackBadges({ stack, accentColor }: StackBadgesProps) {
  return (
    <div className="dev-project-stack">
      {stack.map((tech) => (
        <span
          key={tech}
          className="dev-project-stack__badge"
          style={accentColor ? { borderColor: `${accentColor}44` } : undefined}
        >
          {tech}
        </span>
      ))}
    </div>
  );
}

type BrowserFrameProps = {
  projectName: string;
  heroImage?: string;
  accentColor?: string;
};

export function BrowserFrame({ projectName, heroImage, accentColor }: BrowserFrameProps) {
  const accent = accentColor ?? "var(--tomato, #ea5342)";

  return (
    <div className="dev-browser-frame">
      <div className="dev-browser-frame__chrome" style={{ borderColor: `${accent}33` }}>
        <div className="dev-browser-frame__dots">
          <span style={{ background: accent }} />
          <span />
          <span />
        </div>
        <div className="dev-browser-frame__url" style={{ color: `${accent}99` }}>
          {projectName.toLowerCase().replace(/\s+/g, "-")}.dev
        </div>
      </div>
      <div className="dev-browser-frame__viewport">
        {heroImage ? (
          <img src={heroImage} loading="lazy" alt={projectName} className="dev-browser-frame__img" />
        ) : (
          <div
            className="dev-browser-frame__placeholder"
            style={{
              background: `linear-gradient(135deg, ${accent}22 0%, var(--jet-black, #070707) 60%)`,
            }}
          >
            <span className="dev-browser-frame__placeholder-text" style={{ color: accent }}>
              {projectName}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

type DevProjectCardProps = {
  project: DevProject;
  staggerIndex?: number;
};

export function DevProjectCard({ project, staggerIndex = 0 }: DevProjectCardProps) {
  const accent = project.accentColor ?? "var(--tomato, #ea5342)";

  return (
    <Reveal as="div" role="listitem" className="dev-project-card w-dyn-item" delay={staggerIndex * GRID_STAGGER}>
      <WebflowLink href={devProjectPath(project.slug)} className="dev-project-card__link w-inline-block">
        <div className="dev-project-card__header">
          <div>
            {project.year ? <div className="dev-project-card__year">{project.year}</div> : null}
            <div className="dev-project-card__name">{project.name}</div>
            <div className="dev-project-card__tagline">{project.tagline}</div>
          </div>
          <div className="inside-button-container hero">
            <div className="button-text red">View Project</div>
            <img src="/images/down-arrow.svg" loading="lazy" alt="" className="image cr-arrow" />
          </div>
        </div>

        <StackBadges stack={project.stack} accentColor={project.accentColor} />

        <div className="dev-project-card__preview" style={{ borderColor: `${accent}33` }}>
          <BrowserFrame
            projectName={project.name}
            heroImage={project.heroImage}
            accentColor={project.accentColor}
          />
        </div>
      </WebflowLink>
    </Reveal>
  );
}

type DevProjectGridProps = {
  projects: DevProject[];
};

export function DevProjectGrid({ projects }: DevProjectGridProps) {
  if (projects.length === 0) {
    return (
      <div className="w-dyn-empty">
        <div>No items found.</div>
      </div>
    );
  }

  return (
    <div role="list" className="dev-project-grid w-dyn-items">
      {projects.map((project, index) => (
        <DevProjectCard key={project.slug} project={project} staggerIndex={index} />
      ))}
    </div>
  );
}
