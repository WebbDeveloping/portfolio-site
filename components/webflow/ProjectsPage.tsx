import { ProjectGrid } from "@/components/cms/ProjectCard";
import PageHero from "@/components/ui/PageHero";
import PageShell from "@/components/ui/PageShell";
import { WebflowLink } from "@/components/webflow/WebflowLink";
import SiteFooter from "@/components/webflow/SiteFooter";
import type { Project } from "@/lib/cms/types";

type ProjectsPageProps = {
  projects: Project[];
};

export default function ProjectsPage({ projects }: ProjectsPageProps) {
  return (
    <PageShell currentPage="projects">
      <PageHero
        title="My Projects"
        titleClassName="mb-32px"
        subtitle={
          <WebflowLink href="#" className="btn-arrow-down-red mb-8px w-inline-block">
            <div className="inside-button-container">
              <div className="button-text red">View Projects</div>
              <img src="/images/down-arrow.svg" loading="lazy" alt="" className="image arrow" />
            </div>
          </WebflowLink>
        }
      />
      <div className="section project-section">
        <div className="main-container">
          <div className="w-dyn-list">
            <ProjectGrid projects={projects} />
          </div>
        </div>
      </div>
      <SiteFooter currentPage="projects" />
    </PageShell>
  );
}
