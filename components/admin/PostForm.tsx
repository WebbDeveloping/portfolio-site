import ImageUploadField from "@/components/admin/ImageUploadField";
import type { Post } from "@/lib/cms/types";

type PostFormProps = {
  action: (formData: FormData) => Promise<void>;
  post?: Post;
};

export default function PostForm({ action, post }: PostFormProps) {
  return (
    <form action={action} className="admin-form">
      <div className="admin-field">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" defaultValue={post?.name ?? ""} required />
      </div>
      <div className="admin-field">
        <label htmlFor="slug">Slug</label>
        <input id="slug" name="slug" defaultValue={post?.slug ?? ""} required />
      </div>
      <div className="admin-field">
        <label htmlFor="postSummary">Summary</label>
        <textarea id="postSummary" name="postSummary" defaultValue={post?.postSummary ?? ""} />
      </div>
      <div className="admin-field">
        <label htmlFor="postBody">Body (HTML)</label>
        <textarea id="postBody" name="postBody" defaultValue={post?.postBody ?? ""} rows={12} />
      </div>
      <ImageUploadField name="mainImage" label="Main image" defaultValue={post?.mainImage ?? ""} prefix="posts" />
      <ImageUploadField
        name="thumbnailImage"
        label="Thumbnail"
        defaultValue={post?.thumbnailImage ?? ""}
        prefix="posts"
      />
      <label className="admin-checkbox">
        <input name="featured" type="checkbox" defaultChecked={post?.featured ?? false} />
        Featured
      </label>
      <div className="admin-actions-row">
        <button type="submit" className="admin-btn">
          Save
        </button>
      </div>
    </form>
  );
}
