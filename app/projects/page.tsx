import type { Metadata } from "next";
import DevProjectsPage from "@/components/webflow/DevProjectsPage";
import WebflowPageShell from "@/components/webflow/WebflowPageShell";
import { getDevProjects } from "@/lib/cms/data";
import { buildWebflowMetadata, getWebflowPageByHtmlFile } from "@/lib/webflow/page-config";

const pageConfig = getWebflowPageByHtmlFile("projects.html")!;

export const metadata: Metadata = buildWebflowMetadata(pageConfig);
export const dynamic = "force-dynamic";

export default async function Page() {
  const projects = await getDevProjects();

  return (
    <WebflowPageShell wfPageId={pageConfig.wfPageId} bodyClass={pageConfig.bodyClass}>
      <DevProjectsPage projects={projects} />
    </WebflowPageShell>
  );
}
