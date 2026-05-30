"use client";

import type { ReactNode } from "react";
import Reveal from "@/components/motion/Reveal";
import { WebflowLink } from "@/components/webflow/WebflowLink";
import { projectPath } from "@/lib/cms/paths";
import type { Project } from "@/lib/cms/types";
import { stripHtml } from "@/lib/cms/utils";
import { cn } from "@/lib/webflow/styles";

const GRID_STAGGER = 0.08;

type ProjectCardProps = {
  project: Project;
  variant?: "home" | "grid";
  staggerIndex?: number;
};

export function ProjectCard({
  project,
  variant = "grid",
  staggerIndex = 0,
}: ProjectCardProps) {
  const subtitle = stripHtml(project.servicesRendered) || project.client || project.name;
  const mobileImage = project.mobileImg || project.mainImage;
  const desktopImage = project.standardDesktopImg || project.largeDesktopImg || project.mainImage;
  const largeDesktopImage = project.largeDesktopImg || project.standardDesktopImg || project.mainImage;

  if (variant === "home") {
    return (
      <div role="listitem" className="w-dyn-item">
        <WebflowLink href={projectPath(project.slug)} className="project w-inline-block">
          <div className="image-wrapper portfolio-image-wrapper">
            <div className="flex mb-32px">
              <div>
                <div>
                  <div className="sub-title mb-16px">{project.name}</div>
                </div>
                <div className="inside-button-container">
                  <div className="button-text red">View Project</div>
                  <img src="/images/down-arrow.svg" loading="lazy" alt="" className="image cr-arrow right" />
                </div>
              </div>
            </div>
            {project.platformLogo ? (
              <div className="mb-8px hide">
                <div className="mb-8px thin">Built With</div>
                <img alt="" loading="lazy" width={120} src={project.platformLogo} className="platform-logo" />
              </div>
            ) : null}
            {mobileImage ? (
              <img loading="lazy" className="mobile-image" src={mobileImage} alt={project.name} />
            ) : null}
            {desktopImage ? (
              <img loading="lazy" className="desktop-standard" src={desktopImage} alt={project.name} />
            ) : null}
            {largeDesktopImage ? (
              <img
                loading="lazy"
                className={cn("image", "large-desktop-img")}
                src={largeDesktopImage}
                alt={project.name}
              />
            ) : null}
          </div>
        </WebflowLink>
      </div>
    );
  }

  return (
    <Reveal
      as="div"
      role="listitem"
      className="w-dyn-item"
      delay={staggerIndex * GRID_STAGGER}
    >
      <WebflowLink href={projectPath(project.slug)} className="project w-inline-block">
        <div className="flex sm-col">
          <div>
            <div className="sub-title mb-16px">{subtitle}</div>
          </div>
          <div className="inside-button-container hero">
            <div className="button-text red">View Project</div>
            <img src="/images/down-arrow.svg" loading="lazy" alt="" className="image cr-arrow" />
          </div>
        </div>
        <div className="image-wrapper portfolio-image-wrapper">
          {mobileImage ? (
            <img loading="lazy" className="mobile-image" src={mobileImage} alt={project.name} />
          ) : null}
          {desktopImage ? (
            <img loading="lazy" className="desktop-standard" src={desktopImage} alt={project.name} />
          ) : null}
          {largeDesktopImage ? (
            <img
              loading="lazy"
              className={cn("image", "large-desktop-img")}
              src={largeDesktopImage}
              alt={project.name}
            />
          ) : null}
        </div>
      </WebflowLink>
    </Reveal>
  );
}

type ProjectGridProps = {
  projects: Project[];
};

export function ProjectGrid({ projects }: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <div className="w-dyn-empty">
        <div>No items found.</div>
      </div>
    );
  }

  return (
    <div role="list" className="feature-colection-grid w-dyn-items">
      {projects.map((project, index) => (
        <ProjectCard key={project.slug} project={project} variant="grid" staggerIndex={index} />
      ))}
    </div>
  );
}

type HomeProjectColumnsProps = {
  projects: Project[];
};

export function HomeProjectColumns({ projects }: HomeProjectColumnsProps) {
  const columns = projects.slice(0, 2);

  if (columns.length === 0) {
    return (
      <div className="w-dyn-empty">
        <div>No items found.</div>
      </div>
    );
  }

  return (
    <>
      {columns.map((project, index) => (
        <Reveal key={project.slug} className="w-dyn-list" delay={index * 0.12}>
          <div role="list" className="w-dyn-items">
            <ProjectCard project={project} variant="home" />
          </div>
        </Reveal>
      ))}
    </>
  );
}

export function ProjectLiveLink({ href, children }: { href: string; children: ReactNode }) {
  if (!href) {
    return null;
  }

  return (
    <a href={href} target="_blank" rel="noreferrer" className="regular live-link">
      {children}
    </a>
  );
}
