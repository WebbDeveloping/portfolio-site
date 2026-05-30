"use client";

import { useLayoutEffect } from "react";

type WebflowPageShellProps = {
  wfPageId: string;
  bodyClass?: string;
  children: React.ReactNode;
};

declare global {
  interface Window {
    Webflow?: {
      destroy: (options?: { domready?: boolean }) => void;
      ready: () => void;
    };
  }
}

export default function WebflowPageShell({
  wfPageId,
  bodyClass = "body",
  children,
}: WebflowPageShellProps) {
  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-wf-page", wfPageId);

    const previousBodyClass = document.body.className;
    document.body.className = bodyClass;

    if (window.Webflow) {
      window.Webflow.destroy();
      window.Webflow.ready();
    }

    return () => {
      document.body.className = previousBodyClass;
    };
  }, [wfPageId, bodyClass]);

  return children;
}
