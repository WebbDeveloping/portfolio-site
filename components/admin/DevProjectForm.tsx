import ImageUploadField from "@/components/admin/ImageUploadField";
import type { DevProject } from "@/lib/cms/types";

type DevProjectFormProps = {
  action: (formData: FormData) => Promise<void>;
  project?: DevProject;
};

function linesFromArray(value?: string[]): string {
  return value?.join("\n") ?? "";
}

export default function DevProjectForm({ action, project }: DevProjectFormProps) {
  const stack = linesFromArray(project?.stack);
  const features = linesFromArray(project?.features);

  return (
    <form action={action} className="admin-form">
      <div className="admin-field">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" defaultValue={project?.name ?? ""} required />
      </div>
      <div className="admin-field">
        <label htmlFor="slug">Slug</label>
        <input id="slug" name="slug" defaultValue={project?.slug ?? ""} required />
        <p className="admin-field-hint">Lowercase with hyphens, e.g. my-api-project</p>
      </div>
      <div className="admin-field">
        <label htmlFor="tagline">Tagline</label>
        <input id="tagline" name="tagline" defaultValue={project?.tagline ?? ""} />
      </div>
      <div className="admin-field">
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" defaultValue={project?.description ?? ""} />
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
        <input id="githubUrl" name="githubUrl" defaultValue={project?.githubUrl ?? ""} />
      </div>
      <div className="admin-field">
        <label htmlFor="liveUrl">Live URL</label>
        <input id="liveUrl" name="liveUrl" defaultValue={project?.liveUrl ?? ""} />
      </div>
      <ImageUploadField
        name="heroImage"
        label="Hero image"
        defaultValue={project?.heroImage ?? ""}
        prefix="dev-projects"
      />
      <div className="admin-field">
        <label htmlFor="accentColor">Accent color</label>
        <input id="accentColor" name="accentColor" defaultValue={project?.accentColor ?? ""} />
      </div>
      <div className="admin-field">
        <label htmlFor="year">Year</label>
        <input id="year" name="year" defaultValue={project?.year ?? ""} />
      </div>
      <div className="admin-field">
        <label htmlFor="problem">Problem</label>
        <textarea id="problem" name="problem" defaultValue={project?.problem ?? ""} />
      </div>
      <div className="admin-field">
        <label htmlFor="solution">Solution</label>
        <textarea id="solution" name="solution" defaultValue={project?.solution ?? ""} />
      </div>
      <label className="admin-checkbox">
        <input name="featured" type="checkbox" defaultChecked={project?.featured ?? false} />
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
