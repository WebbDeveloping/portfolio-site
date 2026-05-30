import type { Metadata } from "next";
import LinksPage from "@/components/webflow/LinksPage";
import WebflowPageShell from "@/components/webflow/WebflowPageShell";
import { buildWebflowMetadata, getWebflowPageByHtmlFile } from "@/lib/webflow/page-config";

const pageConfig = getWebflowPageByHtmlFile("links.html")!;

export const metadata: Metadata = buildWebflowMetadata(pageConfig);

export default function Page() {
  return (
    <WebflowPageShell wfPageId={pageConfig.wfPageId} bodyClass={pageConfig.bodyClass}>
      <LinksPage />
    </WebflowPageShell>
  );
}
