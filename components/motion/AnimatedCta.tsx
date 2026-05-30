"use client";

import Reveal from "@/components/motion/Reveal";
import { WebflowLink } from "@/components/webflow/WebflowLink";

export default function AnimatedCta() {
  return (
    <div className="banner-section">
      <Reveal as="div" className="caption red" delay={0}>
        LOOKING FOR AN EXPERT?
      </Reveal>
      <div className="banner-heading">
        <Reveal as="h2" className="style-title cta-large" delay={0.08}>
          LET&apos;S START A PROJECT TOGETHER
        </Reveal>
      </div>
      <Reveal delay={0.16}>
        <WebflowLink
          href="https://start-project.joewebbdesigns.com/project-details"
          target="_blank"
          className="banner-btn w-inline-block"
        >
          <div className="project-btn-inside">
            <div className="button-text white">Tell me the details</div>
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
  );
}
