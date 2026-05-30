import NotFoundPage from "@/components/webflow/NotFoundPage";
import WebflowPageShell from "@/components/webflow/WebflowPageShell";
import { getWebflowPageByHtmlFile } from "@/lib/webflow/page-config";

const pageConfig = getWebflowPageByHtmlFile("404.html")!;

export default function NotFound() {
  return (
    <WebflowPageShell wfPageId={pageConfig.wfPageId} bodyClass={pageConfig.bodyClass}>
      <NotFoundPage />
    </WebflowPageShell>
  );
}
