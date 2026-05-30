import type { Metadata } from "next";
import ServicesPage from "@/components/webflow/ServicesPage";
import WebflowPageShell from "@/components/webflow/WebflowPageShell";
import { getWebflowPageByHtmlFile } from "@/lib/webflow/page-config";

const homePageConfig = getWebflowPageByHtmlFile("index.html")!;

export const metadata: Metadata = {
  title: "Services | Joe Webb Designs",
  description:
    "Frontend development, UI/UX design, marketing sites, web apps, funnels, Webflow, and GoHighLevel — services from Joe Webb, a product-focused frontend engineer.",
  openGraph: {
    title: "Services | Joe Webb Designs",
    description:
      "Frontend development, UI/UX design, marketing sites, web apps, funnels, Webflow, and GoHighLevel — services from Joe Webb, a product-focused frontend engineer.",
    images: homePageConfig.ogImage ? [homePageConfig.ogImage] : undefined,
  },
};

export default function Page() {
  return (
    <WebflowPageShell wfPageId={homePageConfig.wfPageId} bodyClass={homePageConfig.bodyClass}>
      <ServicesPage />
    </WebflowPageShell>
  );
}
