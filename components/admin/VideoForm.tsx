import ImageUploadField from "@/components/admin/ImageUploadField";
import type { Video } from "@/lib/cms/types";

type VideoFormProps = {
  action: (formData: FormData) => Promise<void>;
  video?: Video;
};

export default function VideoForm({ action, video }: VideoFormProps) {
  return (
    <form action={action} className="admin-form">
      <div className="admin-field">
        <label htmlFor="title">Title</label>
        <input id="title" name="title" defaultValue={video?.title ?? ""} required />
      </div>
      <div className="admin-field">
        <label htmlFor="slug">Slug</label>
        <input id="slug" name="slug" defaultValue={video?.slug ?? ""} required />
      </div>
      <ImageUploadField
        name="featuredImage"
        label="Featured image"
        defaultValue={video?.featuredImage ?? ""}
        prefix="videos"
      />
      <div className="admin-field">
        <label htmlFor="youtubeUrl">YouTube URL</label>
        <input id="youtubeUrl" name="youtubeUrl" defaultValue={video?.youtubeUrl ?? ""} />
      </div>
      <div className="admin-field">
        <label htmlFor="publishedOn">Published on</label>
        <input id="publishedOn" name="publishedOn" defaultValue={video?.publishedOn ?? ""} />
      </div>
      <label className="admin-checkbox">
        <input name="featuredVideo" type="checkbox" defaultChecked={video?.featuredVideo ?? false} />
        Featured video
      </label>
      <label className="admin-checkbox">
        <input name="mainFeature" type="checkbox" defaultChecked={video?.mainFeature ?? false} />
        Main feature (only one)
      </label>
      <div className="admin-actions-row">
        <button type="submit" className="admin-btn">
          Save
        </button>
      </div>
    </form>
  );
}
