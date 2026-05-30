import DeleteButton from "@/components/admin/DeleteButton";
import ProjectForm from "@/components/admin/ProjectForm";
import { deleteProject, updateProject } from "@/lib/admin/actions";
import { toProject } from "@/lib/cms/mappers";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditProjectPage({ params }: PageProps) {
  const { id } = await params;
  const record = await prisma.project.findUnique({ where: { id } });
  if (!record) notFound();

  const project = toProject(record);

  return (
    <>
      <h1>Edit: {project.name}</h1>
      <ProjectForm action={updateProject.bind(null, id)} project={project} />
      <div className="admin-actions-row" style={{ marginTop: "2rem" }}>
        <DeleteButton action={deleteProject.bind(null, id)} />
      </div>
    </>
  );
}
