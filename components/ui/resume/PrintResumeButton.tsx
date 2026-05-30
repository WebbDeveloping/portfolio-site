"use client";

import type { ReactNode } from "react";

type PrintResumeButtonProps = {
  className?: string;
  children?: ReactNode;
};

export default function PrintResumeButton({
  className = "resume-actions__btn resume-actions__btn--secondary",
  children = "Print resume",
}: PrintResumeButtonProps) {
  return (
    <button type="button" className={className} onClick={() => window.print()}>
      {children}
    </button>
  );
}
