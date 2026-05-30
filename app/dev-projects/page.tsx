import type { Metadata } from "next";
import DevProjectsPage from "@/components/webflow/DevProjectsPage";
import WebflowPageShell from "@/components/webflow/WebflowPageShell";
import { getDevProjects } from "@/lib/cms/data";

export const metadata: Metadata = {
  title: "Dev Projects | Joe Webb Designs",
  description: "Software projects I've built — APIs, apps, and developer tools.",
};

export const dynamic = "force-dynamic";

export default async function Page() {
  const projects = await getDevProjects();

  return (
    <WebflowPageShell wfPageId="62b4e3f87b892d702b11dab0" bodyClass="body">
      <DevProjectsPage projects={projects} />
    </WebflowPageShell>
  );
}
