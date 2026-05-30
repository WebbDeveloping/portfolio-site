import type { Metadata } from "next";
import HomePage from "@/components/webflow/HomePage";
import WebflowPageShell from "@/components/webflow/WebflowPageShell";
import { getFeaturedDevProjects, getFeaturedPosts } from "@/lib/cms/data";
import { buildWebflowMetadata, getWebflowPageByHtmlFile } from "@/lib/webflow/page-config";

const pageConfig = getWebflowPageByHtmlFile("index.html")!;

export const metadata: Metadata = buildWebflowMetadata(pageConfig);
export const dynamic = "force-dynamic";

export default async function Page() {
  const devProjects = await getFeaturedDevProjects();
  const featuredPosts = await getFeaturedPosts();

  return (
    <WebflowPageShell wfPageId={pageConfig.wfPageId} bodyClass={pageConfig.bodyClass}>
      <HomePage devProjects={devProjects} featuredPosts={featuredPosts} />
    </WebflowPageShell>
  );
}
