import Reveal from "@/components/motion/Reveal";
import type { ReactNode } from "react";
import { cn } from "@/lib/webflow/styles";

type PageHeroProps = {
  title: string;
  /** Optional content below the title (scroll links, meta, rich text). */
  subtitle?: ReactNode;
  className?: string;
  titleClassName?: string;
  padding?: "medium" | "small";
};

export default function PageHero({
  title,
  subtitle,
  className,
  titleClassName,
  padding = "medium",
}: PageHeroProps) {
  const paddingClass = padding === "small" ? "small-padding" : "medium-padding";

  return (
    <div className={cn("section top-section", className)}>
      <div className="main-container">
        <div className="top-spacing">
          <div className={paddingClass}>
            <div className="page-description">
              <div className="page-title">
                <Reveal as="h1" immediate className={cn("large-titlee", titleClassName)}>
                  {title}
                </Reveal>
              </div>
              {subtitle ? <div className="page-sub-title">{subtitle}</div> : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
