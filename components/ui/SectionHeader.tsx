import type { ReactNode } from "react";
import { cn } from "@/lib/webflow/styles";

type SectionHeaderProps = {
  /** Uppercase category label above the title. */
  eyebrow?: string;
  /** "caption" for small labels (14px); "section" for larger eyebrows (23px). */
  eyebrowVariant?: "caption" | "section";
  title: string;
  titleAs?: "h1" | "h2" | "h3";
  /** When true, eyebrow uses accent color. Default: true for section, always for caption */
  eyebrowAccent?: boolean;
  /** Use display size (large-titlee) instead of section size (style-title). */
  display?: boolean;
  className?: string;
  children?: ReactNode;
};

export default function SectionHeader({
  eyebrow,
  eyebrowVariant = "section",
  title,
  titleAs = "h2",
  eyebrowAccent = true,
  display = false,
  className,
  children,
}: SectionHeaderProps) {
  const TitleTag = titleAs;
  const titleClass = display ? "large-titlee" : "style-title";
  const eyebrowClass =
    eyebrowVariant === "caption"
      ? "small-sub-title"
      : cn("sub-title", eyebrowAccent && "red");

  return (
    <div className={className}>
      {eyebrow ? <div className={eyebrowClass}>{eyebrow}</div> : null}
      <TitleTag className={titleClass}>{title}</TitleTag>
      {children}
    </div>
  );
}
