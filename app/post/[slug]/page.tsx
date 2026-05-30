import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PostDetailPage from "@/components/cms/PostDetailPage";
import WebflowPageShell from "@/components/webflow/WebflowPageShell";
import { getPostBySlug } from "@/lib/cms/data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: `${post.name} | Joe Webb Designs`,
    description: post.postSummary,
    openGraph: {
      title: post.name,
      description: post.postSummary,
      images: post.mainImage ? [post.mainImage] : undefined,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <WebflowPageShell wfPageId="62b4e3f87b892d6eba11daa8" bodyClass="body">
      <PostDetailPage post={post} />
    </WebflowPageShell>
  );
}
