import DeleteButton from "@/components/admin/DeleteButton";
import PostForm from "@/components/admin/PostForm";
import { deletePost, updatePost } from "@/lib/admin/actions";
import { toPost } from "@/lib/cms/mappers";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditPostPage({ params }: PageProps) {
  const { id } = await params;
  const record = await prisma.post.findUnique({ where: { id } });
  if (!record) notFound();

  const post = toPost(record);

  return (
    <>
      <h1>Edit: {post.name}</h1>
      <PostForm action={updatePost.bind(null, id)} post={post} />
      <div className="admin-actions-row" style={{ marginTop: "2rem" }}>
        <DeleteButton action={deletePost.bind(null, id)} />
      </div>
    </>
  );
}
