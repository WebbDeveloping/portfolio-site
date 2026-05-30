import Reveal from "@/components/motion/Reveal";
import PageShell from "@/components/ui/PageShell";
import { WebflowLink } from "@/components/webflow/WebflowLink";

export default function LinksPage() {
  return (
    <PageShell currentPage={null} variant="minimal">
      <div className="page-container">
        <div className="container social-media">
          <div className="info-container">
            <Reveal immediate className="image-container social">
              <img
                src="/images/Profile-Photo-copy.png"
                loading="lazy"
                alt=""
                className="image social-image"
              />
            </Reveal>
            <div className="bio-container">
              <Reveal immediate className="bio-name" delay={0.08}>
                Joe Webb
              </Reveal>
              <Reveal immediate className="bio-position" delay={0.14}>
                Digital Marketer & Web Developer
              </Reveal>
            </div>
            <Reveal immediate className="social-link-container" delay={0.2}>
              <WebflowLink href="index.html" className="social-link-block w-inline-block">
                <div className="social-text-block">My Website</div>
              </WebflowLink>
              <WebflowLink href="contact.html" target="_blank" className="social-link-block w-inline-block">
                <div className="social-text-block">Start A Project</div>
              </WebflowLink>
              <WebflowLink href="projects.html" target="_blank" className="social-link-block dark w-inline-block">
                <div className="social-text-block white-text">Website Portfolio</div>
              </WebflowLink>
              <WebflowLink href="contact.html" target="_blank" className="social-link-block dark w-inline-block">
                <div className="social-text-block white-text">General Inquiries</div>
              </WebflowLink>
            </Reveal>
            <Reveal immediate className="social-link-container" delay={0.28}>
              <Reveal immediate className="sub-title center mb-16px red" delay={0.28}>
                Services
              </Reveal>
              <WebflowLink href="contact.html" className="social-link-block dark w-inline-block">
                <div className="social-text-block white-text">Website Development</div>
              </WebflowLink>
              <WebflowLink href="contact.html" className="social-link-block dark w-inline-block">
                <div className="social-text-block white-text">Logo Design</div>
              </WebflowLink>
              <WebflowLink href="contact.html" className="social-link-block dark w-inline-block">
                <div className="social-text-block white-text">Facebook Ads</div>
              </WebflowLink>
              <WebflowLink href="contact.html" className="social-link-block dark w-inline-block">
                <div className="social-text-block white-text">Lead Generation</div>
              </WebflowLink>
            </Reveal>
            <Reveal immediate className="social-link-container" delay={0.36}>
              <div className="sub-title center mb-16px red">Affiliate Links</div>
              <WebflowLink
                href="https://webflow.grsm.io/ydxtv8c0cloj"
                target="_blank"
                className="social-link-block dark w-inline-block"
              >
                <div className="social-text-block white-text">Webflow</div>
              </WebflowLink>
              <WebflowLink href="#" className="social-link-block dark w-inline-block">
                <div className="social-text-block white-text">JotForm</div>
              </WebflowLink>
              <WebflowLink
                href="https://www.gohighlevel.com/main-page?fp_ref=--from-joe-webb"
                className="social-link-block dark w-inline-block"
              >
                <div className="social-text-block white-text">GoHighLevel</div>
              </WebflowLink>
            </Reveal>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
