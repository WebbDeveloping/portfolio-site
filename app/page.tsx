import type { Metadata } from "next";
import HomePage from "@/components/webflow/HomePage";
import WebflowPageShell from "@/components/webflow/WebflowPageShell";
import { getFeaturedPosts, getFeaturedProjects } from "@/lib/cms/data";
import { buildWebflowMetadata, getWebflowPageByHtmlFile } from "@/lib/webflow/page-config";

const pageConfig = getWebflowPageByHtmlFile("index.html")!;

export const metadata: Metadata = buildWebflowMetadata(pageConfig);
export const dynamic = "force-dynamic";

export default async function Page() {
  const featuredProjects = await getFeaturedProjects(2);
  const featuredPosts = await getFeaturedPosts();

  return (
    <WebflowPageShell wfPageId={pageConfig.wfPageId} bodyClass={pageConfig.bodyClass}>
      <HomePage featuredProjects={featuredProjects} featuredPosts={featuredPosts} />
    </WebflowPageShell>
  );
}
