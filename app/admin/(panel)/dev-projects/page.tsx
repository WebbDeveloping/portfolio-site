import CollectionList from "@/components/admin/CollectionList";
import { prisma } from "@/lib/db";

export default async function AdminDevProjectsPage() {
  const projects = await prisma.devProject.findMany({ orderBy: { name: "asc" } });

  return (
    <CollectionList
      title="Dev projects"
      basePath="/admin/dev-projects"
      newHref="/admin/dev-projects/new"
      items={projects.map((p) => ({
        id: p.id,
        title: p.name,
        slug: p.slug,
        subtitle: p.featured ? "Featured" : undefined,
      }))}
    />
  );
}
