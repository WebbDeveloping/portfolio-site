"use client";

import { useActionState } from "react";
import { AdminFieldError, AdminFormAlerts } from "@/components/admin/AdminFormAlerts";
import ImageUploadField from "@/components/admin/ImageUploadField";
import type { Project } from "@/lib/cms/types";
import {
  type AdminFormAction,
  formBoolean,
  formString,
  initialAdminFormState,
} from "@/lib/admin/action-state";

type ProjectFormProps = {
  action: AdminFormAction;
  project?: Project;
};

function linesFromArray(value?: string[]): string {
  return value?.join("\n") ?? "";
}

export default function ProjectForm({ action, project }: ProjectFormProps) {
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
        <AdminFieldError state={state} name="slug" />
      </div>
      <div className="admin-field">
        <label htmlFor="client">Client</label>
        <input
          id="client"
          name="client"
          defaultValue={formString(state, "client", project?.client ?? "")}
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

      <p className="admin-section-title">Images</p>
      <ImageUploadField
        name="mainImage"
        label="Main image"
        defaultValue={formString(state, "mainImage", project?.mainImage ?? "")}
        prefix="projects"
      />
      <ImageUploadField
        name="largeDesktopImg"
        label="Large desktop"
        defaultValue={formString(state, "largeDesktopImg", project?.largeDesktopImg ?? "")}
        prefix="projects"
      />
      <ImageUploadField
        name="standardDesktopImg"
        label="Standard desktop"
        defaultValue={formString(state, "standardDesktopImg", project?.standardDesktopImg ?? "")}
        prefix="projects"
      />
      <ImageUploadField
        name="tabletImg"
        label="Tablet"
        defaultValue={formString(state, "tabletImg", project?.tabletImg ?? "")}
        prefix="projects"
      />
      <ImageUploadField
        name="mobileImg"
        label="Mobile"
        defaultValue={formString(state, "mobileImg", project?.mobileImg ?? "")}
        prefix="projects"
      />
      <ImageUploadField
        name="clientLogo"
        label="Client logo"
        defaultValue={formString(state, "clientLogo", project?.clientLogo ?? "")}
        prefix="projects"
      />
      <ImageUploadField
        name="platformLogo"
        label="Platform logo"
        defaultValue={formString(state, "platformLogo", project?.platformLogo ?? "")}
        prefix="projects"
      />
      <div className="admin-field">
        <label htmlFor="additionalPhotos">Additional photos (one URL per line)</label>
        <textarea
          id="additionalPhotos"
          name="additionalPhotos"
          defaultValue={formString(
            state,
            "additionalPhotos",
            linesFromArray(project?.additionalPhotos),
          )}
          rows={5}
        />
      </div>

      <p className="admin-section-title">Content</p>
      <div className="admin-field">
        <label htmlFor="servicesRendered">Services rendered (HTML)</label>
        <textarea
          id="servicesRendered"
          name="servicesRendered"
          defaultValue={formString(state, "servicesRendered", project?.servicesRendered ?? "")}
        />
      </div>
      <div className="admin-field">
        <label htmlFor="projectOverview">Project overview</label>
        <textarea
          id="projectOverview"
          name="projectOverview"
          defaultValue={formString(state, "projectOverview", project?.projectOverview ?? "")}
        />
      </div>
      <div className="admin-field">
        <label htmlFor="projectContribution">Your contribution</label>
        <textarea
          id="projectContribution"
          name="projectContribution"
          defaultValue={formString(state, "projectContribution", project?.projectContribution ?? "")}
        />
      </div>
      <div className="admin-field">
        <label htmlFor="clientFeedback">Client feedback</label>
        <textarea
          id="clientFeedback"
          name="clientFeedback"
          defaultValue={formString(state, "clientFeedback", project?.clientFeedback ?? "")}
        />
      </div>
      <div className="admin-field">
        <label htmlFor="finalThought">Final thought</label>
        <textarea
          id="finalThought"
          name="finalThought"
          defaultValue={formString(state, "finalThought", project?.finalThought ?? "")}
        />
      </div>
      <div className="admin-field">
        <label htmlFor="services">Services tags (one per line)</label>
        <textarea
          id="services"
          name="services"
          defaultValue={formString(state, "services", linesFromArray(project?.services))}
        />
      </div>
      <div className="admin-field">
        <label htmlFor="liveLink">Live link</label>
        <input
          id="liveLink"
          name="liveLink"
          defaultValue={formString(state, "liveLink", project?.liveLink ?? "")}
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
