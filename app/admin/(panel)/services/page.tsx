import CollectionList from "@/components/admin/CollectionList";
import { prisma } from "@/lib/db";

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({ orderBy: { name: "asc" } });

  return (
    <CollectionList
      title="Services"
      basePath="/admin/services"
      newHref="/admin/services/new"
      items={services.map((s) => ({
        id: s.id,
        title: s.name,
        slug: s.slug,
      }))}
    />
  );
}
