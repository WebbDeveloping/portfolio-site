import DeleteButton from "@/components/admin/DeleteButton";
import DevProjectForm from "@/components/admin/DevProjectForm";
import { deleteDevProject, updateDevProject } from "@/lib/admin/actions";
import { toDevProject } from "@/lib/cms/mappers";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditDevProjectPage({ params }: PageProps) {
  const { id } = await params;
  const record = await prisma.devProject.findUnique({ where: { id } });
  if (!record) notFound();

  const project = toDevProject(record);
  const updateAction = updateDevProject.bind(null, id);
  const deleteAction = deleteDevProject.bind(null, id);

  return (
    <>
      <h1>Edit: {project.name}</h1>
      <DevProjectForm action={updateAction} project={project} />
      <div className="admin-actions-row" style={{ marginTop: "2rem" }}>
        <DeleteButton action={deleteAction} />
      </div>
    </>
  );
}
