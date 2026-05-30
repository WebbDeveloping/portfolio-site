import AdminHeader from "@/components/admin/AdminHeader";

export const dynamic = "force-dynamic";

export default function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdminHeader />
      <main className="admin-main">{children}</main>
    </>
  );
}
