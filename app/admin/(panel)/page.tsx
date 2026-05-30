import Link from "next/link";

const collections = [
  { href: "/admin/projects", label: "Portfolio projects", description: "Client work case studies" },
  { href: "/admin/dev-projects", label: "Dev projects", description: "Software & API projects" },
  { href: "/admin/posts", label: "Posts", description: "Blog / article content" },
  { href: "/admin/videos", label: "Videos", description: "YouTube video entries" },
  { href: "/admin/services", label: "Services", description: "Service offerings" },
];

export default function AdminDashboardPage() {
  return (
    <>
      <h1>CMS Dashboard</h1>
      <p style={{ color: "var(--admin-muted)" }}>
        Manage portfolio content. Changes appear on the live site after save.
      </p>
      <div className="admin-card-grid" style={{ marginTop: "1.5rem" }}>
        {collections.map((item) => (
          <Link key={item.href} href={item.href} className="admin-card">
            <strong>{item.label}</strong>
            <p style={{ margin: "0.5rem 0 0", fontSize: "0.875rem", color: "var(--admin-muted)" }}>
              {item.description}
            </p>
          </Link>
        ))}
      </div>
    </>
  );
}
