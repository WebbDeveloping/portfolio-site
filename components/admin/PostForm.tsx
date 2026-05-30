"use client";

import { useActionState } from "react";
import { AdminFieldError, AdminFormAlerts } from "@/components/admin/AdminFormAlerts";
import ImageUploadField from "@/components/admin/ImageUploadField";
import type { Post } from "@/lib/cms/types";
import {
  type AdminFormAction,
  formBoolean,
  formString,
  initialAdminFormState,
} from "@/lib/admin/action-state";

type PostFormProps = {
  action: AdminFormAction;
  post?: Post;
};

export default function PostForm({ action, post }: PostFormProps) {
  const [state, formAction, pending] = useActionState(action, initialAdminFormState);

  return (
    <form
      key={state.formKey ?? "initial"}
      action={formAction}
      className="admin-form"
    >
      <AdminFormAlerts state={state} />

      <div className="admin-field">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          defaultValue={formString(state, "name", post?.name ?? "")}
          required
        />
        <AdminFieldError state={state} name="name" />
      </div>
      <div className="admin-field">
        <label htmlFor="slug">Slug</label>
        <input
          id="slug"
          name="slug"
          defaultValue={formString(state, "slug", post?.slug ?? "")}
          required
        />
        <AdminFieldError state={state} name="slug" />
      </div>
      <div className="admin-field">
        <label htmlFor="postSummary">Summary</label>
        <textarea
          id="postSummary"
          name="postSummary"
          defaultValue={formString(state, "postSummary", post?.postSummary ?? "")}
        />
      </div>
      <div className="admin-field">
        <label htmlFor="postBody">Body (HTML)</label>
        <textarea
          id="postBody"
          name="postBody"
          defaultValue={formString(state, "postBody", post?.postBody ?? "")}
          rows={12}
        />
      </div>
      <ImageUploadField
        name="mainImage"
        label="Main image"
        defaultValue={formString(state, "mainImage", post?.mainImage ?? "")}
        prefix="posts"
      />
      <ImageUploadField
        name="thumbnailImage"
        label="Thumbnail"
        defaultValue={formString(state, "thumbnailImage", post?.thumbnailImage ?? "")}
        prefix="posts"
      />
      <label className="admin-checkbox">
        <input
          name="featured"
          type="checkbox"
          defaultChecked={formBoolean(state, "featured", post?.featured ?? false)}
        />
        Featured
      </label>
      <div className="admin-actions-row">
        <button type="submit" className="admin-btn" disabled={pending}>
          {pending ? "Saving…" : "Save"}
        </button>
      </div>
    </form>
  );
}
