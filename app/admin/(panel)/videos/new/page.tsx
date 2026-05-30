import VideoForm from "@/components/admin/VideoForm";
import { createVideo } from "@/lib/admin/actions";

export default function NewVideoPage() {
  return (
    <>
      <h1>New video</h1>
      <VideoForm action={createVideo} />
    </>
  );
}
