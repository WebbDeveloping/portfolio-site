import Reveal from "@/components/motion/Reveal";
import CtaBand from "@/components/ui/CtaBand";
import PageShell from "@/components/ui/PageShell";
import SectionHeader from "@/components/ui/SectionHeader";
import ServicesPreviewSection from "@/components/webflow/ServicesPreviewSection";
import SiteFooter from "@/components/webflow/SiteFooter";
import { WebflowLink } from "@/components/webflow/WebflowLink";

export default function AboutPage() {
  return (
    <PageShell currentPage="about">
      <div className="section top-section">
        <div className="main-container">
          <div className="medium-padding">
            <div className="about-wrapper">
              <div className="about-section-wrapper">
                <Reveal immediate className="about-section-text _2" delay={0}>
                  <SectionHeader eyebrow="About Me" title="I'm Joe Webb," eyebrowAccent={false} />
                  <p className="big mb-16px">
                    I&apos;m a web developer & digital marketer from Salt Lake City, Utah. <br />
                  </p>
                  <p className="regular">
                    I specialize in brand identity and lead generation through website development. I
                    have been lucky enough to work with some of the most exciting startups in the
                    country!
                    <br />
                    When it comes to websites, I am passionate about crafting unique and memorable
                    sites that are optimized for conversion rates. <br />
                    ‍<br />
                  </p>
                  <WebflowLink href="/resume" className="learn-more-btn w-inline-block">
                    <div className="project-btn-inside">
                      <div className="button-text white">View resume</div>
                      <img
                        src="/images/5e783247e7efaf4135a2d97a_right-long-arrow-red.svg"
                        loading="lazy"
                        alt=""
                        className="btn-arrow ml-10px"
                      />
                    </div>
                  </WebflowLink>
                </Reveal>
                <Reveal immediate className="about-image-wrapper" delay={0.12}>
                  <img
                    src="/images/Untitled-design-4.png"
                    loading="lazy"
                    srcSet="/images/Untitled-design-4-p-500.png 500w, /images/Untitled-design-4.png 635w"
                    alt=""
                    sizes="(max-width: 479px) 86vw, (max-width: 767px) 90vw, (max-width: 991px) 87vw, (max-width: 1439px) 44vw, 635px"
                    className="image grey profile-me"
                  />
                  <img
                    className="image about-logo"
                    src="/images/joe-webb-logo-white.png"
                    alt=""
                    sizes="(max-width: 479px) 120.00000762939453px, 285px"
                    loading="lazy"
                    srcSet="/images/joe-webb-logo-white-p-500.png 500w, /images/joe-webb-logo-white.png 600w"
                  />
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section">
        <div className="main-container">
          <div className="medium-padding">
            <ServicesPreviewSection />
          </div>
        </div>
      </div>
      <CtaBand />
      <SiteFooter currentPage="about" />
    </PageShell>
  );
}
