import SideCaptions from "@/components/webflow/SideCaptions";
import SiteFooter from "@/components/webflow/SiteFooter";
import SiteNav from "@/components/webflow/SiteNav";
import type { SitePageId } from "@/lib/navigation";
import type { ReactNode } from "react";

type PageShellProps = {
  currentPage: SitePageId;
  /** Minimal shell for standalone pages like /links (no nav, captions, or footer). */
  variant?: "default" | "minimal";
  children: ReactNode;
};

export default function PageShell({
  currentPage,
  variant = "default",
  children,
}: PageShellProps) {
  if (variant === "minimal") {
    return <>{children}</>;
  }

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
  variant = "default",
  showFooter = true,
  children,
}: PageShellWithFooterProps) {
  return (
    <PageShell currentPage={currentPage} variant={variant}>
      {children}
      {showFooter && variant === "default" ? (
        <SiteFooter currentPage={currentPage} />
      ) : null}
    </PageShell>
  );
}
