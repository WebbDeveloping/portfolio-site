import ImageUploadField from "@/components/admin/ImageUploadField";
import type { Project } from "@/lib/cms/types";

type ProjectFormProps = {
  action: (formData: FormData) => Promise<void>;
  project?: Project;
};

function linesFromArray(value?: string[]): string {
  return value?.join("\n") ?? "";
}

export default function ProjectForm({ action, project }: ProjectFormProps) {
  return (
    <form action={action} className="admin-form">
      <div className="admin-field">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" defaultValue={project?.name ?? ""} required />
      </div>
      <div className="admin-field">
        <label htmlFor="slug">Slug</label>
        <input id="slug" name="slug" defaultValue={project?.slug ?? ""} required />
      </div>
      <div className="admin-field">
        <label htmlFor="client">Client</label>
        <input id="client" name="client" defaultValue={project?.client ?? ""} />
      </div>
      <label className="admin-checkbox">
        <input name="featured" type="checkbox" defaultChecked={project?.featured ?? false} />
        Featured
      </label>

      <p className="admin-section-title">Images</p>
      <ImageUploadField name="mainImage" label="Main image" defaultValue={project?.mainImage ?? ""} prefix="projects" />
      <ImageUploadField
        name="largeDesktopImg"
        label="Large desktop"
        defaultValue={project?.largeDesktopImg ?? ""}
        prefix="projects"
      />
      <ImageUploadField
        name="standardDesktopImg"
        label="Standard desktop"
        defaultValue={project?.standardDesktopImg ?? ""}
        prefix="projects"
      />
      <ImageUploadField name="tabletImg" label="Tablet" defaultValue={project?.tabletImg ?? ""} prefix="projects" />
      <ImageUploadField name="mobileImg" label="Mobile" defaultValue={project?.mobileImg ?? ""} prefix="projects" />
      <ImageUploadField
        name="clientLogo"
        label="Client logo"
        defaultValue={project?.clientLogo ?? ""}
        prefix="projects"
      />
      <ImageUploadField
        name="platformLogo"
        label="Platform logo"
        defaultValue={project?.platformLogo ?? ""}
        prefix="projects"
      />
      <div className="admin-field">
        <label htmlFor="additionalPhotos">Additional photos (one URL per line)</label>
        <textarea
          id="additionalPhotos"
          name="additionalPhotos"
          defaultValue={linesFromArray(project?.additionalPhotos)}
          rows={5}
        />
      </div>

      <p className="admin-section-title">Content</p>
      <div className="admin-field">
        <label htmlFor="servicesRendered">Services rendered (HTML)</label>
        <textarea
          id="servicesRendered"
          name="servicesRendered"
          defaultValue={project?.servicesRendered ?? ""}
        />
      </div>
      <div className="admin-field">
        <label htmlFor="projectOverview">Project overview</label>
        <textarea
          id="projectOverview"
          name="projectOverview"
          defaultValue={project?.projectOverview ?? ""}
        />
      </div>
      <div className="admin-field">
        <label htmlFor="projectContribution">Your contribution</label>
        <textarea
          id="projectContribution"
          name="projectContribution"
          defaultValue={project?.projectContribution ?? ""}
        />
      </div>
      <div className="admin-field">
        <label htmlFor="clientFeedback">Client feedback</label>
        <textarea id="clientFeedback" name="clientFeedback" defaultValue={project?.clientFeedback ?? ""} />
      </div>
      <div className="admin-field">
        <label htmlFor="finalThought">Final thought</label>
        <textarea id="finalThought" name="finalThought" defaultValue={project?.finalThought ?? ""} />
      </div>
      <div className="admin-field">
        <label htmlFor="services">Services tags (one per line)</label>
        <textarea id="services" name="services" defaultValue={linesFromArray(project?.services)} />
      </div>
      <div className="admin-field">
        <label htmlFor="liveLink">Live link</label>
        <input id="liveLink" name="liveLink" defaultValue={project?.liveLink ?? ""} />
      </div>

      <div className="admin-actions-row">
        <button type="submit" className="admin-btn">
          Save
        </button>
      </div>
    </form>
  );
}
