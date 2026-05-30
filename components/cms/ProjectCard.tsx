"use client";

import type { ReactNode } from "react";
import Reveal from "@/components/motion/Reveal";
import { WebflowLink } from "@/components/webflow/WebflowLink";
import { projectPath } from "@/lib/cms/paths";
import type { Project } from "@/lib/cms/types";
import { stripHtml } from "@/lib/cms/utils";
import { cn } from "@/lib/webflow/styles";

const GRID_STAGGER = 0.08;
const HOME_COLUMN_STAGGER = 0.12;
const IMAGE_STACK_STAGGER = 0.1;

type PortfolioImageStackProps = {
  projectName: string;
  mobileImage?: string;
  desktopImage?: string;
  largeDesktopImage?: string;
  baseDelay: number;
};

function PortfolioImageStack({
  projectName,
  mobileImage,
  desktopImage,
  largeDesktopImage,
  baseDelay,
}: PortfolioImageStackProps) {
  return (
    <>
      {largeDesktopImage ? (
        <Reveal delay={baseDelay + IMAGE_STACK_STAGGER * 0}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={cn("image", "large-desktop-img")}
            src={largeDesktopImage}
            alt={projectName}
          />
        </Reveal>
      ) : null}
      {desktopImage ? (
        <Reveal delay={baseDelay + IMAGE_STACK_STAGGER * 1}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="desktop-standard" src={desktopImage} alt={projectName} />
        </Reveal>
      ) : null}
      {mobileImage ? (
        <Reveal delay={baseDelay + IMAGE_STACK_STAGGER * 2}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="mobile-image" src={mobileImage} alt={projectName} />
        </Reveal>
      ) : null}
    </>
  );
}

type ProjectCardProps = {
  project: Project;
  variant?: "home" | "grid";
  staggerIndex?: number;
  /** Home grid column index for scroll-reveal timing */
  columnIndex?: number;
};

export function ProjectCard({
  project,
  variant = "grid",
  staggerIndex = 0,
  columnIndex = 0,
}: ProjectCardProps) {
  const subtitle = stripHtml(project.servicesRendered) || project.client || project.name;
  const mobileImage = project.mobileImg || project.mainImage;
  const desktopImage = project.standardDesktopImg || project.largeDesktopImg || project.mainImage;
  const largeDesktopImage = project.largeDesktopImg || project.standardDesktopImg || project.mainImage;

  if (variant === "home") {
    const baseDelay = columnIndex * HOME_COLUMN_STAGGER;

    return (
      <div role="listitem" className="w-dyn-item">
        <WebflowLink href={projectPath(project.slug)} className="project w-inline-block">
          <div className="image-wrapper portfolio-image-wrapper portfolio-image-wrapper--layered">
            <Reveal className="flex mb-32px" delay={baseDelay}>
              <div>
                <div>
                  <div className="sub-title mb-16px">{project.name}</div>
                </div>
                <div className="inside-button-container">
                  <div className="button-text red">View Project</div>
                  <img src="/images/down-arrow.svg" loading="lazy" alt="" className="image cr-arrow right" />
                </div>
              </div>
            </Reveal>
            {project.platformLogo ? (
              <div className="mb-8px hide">
                <div className="mb-8px thin">Built With</div>
                <img alt="" loading="lazy" width={120} src={project.platformLogo} className="platform-logo" />
              </div>
            ) : null}
            <PortfolioImageStack
              projectName={project.name}
              mobileImage={mobileImage}
              desktopImage={desktopImage}
              largeDesktopImage={largeDesktopImage}
              baseDelay={baseDelay}
            />
          </div>
        </WebflowLink>
      </div>
    );
  }

  const baseDelay = staggerIndex * GRID_STAGGER;

  return (
    <div role="listitem" className="w-dyn-item">
      <WebflowLink href={projectPath(project.slug)} className="project w-inline-block">
        <Reveal className="flex sm-col" delay={baseDelay}>
          <div>
            <div className="sub-title mb-16px">{subtitle}</div>
          </div>
          <div className="inside-button-container hero">
            <div className="button-text red">View Project</div>
            <img src="/images/down-arrow.svg" loading="lazy" alt="" className="image cr-arrow" />
          </div>
        </Reveal>
        <div className="image-wrapper portfolio-image-wrapper portfolio-image-wrapper--layered">
          <PortfolioImageStack
            projectName={project.name}
            mobileImage={mobileImage}
            desktopImage={desktopImage}
            largeDesktopImage={largeDesktopImage}
            baseDelay={baseDelay}
          />
        </div>
      </WebflowLink>
    </div>
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
        <div key={project.slug} className="w-dyn-list">
          <div role="list" className="w-dyn-items">
            <ProjectCard project={project} variant="home" columnIndex={index} />
          </div>
        </div>
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
