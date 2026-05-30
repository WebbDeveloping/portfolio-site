import PageShell from "@/components/ui/PageShell";
import SiteFooter from "@/components/webflow/SiteFooter";

export default function NotFoundPage() {
  return (
    <PageShell currentPage={null}>
      <div className="utility-page-wrap">
        <div className="utility-page-content w-form">
          <img
            src="/images/joe-webb-logo-grey.png"
            alt=""
            width={120}
            style={{ opacity: 0.5, marginBottom: 24 }}
          />
          <h2 className="protect-heading">Page Not Found</h2>
          <div>The page you are looking for doesn&apos;t exist or has been moved</div>
        </div>
      </div>
      <SiteFooter currentPage={null} />
    </PageShell>
  );
}
