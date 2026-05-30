import CollectionList from "@/components/admin/CollectionList";
import { prisma } from "@/lib/db";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { name: "asc" } });

  return (
    <CollectionList
      title="Portfolio projects"
      basePath="/admin/projects"
      newHref="/admin/projects/new"
      items={projects.map((p) => ({
        id: p.id,
        title: p.name,
        slug: p.slug,
        subtitle: p.featured ? "Featured" : p.client || undefined,
      }))}
    />
  );
}
