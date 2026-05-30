import SideCaptions from "@/components/webflow/SideCaptions";
import SiteFooter from "@/components/webflow/SiteFooter";
import SiteNav from "@/components/webflow/SiteNav";
import type { SitePageId } from "@/lib/navigation";
import type { ReactNode } from "react";

type PageShellProps = {
  currentPage: SitePageId;
  children: ReactNode;
};

export default function PageShell({ currentPage, children }: PageShellProps) {
  return (
    <>
      <SiteNav currentPage={currentPage} />
      <SideCaptions />
      {children}
    </>
  );
}

type PageShellWithFooterProps = PageShellProps & {
  showFooter?: boolean;
};

export function PageShellWithFooter({
  currentPage,
  showFooter = true,
  children,
}: PageShellWithFooterProps) {
  return (
    <PageShell currentPage={currentPage}>
      {children}
      {showFooter ? <SiteFooter currentPage={currentPage} /> : null}
    </PageShell>
  );
}
