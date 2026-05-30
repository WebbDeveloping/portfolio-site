import DeleteButton from "@/components/admin/DeleteButton";
import ServiceForm from "@/components/admin/ServiceForm";
import { deleteService, updateService } from "@/lib/admin/actions";
import { toService } from "@/lib/cms/mappers";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditServicePage({ params }: PageProps) {
  const { id } = await params;
  const record = await prisma.service.findUnique({ where: { id } });
  if (!record) notFound();

  const service = toService(record);

  return (
    <>
      <h1>Edit: {service.name}</h1>
      <ServiceForm action={updateService.bind(null, id)} service={service} />
      <div className="admin-actions-row" style={{ marginTop: "2rem" }}>
        <DeleteButton action={deleteService.bind(null, id)} />
      </div>
    </>
  );
}
