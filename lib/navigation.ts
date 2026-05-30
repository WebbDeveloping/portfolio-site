export type SitePageId =
  | "home"
  | "about"
  | "projects"
  | "contact"
  | "videos"
  | "resume"
  | null;

type FooterLinkConfig = {
  id: Exclude<SitePageId, null>;
  href: string;
  label: string;
};

const FOOTER_LINKS: FooterLinkConfig[] = [
  { id: "home", href: "index.html", label: "Home" },
  { id: "about", href: "about.html", label: "About" },
  { id: "projects", href: "projects.html", label: "Projects" },
  { id: "resume", href: "/resume", label: "Resume" },
  { id: "contact", href: "contact.html", label: "Contact" },
];

export type FooterLink = {
  href: string;
  label: string;
  current?: boolean;
};

export function getFooterLinks(currentPage: SitePageId): FooterLink[] {
  return FOOTER_LINKS.map((link) => ({
    href: link.href,
    label: link.label,
    current: link.id === currentPage,
  }));
}

export function navLinkClass(base: string, current: boolean): string {
  return current ? `${base} w--current` : base;
}

export function navLinkProps(base: string, current: boolean) {
  return {
    className: navLinkClass(base, current),
    ...(current ? { "aria-current": "page" as const } : {}),
  };
}
