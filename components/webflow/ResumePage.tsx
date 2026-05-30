import type { ReactNode } from "react";
import Reveal from "@/components/motion/Reveal";
import PageShell from "@/components/ui/PageShell";
import PrintResumeButton from "@/components/ui/resume/PrintResumeButton";
import SectionHeader from "@/components/ui/SectionHeader";
import { WebflowLink } from "@/components/webflow/WebflowLink";
import SiteFooter from "@/components/webflow/SiteFooter";
import { devProjectPath } from "@/lib/cms/paths";
import type { DevProject } from "@/lib/cms/types";
import type { Resume } from "@/lib/content/resume";
import { getResumePdfPath } from "@/lib/content/resume";

type ResumePageProps = {
  resume: Resume;
  projects: DevProject[];
};

function formatDateRange(start: string, end: string): string {
  return `${start} – ${end}`;
}

function ContactLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="resume-contact__link">
        {children}
      </a>
    );
  }

  return (
    <WebflowLink href={href} className="resume-contact__link">
      {children}
    </WebflowLink>
  );
}

export default function ResumePage({ resume, projects }: ResumePageProps) {
  const pdfPath = getResumePdfPath(resume);
  const { contact } = resume;

  return (
    <PageShell currentPage="resume">
      <div className="resume-page">
        <div className="section top-section resume-hero">
          <div className="main-container">
            <div className="top-spacing">
              <div className="medium-padding">
                <div className="resume-hero__inner">
                  <Reveal as="div" immediate className="resume-hero__header">
                    <div className="small-sub-title">Resume</div>
                    <h1 className="large-titlee resume-hero__name">Joe Webb</h1>
                    <p className="big resume-hero__headline">{resume.headline}</p>
                  </Reveal>

                  <Reveal immediate delay={0.06} className="resume-contact">
                    <ContactLink href={`mailto:${contact.email}`}>{contact.email}</ContactLink>
                    <span className="resume-contact__sep" aria-hidden="true">
                      ·
                    </span>
                    <span className="resume-contact__text">{contact.location}</span>
                    <span className="resume-contact__sep" aria-hidden="true">
                      ·
                    </span>
                    <ContactLink href={contact.website} external>
                      joewebbdesigns.com
                    </ContactLink>
                    <span className="resume-contact__sep" aria-hidden="true">
                      ·
                    </span>
                    <ContactLink href={contact.linkedin} external>
                      LinkedIn
                    </ContactLink>
                    <span className="resume-contact__sep" aria-hidden="true">
                      ·
                    </span>
                    <ContactLink href={contact.github} external>
                      GitHub
                    </ContactLink>
                  </Reveal>

                  <Reveal immediate delay={0.1} className="resume-actions resume-actions--screen">
                    <a
                      href={pdfPath}
                      download={resume.pdfFilename}
                      className="resume-actions__btn resume-actions__btn--primary"
                    >
                      Download PDF
                    </a>
                    <PrintResumeButton />
                  </Reveal>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="section resume-section">
          <div className="main-container">
            <div className="medium-padding">
              <Reveal className="resume-block">
                <SectionHeader eyebrow="Summary" title="Professional summary" eyebrowAccent={false} />
                <p className="regular resume-summary">{resume.summary}</p>
              </Reveal>
            </div>
          </div>
        </div>

        <div className="section black-bg resume-section">
          <div className="main-container">
            <div className="medium-padding">
              <Reveal className="resume-block">
                <SectionHeader eyebrow="Skills" title="Technical skills" eyebrowAccent={false} />
                <div className="dev-project-stack resume-skills">
                  {resume.skills.map((skill) => (
                    <span key={skill} className="dev-project-stack__badge">
                      {skill}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        <div className="section resume-section">
          <div className="main-container">
            <div className="medium-padding">
              <Reveal className="resume-block">
                <SectionHeader eyebrow="Experience" title="Work history" eyebrowAccent={false} />
                <div className="resume-experience">
                  {resume.experience.map((role) => (
                    <article key={`${role.company}-${role.start}`} className="resume-experience__item">
                      <div className="resume-experience__meta">
                        <time className="resume-experience__dates">
                          {formatDateRange(role.start, role.end)}
                        </time>
                        <span className="resume-experience__location">{role.location}</span>
                      </div>
                      <div className="resume-experience__body">
                        <h3 className="resume-experience__title">{role.title}</h3>
                        <p className="resume-experience__company">{role.company}</p>
                        <ul className="resume-experience__bullets">
                          {role.bullets.map((bullet) => (
                            <li key={bullet} className="regular">
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </article>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        {projects.length > 0 ? (
          <div className="section black-bg resume-section">
            <div className="main-container">
              <div className="medium-padding">
                <Reveal className="resume-block">
                  <SectionHeader eyebrow="Projects" title="Selected work" eyebrowAccent={false} />
                  <div className="resume-projects">
                    {projects.map((project) => (
                      <article key={project.slug} className="resume-project">
                        <div className="resume-project__header">
                          <div>
                            {project.year ? (
                              <div className="dev-project-card__year">{project.year}</div>
                            ) : null}
                            <h3 className="resume-project__name">{project.name}</h3>
                            <p className="resume-project__tagline">{project.tagline}</p>
                          </div>
                        </div>
                        <p className="regular resume-project__desc">{project.description}</p>
                        <div className="dev-project-stack">
                          {project.stack.map((tech) => (
                            <span
                              key={tech}
                              className="dev-project-stack__badge"
                              style={
                                project.accentColor
                                  ? { borderColor: `${project.accentColor}44` }
                                  : undefined
                              }
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <div className="dev-project-links resume-project__links">
                          <WebflowLink
                            href={devProjectPath(project.slug)}
                            className="dev-project-links__btn dev-project-links__btn--primary"
                          >
                            View case study
                          </WebflowLink>
                          {project.githubUrl ? (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="dev-project-links__btn"
                            >
                              GitHub
                            </a>
                          ) : null}
                          {project.liveUrl ? (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="dev-project-links__btn"
                            >
                              Live demo
                            </a>
                          ) : null}
                        </div>
                      </article>
                    ))}
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        ) : null}

        <div className="section resume-section">
          <div className="main-container">
            <div className="medium-padding">
              <Reveal className="resume-block">
                <SectionHeader eyebrow="Education" title="Education" eyebrowAccent={false} />
                <div className="resume-education">
                  {resume.education.map((entry) => (
                    <article key={entry.institution} className="resume-education__item">
                      <div className="resume-education__meta">
                        <time className="resume-education__dates">
                          {formatDateRange(entry.start, entry.end)}
                        </time>
                      </div>
                      <div className="resume-education__body">
                        <h3 className="resume-education__institution">{entry.institution}</h3>
                        <p className="regular resume-education__degree">{entry.degree}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>

      <SiteFooter currentPage="resume" />
    </PageShell>
  );
}
