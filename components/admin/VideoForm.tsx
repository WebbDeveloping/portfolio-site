"use client";

import { useActionState } from "react";
import { AdminFieldError, AdminFormAlerts } from "@/components/admin/AdminFormAlerts";
import ImageUploadField from "@/components/admin/ImageUploadField";
import type { Video } from "@/lib/cms/types";
import {
  type AdminFormAction,
  formBoolean,
  formString,
  initialAdminFormState,
} from "@/lib/admin/action-state";

type VideoFormProps = {
  action: AdminFormAction;
  video?: Video;
};

export default function VideoForm({ action, video }: VideoFormProps) {
  const [state, formAction, pending] = useActionState(action, initialAdminFormState);

  return (
    <form
      key={state.formKey ?? "initial"}
      action={formAction}
      className="admin-form"
    >
      <AdminFormAlerts state={state} />

      <div className="admin-field">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          defaultValue={formString(state, "title", video?.title ?? "")}
          required
        />
        <AdminFieldError state={state} name="title" />
      </div>
      <div className="admin-field">
        <label htmlFor="slug">Slug</label>
        <input
          id="slug"
          name="slug"
          defaultValue={formString(state, "slug", video?.slug ?? "")}
          required
        />
        <AdminFieldError state={state} name="slug" />
      </div>
      <ImageUploadField
        name="featuredImage"
        label="Featured image"
        defaultValue={formString(state, "featuredImage", video?.featuredImage ?? "")}
        prefix="videos"
      />
      <div className="admin-field">
        <label htmlFor="youtubeUrl">YouTube URL</label>
        <input
          id="youtubeUrl"
          name="youtubeUrl"
          defaultValue={formString(state, "youtubeUrl", video?.youtubeUrl ?? "")}
        />
      </div>
      <div className="admin-field">
        <label htmlFor="publishedOn">Published on</label>
        <input
          id="publishedOn"
          name="publishedOn"
          defaultValue={formString(state, "publishedOn", video?.publishedOn ?? "")}
        />
      </div>
      <label className="admin-checkbox">
        <input
          name="featuredVideo"
          type="checkbox"
          defaultChecked={formBoolean(state, "featuredVideo", video?.featuredVideo ?? false)}
        />
        Featured video
      </label>
      <label className="admin-checkbox">
        <input
          name="mainFeature"
          type="checkbox"
          defaultChecked={formBoolean(state, "mainFeature", video?.mainFeature ?? false)}
        />
        Main feature (only one)
      </label>
      <div className="admin-actions-row">
        <button type="submit" className="admin-btn" disabled={pending}>
          {pending ? "Saving…" : "Save"}
        </button>
      </div>
    </form>
  );
}
