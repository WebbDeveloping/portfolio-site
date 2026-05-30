import Reveal from "@/components/motion/Reveal";
import PageShell from "@/components/ui/PageShell";
import ProjectIntakeForm from "@/components/ui/project-intake/ProjectIntakeForm";
import SiteFooter from "@/components/webflow/SiteFooter";

export default function StartProjectPage() {
  return (
    <PageShell currentPage={null}>
      <div className="section black-bg padding-top start-project-section">
        <div className="main-container">
          <div className="small-padding">
            <div className="banner-section start-project-hero">
              <Reveal as="div" immediate className="caption red">
                START A PROJECT
              </Reveal>
              <div className="banner-heading">
                <Reveal as="h1" immediate className="style-title cta-large">
                  Tell me about your project
                </Reveal>
              </div>
              <Reveal immediate delay={0.08} className="start-project-hero__lead">
                <p className="big">
                  Answer a few quick questions so I can understand your goals and send you a
                  tailored quote.
                </p>
              </Reveal>
            </div>
          </div>
          <div className="small-padding padding-top-0">
            <Reveal className="start-project-form" delay={0.12}>
              <ProjectIntakeForm />
            </Reveal>
          </div>
        </div>
      </div>
      <SiteFooter currentPage={null} />
    </PageShell>
  );
}
