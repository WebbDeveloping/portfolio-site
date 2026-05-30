import CollectionList from "@/components/admin/CollectionList";
import { prisma } from "@/lib/db";

export default async function AdminPostsPage() {
  const posts = await prisma.post.findMany({ orderBy: { name: "asc" } });

  return (
    <CollectionList
      title="Posts"
      basePath="/admin/posts"
      newHref="/admin/posts/new"
      items={posts.map((p) => ({
        id: p.id,
        title: p.name,
        slug: p.slug,
        subtitle: p.featured ? "Featured" : undefined,
      }))}
    />
  );
}
