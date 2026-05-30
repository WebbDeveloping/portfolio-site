import DeleteButton from "@/components/admin/DeleteButton";
import VideoForm from "@/components/admin/VideoForm";
import { deleteVideo, updateVideo } from "@/lib/admin/actions";
import { toVideo } from "@/lib/cms/mappers";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditVideoPage({ params }: PageProps) {
  const { id } = await params;
  const record = await prisma.video.findUnique({ where: { id } });
  if (!record) notFound();

  const video = toVideo(record);

  return (
    <>
      <h1>Edit: {video.title}</h1>
      <VideoForm action={updateVideo.bind(null, id)} video={video} />
      <div className="admin-actions-row" style={{ marginTop: "2rem" }}>
        <DeleteButton action={deleteVideo.bind(null, id)} />
      </div>
    </>
  );
}
