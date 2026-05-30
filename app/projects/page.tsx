import type { Metadata } from "next";
import ProjectsPage from "@/components/webflow/ProjectsPage";
import WebflowPageShell from "@/components/webflow/WebflowPageShell";
import { getProjects } from "@/lib/cms/data";
import { buildWebflowMetadata, getWebflowPageByHtmlFile } from "@/lib/webflow/page-config";

const pageConfig = getWebflowPageByHtmlFile("projects.html")!;

export const metadata: Metadata = buildWebflowMetadata(pageConfig);
export const dynamic = "force-dynamic";

export default async function Page() {
  const projects = await getProjects();

  return (
    <WebflowPageShell wfPageId={pageConfig.wfPageId} bodyClass={pageConfig.bodyClass}>
      <ProjectsPage projects={projects} />
    </WebflowPageShell>
  );
}
