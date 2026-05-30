import type { Metadata } from "next";

export type WebflowPageConfig = {
  htmlFile: string;
  componentName: string;
  route: string | null;
  wfPageId: string;
  bodyClass: string;
  title: string;
  description: string;
  ogImage?: string;
};

export const WEBFLOW_PAGES: WebflowPageConfig[] = [
  {
    htmlFile: "index.html",
    componentName: "HomePage",
    route: "/",
    wfPageId: "62b4e3f87b892df39e11da9f",
    bodyClass: "body",
    title: "Joe Webb Designs | Professional Web Design & Development",
    description:
      "I am Joe Webb, a website developer and online entrepreneur. I have designed and developed dozens of websites to help generate thousands of leads for companies across the United States.",
    ogImage:
      "https://uploads-ssl.webflow.com/60a197545c7bb00bdddb264a/61773299073c36b0ecb78c93_Screen%20Shot%202021-10-25%20at%204.41.25%20PM.png",
  },
  {
    htmlFile: "about.html",
    componentName: "AboutPage",
    route: "/about",
    wfPageId: "62b4e3f87b892d6d5e11daa5",
    bodyClass: "body",
    title: "Joe Webb Designs | Professional Web Design & Development",
    description:
      "I am Joe Webb, a website developer and online entrepreneur. I have designed and developed dozens of websites to help generate thousands of leads for companies across the United States.",
    ogImage:
      "https://uploads-ssl.webflow.com/60a197545c7bb00bdddb264a/617734261bec7c5c03ee1e5e_Screen%20Shot%202021-10-25%20at%204.47.59%20PM.png",
  },
  {
    htmlFile: "projects.html",
    componentName: "DevProjectsPage",
    route: "/projects",
    wfPageId: "62b4e3f87b892d702b11dab0",
    bodyClass: "body",
    title: "Projects | Joe Webb Designs",
    description: "Software projects I've built — APIs, apps, and developer tools.",
    ogImage:
      "https://uploads-ssl.webflow.com/60a197545c7bb00bdddb264a/61773299073c36b0ecb78c93_Screen%20Shot%202021-10-25%20at%204.41.25%20PM.png",
  },
  {
    htmlFile: "contact.html",
    componentName: "ContactPage",
    route: "/contact",
    wfPageId: "62b4e3f87b892db85711daa7",
    bodyClass: "body",
    title: "Contact",
    description:
      "I am Joe Webb, a website developer and online entrepreneur. I have designed and developed dozens of websites to help generate thousands of leads for companies across the United States.",
    ogImage:
      "https://uploads-ssl.webflow.com/60a197545c7bb00bdddb264a/61773299073c36b0ecb78c93_Screen%20Shot%202021-10-25%20at%204.41.25%20PM.png",
  },
  {
    htmlFile: "404.html",
    componentName: "NotFoundPage",
    route: null,
    wfPageId: "62b4e3f87b892db9ae11daa4",
    bodyClass: "body",
    title: "404 | Joe Webb Designs | Professional Web Design & Development",
    description:
      "I am Joe Webb, a website developer and online entrepreneur. I have designed and developed dozens of websites to help generate thousands of leads for companies across the United States.",
    ogImage:
      "https://uploads-ssl.webflow.com/60a197545c7bb00bdddb264a/61773299073c36b0ecb78c93_Screen%20Shot%202021-10-25%20at%204.41.25%20PM.png",
  },
];

export function getWebflowPageByHtmlFile(htmlFile: string) {
  return WEBFLOW_PAGES.find((page) => page.htmlFile === htmlFile);
}

export function getWebflowPageConfig(route: string) {
  return WEBFLOW_PAGES.find((page) => page.route === route);
}

export function buildWebflowMetadata(config: WebflowPageConfig): Metadata {
  return {
    title: config.title,
    description: config.description,
    openGraph: {
      title: config.title,
      description: config.description,
      images: config.ogImage ? [config.ogImage] : undefined,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: config.title,
      description: config.description,
      images: config.ogImage ? [config.ogImage] : undefined,
    },
  };
}
