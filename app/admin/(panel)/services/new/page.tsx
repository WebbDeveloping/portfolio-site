import ServiceForm from "@/components/admin/ServiceForm";
import { createService } from "@/lib/admin/actions";

export default function NewServicePage() {
  return (
    <>
      <h1>New service</h1>
      <ServiceForm action={createService} />
    </>
  );
}
