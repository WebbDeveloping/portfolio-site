import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetailPage from "@/components/cms/ProjectDetailPage";
import WebflowPageShell from "@/components/webflow/WebflowPageShell";
import { getProjectBySlug, getProjects } from "@/lib/cms/data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.name,
    description: project.projectOverview,
    openGraph: {
      title: project.name,
      description: project.projectOverview,
      images: project.mainImage ? [project.mainImage] : undefined,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <WebflowPageShell wfPageId="62b4e3f87b892d3cf411daa9" bodyClass="body">
      <ProjectDetailPage project={project} />
    </WebflowPageShell>
  );
}
