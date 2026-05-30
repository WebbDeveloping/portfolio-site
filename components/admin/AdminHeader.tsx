import Link from "next/link";
import { signOut } from "@/auth";

export default function AdminHeader() {
  return (
    <header className="admin-header">
      <Link href="/admin">Portfolio CMS</Link>
      <nav style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <Link href="/" style={{ fontSize: "0.875rem", color: "var(--admin-muted)" }}>
          View site
        </Link>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/admin/login" });
          }}
        >
          <button type="submit" className="admin-btn admin-btn-secondary">
            Sign out
          </button>
        </form>
      </nav>
    </header>
  );
}
