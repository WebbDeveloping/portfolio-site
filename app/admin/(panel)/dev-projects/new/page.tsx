import DevProjectForm from "@/components/admin/DevProjectForm";
import { createDevProject } from "@/lib/admin/actions";

export default function NewDevProjectPage() {
  return (
    <>
      <h1>New dev project</h1>
      <DevProjectForm action={createDevProject} />
    </>
  );
}
