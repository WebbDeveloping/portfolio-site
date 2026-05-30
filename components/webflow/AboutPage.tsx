import Reveal from "@/components/motion/Reveal";
import CtaBand from "@/components/ui/CtaBand";
import PageShell from "@/components/ui/PageShell";
import SectionHeader from "@/components/ui/SectionHeader";
import ServiceAccordion from "@/components/webflow/ServiceAccordion";
import SiteFooter from "@/components/webflow/SiteFooter";
import { homeServices } from "@/lib/content/home-services";

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
            <div className="service-section">
              <Reveal className="service-section-text">
                <SectionHeader eyebrow="SERVICES" title="What I Do" />
                <div className="about-sub-heading">
                  <p className="big">
                    As a Frontend Web Developer and Designer, I specialize in designing and developing
                    websites that not only look great but also help businesses generate leads and
                    sales. I use my skills and expertise to build websites that exceed clients&apos;
                    expectations, from ideation to execution. In addition to my web development
                    skills, I also have experience in digital marketing and running online ads to a
                    landing page. I can set up Google Analytics and tracking to monitor website
                    performance, and design a website that will convert leads into sales.
                    <br />
                  </p>
                </div>
                <div className="about-paragraph">
                  <p className="regular">
                    I can help you with any and all aspects of marketing. I have personally designed
                    and developed dozens of websites & logos. I have also generated thousands of
                    leads through digital marketing campaigns.
                    <br />
                    With my experience in the field, your ideas will be brought into reality!
                    <br />
                  </p>
                </div>
              </Reveal>
              <Reveal className="service-list" delay={0.12}>
                <ServiceAccordion items={homeServices} />
              </Reveal>
            </div>
          </div>
        </div>
      </div>
      <CtaBand />
      <SiteFooter currentPage="about" />
    </PageShell>
  );
}
