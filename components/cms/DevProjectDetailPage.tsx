import { BrowserFrame } from "@/components/cms/DevProjectCard";
import Reveal from "@/components/motion/Reveal";
import ContactSection from "@/components/ui/ContactSection";
import PageHero from "@/components/ui/PageHero";
import PageShell from "@/components/ui/PageShell";
import SectionHeader from "@/components/ui/SectionHeader";
import SiteFooter from "@/components/webflow/SiteFooter";
import type { DevProject } from "@/lib/cms/types";
import type { CSSProperties } from "react";

type DevProjectDetailPageProps = {
  project: DevProject;
};

function ProjectLinks({ project }: { project: DevProject }) {
  if (!project.githubUrl && !project.liveUrl) {
    return null;
  }

  return (
    <div className="dev-project-links">
      {project.githubUrl ? (
        <a href={project.githubUrl} target="_blank" rel="noreferrer" className="dev-project-links__btn">
          GitHub
        </a>
      ) : null}
      {project.liveUrl ? (
        <a href={project.liveUrl} target="_blank" rel="noreferrer" className="dev-project-links__btn dev-project-links__btn--primary">
          Live Demo
        </a>
      ) : null}
    </div>
  );
}

export default function DevProjectDetailPage({ project }: DevProjectDetailPageProps) {
  const accent = project.accentColor ?? "var(--tomato, #ea5342)";

  return (
    <PageShell currentPage="projects">
      <PageHero
        title={project.name}
        className="dev-page-hero dev-project-detail-hero"
        padding="small"
        subtitle={
          <>
            <Reveal as="p" immediate className="dev-project-detail__tagline" delay={0.08}>
              {project.tagline}
            </Reveal>
            <Reveal className="dev-project-detail__stack" delay={0.14}>
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="dev-project-stack__badge"
                  style={project.accentColor ? { borderColor: `${project.accentColor}44` } : undefined}
                >
                  {tech}
                </span>
              ))}
            </Reveal>
            <Reveal className="dev-project-links-wrap" delay={0.2}>
              <ProjectLinks project={project} />
            </Reveal>
          </>
        }
      />

      <div className="section black-bg">
        <div className="main-container">
          <div className="small-padding">
            <Reveal className="dev-project-detail__browser-wrap">
              <BrowserFrame
                projectName={project.name}
                heroImage={project.heroImage}
                accentColor={project.accentColor}
              />
            </Reveal>
          </div>
        </div>
      </div>

      <div className="section bg-jet">
        <div className="main-container">
          <div className="small-padding">
            <Reveal className="dev-project-detail__overview">
              <SectionHeader eyebrow="Summary" eyebrowVariant="caption" title="Overview" />
              <div className="about-paragraph">
                <p className="regular">{project.description}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {(project.problem || project.solution) && (
        <div className="section black-bg">
          <div className="main-container">
            <div className="small-padding">
              <div className="dev-project-detail__case-study">
                {project.problem ? (
                  <Reveal className="dev-project-detail__case-block">
                    <SectionHeader eyebrow="The Challenge" title="Problem" eyebrowAccent={false} />
                    <div className="about-paragraph">
                      <p className="regular">{project.problem}</p>
                    </div>
                  </Reveal>
                ) : null}
                {project.solution ? (
                  <Reveal className="dev-project-detail__case-block" delay={0.1}>
                    <SectionHeader
                      eyebrow="The Build"
                      title="Solution"
                      eyebrowAccent={false}
                      eyebrowVariant="caption"
                    />
                    <div className="about-paragraph">
                      <p className="regular">{project.solution}</p>
                    </div>
                  </Reveal>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}

      {project.features && project.features.length > 0 ? (
        <div className="section bg-jet">
          <div className="main-container">
            <div className="small-padding">
              <Reveal>
                <SectionHeader eyebrow="Key Features" title="What I Built" />
              </Reveal>
              <ul className="dev-project-features" style={{ "--dev-accent": accent } as CSSProperties}>
                {project.features.map((feature, index) => (
                  <Reveal
                    key={feature}
                    as="li"
                    className="dev-project-features__item"
                    delay={index * 0.06}
                  >
                    {feature}
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : null}

      <ContactSection textClassName="contact-section-text top" />

      <SiteFooter currentPage="projects" />
    </PageShell>
  );
}
