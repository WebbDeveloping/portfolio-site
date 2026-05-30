import Link from "next/link";

export type CollectionItem = {
  id: string;
  title: string;
  slug: string;
  subtitle?: string;
};

type CollectionListProps = {
  title: string;
  items: CollectionItem[];
  basePath: string;
  newHref: string;
};

export default function CollectionList({ title, items, basePath, newHref }: CollectionListProps) {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ margin: 0 }}>{title}</h1>
        <Link href={newHref} className="admin-btn">
          New
        </Link>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Slug</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan={3} style={{ color: "var(--admin-muted)" }}>
                No items yet.
              </td>
            </tr>
          ) : (
            items.map((item) => (
              <tr key={item.id}>
                <td>
                  {item.title}
                  {item.subtitle ? (
                    <span style={{ display: "block", fontSize: "0.75rem", color: "var(--admin-muted)" }}>
                      {item.subtitle}
                    </span>
                  ) : null}
                </td>
                <td>{item.slug}</td>
                <td>
                  <Link href={`${basePath}/${item.id}`}>Edit</Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <p style={{ marginTop: "1.5rem" }}>
        <Link href="/admin" style={{ color: "var(--admin-muted)" }}>
          Back to dashboard
        </Link>
      </p>
    </>
  );
}
