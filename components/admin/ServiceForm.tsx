"use client";

import { useActionState } from "react";
import { AdminFieldError, AdminFormAlerts } from "@/components/admin/AdminFormAlerts";
import type { Service } from "@/lib/cms/types";
import {
  type AdminFormAction,
  formString,
  initialAdminFormState,
} from "@/lib/admin/action-state";

type ServiceFormProps = {
  action: AdminFormAction;
  service?: Service;
};

function linesFromArray(value: string[]): string {
  return value.join("\n");
}

export default function ServiceForm({ action, service }: ServiceFormProps) {
  const [state, formAction, pending] = useActionState(action, initialAdminFormState);
  const projects = service?.projects ?? [];

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
          defaultValue={formString(state, "name", service?.name ?? "")}
          required
        />
        <AdminFieldError state={state} name="name" />
      </div>
      <div className="admin-field">
        <label htmlFor="slug">Slug</label>
        <input
          id="slug"
          name="slug"
          defaultValue={formString(state, "slug", service?.slug ?? "")}
          required
        />
        <AdminFieldError state={state} name="slug" />
      </div>
      <div className="admin-field">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          defaultValue={formString(state, "description", service?.description ?? "")}
        />
      </div>
      <div className="admin-field">
        <label htmlFor="icon">Icon</label>
        <input
          id="icon"
          name="icon"
          defaultValue={formString(state, "icon", service?.icon ?? "")}
        />
      </div>
      <div className="admin-field">
        <label htmlFor="color">Color</label>
        <input
          id="color"
          name="color"
          defaultValue={formString(state, "color", service?.color ?? "")}
        />
      </div>
      <div className="admin-field">
        <label htmlFor="projects">Project slugs (one per line)</label>
        <textarea
          id="projects"
          name="projects"
          defaultValue={formString(state, "projects", linesFromArray(projects))}
        />
      </div>
      <div className="admin-actions-row">
        <button type="submit" className="admin-btn" disabled={pending}>
          {pending ? "Saving…" : "Save"}
        </button>
      </div>
    </form>
  );
}
