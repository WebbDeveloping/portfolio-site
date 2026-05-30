import { DevProjectMarquee } from "@/components/cms/DevProjectMarquee";
import { PostGrid } from "@/components/cms/PostCard";
import Reveal from "@/components/motion/Reveal";
import CtaBand from "@/components/ui/CtaBand";
import PageShell from "@/components/ui/PageShell";
import SectionHeader from "@/components/ui/SectionHeader";
import ServicesPreviewSection from "@/components/webflow/ServicesPreviewSection";
import SiteFooter from "@/components/webflow/SiteFooter";
import { WebflowLink } from "@/components/webflow/WebflowLink";
import type { DevProject, Post } from "@/lib/cms/types";

type HomePageProps = {
  devProjects: DevProject[];
  featuredPosts: Post[];
};

export default function HomePage({ devProjects, featuredPosts }: HomePageProps) {
  return (
    <PageShell currentPage="home">
      <div className="section hero">
        <div className="main-container">
          <div className="hero-section home-hero">
            <div className="hero-width">
              <div className="hero-section-text">
                <div className="hero-section-heading half-width-hero">
                  <Reveal as="h1" immediate className="large-titlee" delay={0}>
                    I&apos;m <span className="primary">Joe Webb</span>, a{" "}
                    <span className="primary">Frontend Engineer</span> &amp;{" "}
                    <span className="primary">UI/UX Designer</span>.
                    <br />
                  </Reveal>
                </div>
                <div className="hero-section-paragraph">
                  <Reveal as="p" immediate className="regular" delay={0.1}>
                    I design and build{" "}
                    <span className="primary">high-performance websites and web apps</span> with
                    React and Next.js — from marketing sites and product interfaces to
                    conversion-focused funnels. With 5+ years of experience and 80+ projects
                    delivered, I help businesses launch polished experiences that look great,
                    load fast, and turn visitors into customers.
                  </Reveal>
                </div>
                <div className="hero-section-button">
                  <Reveal immediate delay={0.2}>
                    <WebflowLink href="projects.html" className="btn-arrow-down-red w-inline-block">
                      <div className="inside-button-container">
                        <div className="button-text big red">See my PROJECTS</div>
                        <img
                          src="/images/down-arrow.svg"
                          loading="lazy"
                          alt=""
                          className="image cr-arrow right"
                        />
                      </div>
                    </WebflowLink>
                  </Reveal>
                  <Reveal immediate delay={0.28}>
                    <WebflowLink
                      href="contact.html"
                      className="btn-arrow-down-red right-button w-inline-block"
                    >
                      <div className="inside-button-container">
                        <div className="button-text regular white-underline">Get in touch</div>
                      </div>
                    </WebflowLink>
                  </Reveal>
                </div>
              </div>
              <Reveal immediate delay={0.15} className="slash-svg">
                <img
                  src="/images/joe-webb-logo-grey.png"
                  alt=""
                  sizes="(max-width: 479px) 40vw, (max-width: 767px) 28vw, 40vw"
                  loading="eager"
                  fetchPriority="high"
                  srcSet="/images/joe-webb-logo-grey-p-500.png 500w, /images/joe-webb-logo-grey.png 600w"
                />
              </Reveal>
            </div>
          </div>
        </div>
      </div>
      <div className="section section-cta">
        <div className="main-container" />
      </div>
      <div className="section">
        <div className="main-container top-padding">
          <Reveal className="home-dev-projects-header">
            <SectionHeader title="Projects I have built" titleAs="h2" eyebrowAccent={false} />
          </Reveal>
        </div>
        <DevProjectMarquee projects={devProjects} />
        <div className="main-container">
          <WebflowLink href="projects.html" className="banner-btn prjct-btn w-inline-block">
            <div className="project-btn-inside">
              <div className="sub-title white no-wrap">View All Projects</div>
              <img
                src="/images/5e783247e7efaf4135a2d97a_right-long-arrow-red.svg"
                loading="lazy"
                alt=""
                className="btn-arrow ml-10px"
              />
            </div>
          </WebflowLink>
        </div>
      </div>
      <div id="about-me" className="section black-bg padding-top">
        <div className="main-container">
          <div className="extra-small-padding">
            <div className="about-section">
              <Reveal className="about-section-image left-image">
                <img
                  src="/images/Profile-Photo-1.png"
                  loading="lazy"
                  sizes="100vw"
                  srcSet="/images/Profile-Photo-1-p-500.png 500w, /images/Profile-Photo-1.png 650w"
                  alt=""
                  className="image my-face"
                />
              </Reveal>
              <Reveal className="about-section-text" delay={0.1}>
                <SectionHeader eyebrow="About" title="Who Am I?" />
                <div className="about-paragraph">
                  <p className="regular">
                    I&apos;m Joe Webb, an experienced Frontend Web Developer and Web Designer from
                    Salt Lake City, Utah. I specialize in designing and developing websites that not
                    only look great but also help businesses generate leads and sales.
                    <br />
                    <br />
                    Currently, I work at Exploro as a Frontend Developer, where I use my skills and
                    expertise to help build websites that exceed clients&apos; expectations. With
                    almost 5 years of experience in the industry, I have honed my skills in using
                    various technologies to build websites that are both visually appealing and
                    highly functional.
                    <br />
                  </p>
                </div>
                <WebflowLink href="about.html" className="learn-more-btn w-inline-block">
                  <div className="project-btn-inside">
                    <div className="button-text white">Learn More</div>
                    <img
                      src="/images/5e783247e7efaf4135a2d97a_right-long-arrow-red.svg"
                      loading="lazy"
                      alt=""
                      className="btn-arrow"
                    />
                  </div>
                </WebflowLink>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
      <div className="section blog-articles hide">
        <div className="main-container">
          <div className="inpage-scroll blog">
            <div className="content-top articles">
              <div className="split-content article-left">
                <Reveal as="h2" className="title-2 articles-right">
                  More Content
                </Reveal>
              </div>
              <div className="split-content article-right button-right _1">
                <div className="project-button right">
                  <WebflowLink href="#" className="project-btn home-sm w-inline-block">
                    <div className="project-btn-inside">
                      <div className="button-text white">View More Articles</div>
                      <img
                        src="/images/5e783247e7efaf4135a2d97a_right-long-arrow-red.svg"
                        loading="lazy"
                        alt=""
                        className="btn-arrow"
                      />
                    </div>
                  </WebflowLink>
                </div>
              </div>
            </div>
            <div className="w-dyn-list">
              <PostGrid posts={featuredPosts} />
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
      <SiteFooter currentPage="home" />
    </PageShell>
  );
}
