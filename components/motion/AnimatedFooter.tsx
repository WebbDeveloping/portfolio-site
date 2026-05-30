"use client";

import type { ReactNode } from "react";
import Reveal from "@/components/motion/Reveal";
import { WebflowLink } from "@/components/webflow/WebflowLink";

type FooterLink = {
  href: string;
  label: string;
  current?: boolean;
};

type AnimatedFooterProps = {
  links: FooterLink[];
};

export default function AnimatedFooter({ links }: AnimatedFooterProps) {
  return (
    <div className="footer-grid">
      <Reveal delay={0}>
        <img
          src="/images/joe-webb-logo-white.png"
          loading="lazy"
          sizes="(max-width: 479px) 125px, (max-width: 991px) 215px, (max-width: 1439px) 15vw, 215px"
          srcSet="/images/joe-webb-logo-white-p-500.png 500w, /images/joe-webb-logo-white.png 600w"
          alt=""
          className="brand footer"
        />
      </Reveal>
      <Reveal className="footer-col" delay={0.08}>
        <div>
          <h6 className="sub-title h6 mb-16px">Contact:</h6>
          <div className="contact-email">webbdeveloping@gmail.com</div>
        </div>
      </Reveal>
      <Reveal className="footer-col" delay={0.16}>
        <h6 className="sub-title h6">Navigation</h6>
        <div className="link-wrapper">
          {links.map((link) => (
            <FooterNavLink key={link.href} href={link.href} current={link.current}>
              {link.label}
            </FooterNavLink>
          ))}
        </div>
      </Reveal>
    </div>
  );
}

function FooterNavLink({
  href,
  current,
  children,
}: {
  href: string;
  current?: boolean;
  children: ReactNode;
}) {
  return (
    <WebflowLink
      href={href}
      aria-current={current ? "page" : undefined}
      className={`footer-link w-inline-block${current ? " w--current" : ""}`}
    >
      <div className="regular mb-16px">{children}</div>
    </WebflowLink>
  );
}
