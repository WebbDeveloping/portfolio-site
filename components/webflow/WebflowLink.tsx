import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { isInternalWebflowLink, webflowRoute } from "@/lib/webflow/routes";

type WebflowLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children?: ReactNode;
};

export function WebflowLink({ href, children, ...props }: WebflowLinkProps) {
  if (isInternalWebflowLink(href)) {
    return (
      <Link href={webflowRoute(href)} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
}
