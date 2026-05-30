import { ProjectLiveLink } from "@/components/cms/ProjectCard";
import Reveal from "@/components/motion/Reveal";
import ContactSection from "@/components/ui/ContactSection";
import PageHero from "@/components/ui/PageHero";
import PageShell from "@/components/ui/PageShell";
import SectionHeader from "@/components/ui/SectionHeader";
import SiteFooter from "@/components/webflow/SiteFooter";
import type { Project } from "@/lib/cms/types";
import { uniqueUrls } from "@/lib/cms/utils";

type ProjectDetailPageProps = {
  project: Project;
};

export default function ProjectDetailPage({ project }: ProjectDetailPageProps) {
  const heroImage = project.mainImage || project.largeDesktopImg || project.standardDesktopImg;
  const responsiveImages = uniqueUrls([
    project.largeDesktopImg,
    project.standardDesktopImg,
    project.tabletImg,
    project.mobileImg,
  ]);
  const showAdditionalSection =
    project.additionalPhotos.length > 0 || Boolean(project.liveLink);

  return (
    <PageShell currentPage={null}>
      <PageHero
        title={project.name}
        subtitle={
          project.servicesRendered ? (
            <div
              className="page-sub-title w-richtext"
              dangerouslySetInnerHTML={{ __html: project.servicesRendered }}
            />
          ) : undefined
        }
      />

      {heroImage ? (
        <div className="section black-bg">
          <div className="main-container">
            <div className="small-padding">
              <div className="about-section">
                <img loading="lazy" src={heroImage} alt={project.name} />
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {(project.projectOverview || project.projectContribution) && (
        <div className="section black-bg">
          <div className="main-container">
            <div className="small-padding">
              <div className="about-section">
                {project.projectOverview ? (
                  <Reveal className="project-over-view-section">
                    <SectionHeader
                      eyebrow="Project Overview"
                      eyebrowVariant="caption"
                      title="Overview"
                    />
                    <div className="about-paragraph">
                      <p className="regular">{project.projectOverview}</p>
                    </div>
                  </Reveal>
                ) : null}
                {project.projectContribution ? (
                  <Reveal className="contact-section-text justify-start" delay={0.1}>
                    <SectionHeader title="My Contributions" eyebrowAccent={false} />
                    <div className="about-paragraph">
                      <p className="regular">{project.projectContribution}</p>
                    </div>
                  </Reveal>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}

      {responsiveImages.length > 0 ? (
        <>
          <div className="section bg-jet">
            <div className="main-container">
              <div className="small-padding top-border">
                <SectionHeader
                  eyebrow="Desktop, Tablet and Mobile."
                  title="Fully Responsive Designs"
                />
              </div>
            </div>
          </div>
          <div className="section black-bg">
            <div className="main-container">
              <div className="small-padding">
                <div className="about-section">
                  {responsiveImages.map((image, index) => (
                    <Reveal key={image} className="contact-page-right gray-bg" delay={index * 0.08}>
                      <img src={image} loading="lazy" alt={project.name} className="image" />
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}

      {project.finalThought ? (
        <div className="section bg-jet">
          <div className="main-container">
            <div className="small-padding">
              <div className="about-section">
                <Reveal className="client-feedback-left">
                  <SectionHeader
                    eyebrow="Final thoughts &"
                    title="Additional Images"
                  />
                </Reveal>
                <Reveal className="client-feedback-right" delay={0.1}>
                  <p className="big">{project.finalThought}</p>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {showAdditionalSection ? (
        <div className="section">
          <div className="main-container">
            <div className="small-padding">
              {project.additionalPhotos.length > 0 ? (
                <div role="list" className="additional-classes w-dyn-items">
                  {project.additionalPhotos.map((photo) => (
                    <div key={photo} role="listitem" className="additional-image-wrap gray-bg w-dyn-item">
                      <img src={photo} loading="lazy" alt={project.name} className="black-bg" />
                    </div>
                  ))}
                </div>
              ) : null}
              <div className="live-link-cetner">
                <ProjectLiveLink href={project.liveLink}>View Live Preview</ProjectLiveLink>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {project.clientFeedback ? (
        <div className="section bg-jet">
          <div className="main-container">
            <div className="small-padding">
              <div className="about-section">
                <Reveal className="client-feedback-left">
                  <SectionHeader
                    eyebrow="Client Feedback"
                    eyebrowVariant="caption"
                    title="What They Said"
                  />
                </Reveal>
                <Reveal className="client-feedback-right" delay={0.1}>
                  <div className="about-paragraph">
                    <p className="big">{project.clientFeedback}</p>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <ContactSection textClassName="contact-section-text top" />

      <SiteFooter currentPage={null} />
    </PageShell>
  );
}
