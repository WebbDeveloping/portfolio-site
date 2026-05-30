import CollectionList from "@/components/admin/CollectionList";
import { prisma } from "@/lib/db";

export default async function AdminVideosPage() {
  const videos = await prisma.video.findMany({ orderBy: { title: "asc" } });

  return (
    <CollectionList
      title="Videos"
      basePath="/admin/videos"
      newHref="/admin/videos/new"
      items={videos.map((v) => ({
        id: v.id,
        title: v.title,
        slug: v.slug,
        subtitle: v.mainFeature ? "Main feature" : v.featuredVideo ? "Featured" : undefined,
      }))}
    />
  );
}
