"use client";

import { useActionState } from "react";
import { AdminFieldError, AdminFormAlerts } from "@/components/admin/AdminFormAlerts";
import ImageUploadField from "@/components/admin/ImageUploadField";
import type { DevProject } from "@/lib/cms/types";
import {
  type AdminFormAction,
  formBoolean,
  formString,
  initialAdminFormState,
} from "@/lib/admin/action-state";

type DevProjectFormProps = {
  action: AdminFormAction;
  project?: DevProject;
};

function linesFromArray(value?: string[]): string {
  return value?.join("\n") ?? "";
}

export default function DevProjectForm({ action, project }: DevProjectFormProps) {
  const [state, formAction, pending] = useActionState(action, initialAdminFormState);

  const stack = formString(state, "stack", linesFromArray(project?.stack));
  const features = formString(state, "features", linesFromArray(project?.features));

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
          defaultValue={formString(state, "name", project?.name ?? "")}
          required
        />
        <AdminFieldError state={state} name="name" />
      </div>
      <div className="admin-field">
        <label htmlFor="slug">Slug</label>
        <input
          id="slug"
          name="slug"
          defaultValue={formString(state, "slug", project?.slug ?? "")}
          required
        />
        <p className="admin-field-hint">Lowercase with hyphens, e.g. my-api-project</p>
        <AdminFieldError state={state} name="slug" />
      </div>
      <div className="admin-field">
        <label htmlFor="tagline">Tagline</label>
        <input
          id="tagline"
          name="tagline"
          defaultValue={formString(state, "tagline", project?.tagline ?? "")}
        />
      </div>
      <div className="admin-field">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          defaultValue={formString(state, "description", project?.description ?? "")}
        />
      </div>
      <div className="admin-field">
        <label htmlFor="stack">Stack (one per line)</label>
        <textarea id="stack" name="stack" defaultValue={stack} />
      </div>
      <div className="admin-field">
        <label htmlFor="features">Features (one per line)</label>
        <textarea id="features" name="features" defaultValue={features} />
      </div>
      <div className="admin-field">
        <label htmlFor="githubUrl">GitHub URL</label>
        <input
          id="githubUrl"
          name="githubUrl"
          defaultValue={formString(state, "githubUrl", project?.githubUrl ?? "")}
        />
      </div>
      <div className="admin-field">
        <label htmlFor="liveUrl">Live URL</label>
        <input
          id="liveUrl"
          name="liveUrl"
          defaultValue={formString(state, "liveUrl", project?.liveUrl ?? "")}
        />
      </div>
      <ImageUploadField
        name="heroImage"
        label="Hero image"
        defaultValue={formString(state, "heroImage", project?.heroImage ?? "")}
        prefix="dev-projects"
      />
      <div className="admin-field">
        <label htmlFor="accentColor">Accent color</label>
        <input
          id="accentColor"
          name="accentColor"
          defaultValue={formString(state, "accentColor", project?.accentColor ?? "")}
        />
      </div>
      <div className="admin-field">
        <label htmlFor="year">Year</label>
        <input
          id="year"
          name="year"
          defaultValue={formString(state, "year", project?.year ?? "")}
        />
      </div>
      <div className="admin-field">
        <label htmlFor="problem">Problem</label>
        <textarea
          id="problem"
          name="problem"
          defaultValue={formString(state, "problem", project?.problem ?? "")}
        />
      </div>
      <div className="admin-field">
        <label htmlFor="solution">Solution</label>
        <textarea
          id="solution"
          name="solution"
          defaultValue={formString(state, "solution", project?.solution ?? "")}
        />
      </div>
      <label className="admin-checkbox">
        <input
          name="featured"
          type="checkbox"
          defaultChecked={formBoolean(state, "featured", project?.featured ?? false)}
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
