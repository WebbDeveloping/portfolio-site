import type { ReactNode } from "react";

export type ServiceOffering = {
  id: string;
  title: string;
  summary: string;
  description: string;
  highlights: string[];
  idealFor: string;
  technologies: string[];
};

export const serviceOfferings: ServiceOffering[] = [
  {
    id: "marketing-sites",
    title: "Marketing Sites",
    summary:
      "Fast, conversion-focused websites built with modern tools like React, Next.js, and TypeScript. Every site is optimized for performance, SEO, and accessibility — with Lighthouse scores consistently in the 90s.",
    description:
      "Your website is often the first impression a potential client gets. I build marketing sites that load fast, rank well, and guide visitors toward action — whether that's booking a call, filling out a form, or making a purchase. From single landing pages to multi-page business sites, every project is hand-coded for performance rather than bloated with unnecessary plugins.",
    highlights: [
      "Custom design tailored to your brand and goals",
      "Mobile-first, fully responsive layouts",
      "SEO setup with meta tags, sitemaps, and structured data",
      "Performance optimization targeting 90+ Lighthouse scores",
      "Accessibility best practices (WCAG)",
      "Analytics and conversion tracking setup",
    ],
    idealFor:
      "Businesses, startups, and freelancers who need a professional online presence that generates leads and builds credibility.",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "product-ui-web-apps",
    title: "Product UI & Web Apps",
    summary:
      "Frontend development for web applications, dashboards, and customer-facing products with clean architecture, reusable components, and attention to usability.",
    description:
      "Beyond marketing sites, I build the interfaces people actually use day-to-day — SaaS dashboards, customer portals, admin panels, and interactive web apps. I focus on frontend architecture that scales: modular components, consistent patterns, and interfaces that feel intuitive from the first click. Whether you're launching an MVP or refactoring an existing product, I bring product-level thinking to every screen.",
    highlights: [
      "Customer-facing apps and internal admin dashboards",
      "Component-based architecture for long-term maintainability",
      "Responsive layouts across desktop, tablet, and mobile",
      "Integration with REST APIs and backend services",
      "State management and data-fetching patterns",
      "Collaboration with backend teams or solo full-stack delivery",
    ],
    idealFor:
      "Founders, product teams, and agencies building web applications that need a polished, scalable frontend.",
    technologies: ["React", "Next.js", "TypeScript", "Node.js"],
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design & Redesigns",
    summary:
      "End-to-end UI/UX design — from wireframes and prototypes in Figma to fully implemented interfaces, including complete app and portal redesigns.",
    description:
      "Good design isn't just about aesthetics — it's about clarity, flow, and helping users accomplish their goals without friction. I work through the full design process: research and requirements, wireframes, high-fidelity prototypes, and implementation. I've led complete redesigns of customer-facing applications and internal admin tools, working directly with stakeholders to align on features, user flows, and visual direction.",
    highlights: [
      "User flow mapping and information architecture",
      "Wireframes and interactive Figma prototypes",
      "Visual design with typography, color, and layout systems",
      "Full UI redesigns for existing products",
      "Design-to-code handoff or direct implementation",
      "Stakeholder collaboration and iterative feedback cycles",
    ],
    idealFor:
      "Teams with an outdated interface, a new product idea, or a need for professional design before development begins.",
    technologies: ["Figma", "Wireframing", "Prototyping", "Design Systems"],
  },
  {
    id: "funnels-integrations",
    title: "Funnels & Integrations",
    summary:
      "Conversion-optimized funnels and landing pages wired up with Stripe payments, custom authentication, analytics tracking, and CRM connections.",
    description:
      "A landing page only works if it connects to the rest of your business. I build funnels that don't just look good — they capture leads, process payments, and sync with the tools you already use. From simple lead-capture pages to multi-step funnels with payment flows, I design user journeys that reduce drop-off and maximize conversions.",
    highlights: [
      "High-converting landing pages and multi-step funnels",
      "Stripe payment integration and checkout flows",
      "Custom authentication and user account systems",
      "Google Analytics, Tag Manager, and event tracking",
      "CRM and email marketing platform connections",
      "A/B-ready page structures for testing and iteration",
    ],
    idealFor:
      "Coaches, agencies, e-commerce brands, and service businesses that need pages built to capture leads and drive revenue.",
    technologies: ["Stripe", "GoHighLevel", "Google Analytics", "REST APIs"],
  },
  {
    id: "webflow-websites",
    title: "Webflow Websites",
    summary:
      "Custom Webflow sites for clients who want a visually polished, CMS-powered website they can manage and update themselves.",
    description:
      "Not every project needs custom code. Webflow is a great fit when you want a beautiful, responsive site with a visual CMS you can update without a developer. I design and build custom Webflow sites from scratch — no templates — with clean structure, responsive breakpoints, and CMS collections set up so you can manage blog posts, team members, portfolio items, and more on your own.",
    highlights: [
      "Custom Webflow design — no generic templates",
      "CMS setup for blogs, portfolios, and dynamic content",
      "Responsive design across all device sizes",
      "SEO-friendly structure and meta configuration",
      "Client handoff with editing guidance",
      "Optional integrations with forms, analytics, and third-party tools",
    ],
    idealFor:
      "Business owners and marketers who want a professional site they can update themselves without touching code.",
    technologies: ["Webflow", "Webflow CMS"],
  },
  {
    id: "gohighlevel-websites",
    title: "GoHighLevel Websites",
    summary:
      "Custom websites and funnels built inside GoHighLevel — ideal for agencies and businesses already on the platform.",
    description:
      "If you're already running your business on GoHighLevel, I can build websites and funnels that live natively inside your GHL account. That means your pages connect directly to your pipelines, automations, calendars, and contact records without duct-taping third-party tools together. I design clean, professional GHL sites and landing pages with layouts and flows tested to convert.",
    highlights: [
      "Custom GHL website and funnel design",
      "Direct integration with GHL pipelines and automations",
      "Lead capture forms connected to your CRM",
      "Mobile-responsive layouts optimized for conversion",
      "Calendar booking and appointment flows",
      "Consistent branding across all GHL assets",
    ],
    idealFor:
      "Agencies, coaches, and local businesses already using GoHighLevel who need professional pages built on the platform.",
    technologies: ["GoHighLevel"],
  },
];

function highlightTechnologies(text: string, technologies: string[]): ReactNode {
  if (technologies.length === 0) {
    return text;
  }

  const pattern = new RegExp(`(${technologies.map((tech) => tech.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g");
  const parts = text.split(pattern);

  return parts.map((part, index) =>
    technologies.includes(part) ? (
      <span key={`${part}-${index}`} className="primary">
        {part}
      </span>
    ) : (
      part
    ),
  );
}

export type HomeServiceItem = {
  id: string;
  title: string;
  content: ReactNode;
};

export const homeServices: HomeServiceItem[] = serviceOfferings.map((service) => ({
  id: service.id,
  title: service.title,
  content: (
    <p className="answer-text regular">{highlightTechnologies(service.summary, service.technologies)}</p>
  ),
}));
