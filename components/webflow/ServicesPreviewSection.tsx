import Reveal from "@/components/motion/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import ServiceAccordion from "@/components/webflow/ServiceAccordion";
import { WebflowLink } from "@/components/webflow/WebflowLink";
import { homeServices } from "@/lib/content/services";

export default function ServicesPreviewSection() {
  return (
    <div className="service-section">
      <Reveal className="service-section-text">
        <SectionHeader eyebrow="SERVICES" title="What I Do" />
        <div className="about-sub-heading">
          <p className="big">
            As a Frontend Web Developer and Designer, I specialize in designing and developing
            websites that not only look great but also help businesses generate leads and sales. I
            use my skills and expertise to build websites that exceed clients&apos; expectations,
            from ideation to execution.
          </p>
        </div>
        <div className="about-paragraph">
          <p className="regular">
            From high-performance marketing sites to product UI and conversion funnels — I bring
            5+ years of experience and 80+ delivered projects to every engagement.
          </p>
        </div>
        <WebflowLink href="/services" className="learn-more-btn w-inline-block">
          <div className="project-btn-inside">
            <div className="button-text white">View all services</div>
            <img
              src="/images/5e783247e7efaf4135a2d97a_right-long-arrow-red.svg"
              loading="lazy"
              alt=""
              className="btn-arrow ml-10px"
            />
          </div>
        </WebflowLink>
      </Reveal>
      <Reveal className="service-list" delay={0.12}>
        <ServiceAccordion items={homeServices} />
      </Reveal>
    </div>
  );
}
