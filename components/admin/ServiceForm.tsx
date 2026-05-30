import type { Service } from "@/lib/cms/types";

type ServiceFormProps = {
  action: (formData: FormData) => Promise<void>;
  service?: Service;
};

function linesFromArray(value: string[]): string {
  return value.join("\n");
}

export default function ServiceForm({ action, service }: ServiceFormProps) {
  const projects = service?.projects ?? [];

  return (
    <form action={action} className="admin-form">
      <div className="admin-field">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" defaultValue={service?.name ?? ""} required />
      </div>
      <div className="admin-field">
        <label htmlFor="slug">Slug</label>
        <input id="slug" name="slug" defaultValue={service?.slug ?? ""} required />
      </div>
      <div className="admin-field">
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" defaultValue={service?.description ?? ""} />
      </div>
      <div className="admin-field">
        <label htmlFor="icon">Icon</label>
        <input id="icon" name="icon" defaultValue={service?.icon ?? ""} />
      </div>
      <div className="admin-field">
        <label htmlFor="color">Color</label>
        <input id="color" name="color" defaultValue={service?.color ?? ""} />
      </div>
      <div className="admin-field">
        <label htmlFor="projects">Project slugs (one per line)</label>
        <textarea
          id="projects"
          name="projects"
          defaultValue={linesFromArray(projects)}
        />
      </div>
      <div className="admin-actions-row">
        <button type="submit" className="admin-btn">
          Save
        </button>
      </div>
    </form>
  );
}
