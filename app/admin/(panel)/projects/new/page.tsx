import ProjectForm from "@/components/admin/ProjectForm";
import { createProject } from "@/lib/admin/actions";

export default function NewProjectPage() {
  return (
    <>
      <h1>New project</h1>
      <ProjectForm action={createProject} />
    </>
  );
}
