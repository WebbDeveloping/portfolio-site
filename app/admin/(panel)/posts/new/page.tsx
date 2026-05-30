import PostForm from "@/components/admin/PostForm";
import { createPost } from "@/lib/admin/actions";

export default function NewPostPage() {
  return (
    <>
      <h1>New post</h1>
      <PostForm action={createPost} />
    </>
  );
}
