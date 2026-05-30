import { DevProjectGrid } from "@/components/cms/DevProjectCard";
import PageHero from "@/components/ui/PageHero";
import PageShell from "@/components/ui/PageShell";
import { WebflowLink } from "@/components/webflow/WebflowLink";
import SiteFooter from "@/components/webflow/SiteFooter";
import type { DevProject } from "@/lib/cms/types";

type DevProjectsPageProps = {
  projects: DevProject[];
};

export default function DevProjectsPage({ projects }: DevProjectsPageProps) {
  return (
    <PageShell currentPage="dev-projects">
      <PageHero
        title="Dev Projects"
        className="dev-page-hero dev-projects-page-hero"
        padding="small"
        titleClassName="mb-16px"
        subtitle={
          <>
            <RevealParagraph />
            <WebflowLink href="#projects" className="btn-arrow-down-red mb-8px w-inline-block">
              <div className="inside-button-container">
                <div className="button-text red">View Projects</div>
                <img src="/images/down-arrow.svg" loading="lazy" alt="" className="image arrow" />
              </div>
            </WebflowLink>
          </>
        }
      />
      <div id="projects" className="section project-section">
        <div className="main-container">
          <div className="w-dyn-list">
            <DevProjectGrid projects={projects} />
          </div>
        </div>
      </div>
      <SiteFooter currentPage="dev-projects" />
    </PageShell>
  );
}

function RevealParagraph() {
  return (
    <p className="dev-projects-hero__desc">
      Software I&apos;ve built — APIs, apps, and tools. No mockups required.
    </p>
  );
}
