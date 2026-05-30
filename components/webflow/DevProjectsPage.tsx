import { DevProjectGrid } from "@/components/cms/DevProjectCard";
import Reveal from "@/components/motion/Reveal";
import PageShell from "@/components/ui/PageShell";
import { WebflowLink } from "@/components/webflow/WebflowLink";
import SiteFooter from "@/components/webflow/SiteFooter";
import type { DevProject } from "@/lib/cms/types";

type DevProjectsPageProps = {
  projects: DevProject[];
};

export default function DevProjectsPage({ projects }: DevProjectsPageProps) {
  return (
    <PageShell currentPage="projects">
      <div className="section section-cta padding-top dev-projects-page-hero">
        <div className="main-container">
          <div className="small-padding">
            <div className="banner-section">
              <div className="banner-heading">
                <Reveal as="h1" immediate className="style-title cta-large">
                  Projects
                </Reveal>
              </div>
              <Reveal as="p" immediate className="dev-projects-hero__desc">
                Selected development work — web apps, APIs, and tools built end to end. Each
                project covers the stack, the problem it solves, and links to source code or a
                live demo.
              </Reveal>
              <Reveal immediate delay={0.08}>
                <WebflowLink href="#projects" className="btn-arrow-down-red w-inline-block">
                  <div className="inside-button-container">
                    <div className="button-text red">View Projects</div>
                    <img src="/images/down-arrow.svg" loading="lazy" alt="" className="image arrow" />
                  </div>
                </WebflowLink>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
      <div id="projects" className="section project-section">
        <div className="main-container">
          <div className="w-dyn-list">
            <DevProjectGrid projects={projects} />
          </div>
        </div>
      </div>
      <SiteFooter currentPage="projects" />
    </PageShell>
  );
}
