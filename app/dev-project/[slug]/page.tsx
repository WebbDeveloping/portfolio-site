import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DevProjectDetailPage from "@/components/cms/DevProjectDetailPage";
import WebflowPageShell from "@/components/webflow/WebflowPageShell";
import { getDevProjectBySlug } from "@/lib/cms/data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getDevProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.name} | Joe Webb Designs`,
    description: project.description,
    openGraph: {
      title: project.name,
      description: project.description,
      images: project.heroImage ? [project.heroImage] : undefined,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const project = await getDevProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <WebflowPageShell wfPageId="62b4e3f87b892d3cf411daa9" bodyClass="body">
      <DevProjectDetailPage project={project} />
    </WebflowPageShell>
  );
}
