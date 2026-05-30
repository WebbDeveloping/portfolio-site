import type { Metadata } from "next";
import StartProjectPage from "@/components/webflow/StartProjectPage";
import WebflowPageShell from "@/components/webflow/WebflowPageShell";
import { getWebflowPageByHtmlFile } from "@/lib/webflow/page-config";

const contactPageConfig = getWebflowPageByHtmlFile("contact.html")!;

export const metadata: Metadata = {
  title: "Start a Project | Joe Webb Designs",
  description:
    "Tell me about your web design, development, or marketing project and receive a tailored quote.",
  openGraph: {
    title: "Start a Project | Joe Webb Designs",
    description:
      "Tell me about your web design, development, or marketing project and receive a tailored quote.",
    images: contactPageConfig.ogImage ? [contactPageConfig.ogImage] : undefined,
  },
};

export default function Page() {
  return (
    <WebflowPageShell
      wfPageId={contactPageConfig.wfPageId}
      bodyClass={contactPageConfig.bodyClass}
    >
      <StartProjectPage />
    </WebflowPageShell>
  );
}
