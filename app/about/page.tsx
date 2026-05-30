import type { Metadata } from "next";
import AboutPage from "@/components/webflow/AboutPage";
import WebflowPageShell from "@/components/webflow/WebflowPageShell";
import { buildWebflowMetadata, getWebflowPageByHtmlFile } from "@/lib/webflow/page-config";

const pageConfig = getWebflowPageByHtmlFile("about.html")!;

export const metadata: Metadata = buildWebflowMetadata(pageConfig);

export default function Page() {
  return (
    <WebflowPageShell wfPageId={pageConfig.wfPageId} bodyClass={pageConfig.bodyClass}>
      <AboutPage />
    </WebflowPageShell>
  );
}
