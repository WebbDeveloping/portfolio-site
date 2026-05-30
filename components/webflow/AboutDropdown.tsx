"use client";

import { useEffect, useId, useRef, useState } from "react";
import { WebflowLink } from "@/components/webflow/WebflowLink";
import { postPath } from "@/lib/cms/paths";
import { navLinkProps } from "@/lib/navigation";

type AboutDropdownProps = {
  variant: "desktop" | "mobile";
  isAbout: boolean;
  isProjects: boolean;
  isDevProjects: boolean;
};

type DropdownLink = {
  href: string;
  label: string;
  current: boolean;
};

function getLinks(
  isAbout: boolean,
  isProjects: boolean,
  isDevProjects: boolean,
  includeExtra: boolean,
): DropdownLink[] {
  const links: DropdownLink[] = [
    { href: "about.html", label: "About Me", current: isAbout },
    { href: "projects.html", label: "Client Projects", current: isProjects },
    { href: "dev-projects.html", label: "Dev Projects", current: isDevProjects },
  ];

  if (includeExtra) {
    links.push({
      href: postPath("how-i-built-my-portfolio-website"),
      label: "More Stories",
      current: false,
    });
  }

  return links;
}

export default function AboutDropdown({
  variant,
  isAbout,
  isProjects,
  isDevProjects,
}: AboutDropdownProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const isDesktop = variant === "desktop";
  const isActive = isAbout || isProjects || isDevProjects;
  const links = getLinks(isAbout, isProjects, isDevProjects, !isDesktop);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className={[
        "about-nav-dropdown",
        isDesktop ? "about-nav-dropdown--desktop" : "about-nav-dropdown--mobile",
        open ? "is-open" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      onMouseEnter={isDesktop ? () => setOpen(true) : undefined}
      onMouseLeave={isDesktop ? () => setOpen(false) : undefined}
    >
      <button
        type="button"
        className={[
          "about-nav-dropdown__toggle",
          isDesktop
            ? "about-nav-dropdown__toggle--desktop"
            : "about-nav-dropdown__toggle--mobile",
          isActive ? "is-active" : "",
        ].join(" ")}
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="true"
        onClick={() => setOpen((value) => !value)}
      >
        <span>About</span>
        <svg
          className="about-nav-dropdown__chevron"
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M1 1L5 5L9 1"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div
        id={panelId}
        className={[
          "about-nav-dropdown__panel",
          isDesktop ? "about-nav-dropdown__panel--desktop" : "about-nav-dropdown__panel--mobile",
        ].join(" ")}
        role="menu"
        hidden={isDesktop ? !open : undefined}
        aria-hidden={!open}
      >
        {links.map((link) => (
          <WebflowLink
            key={link.href}
            href={link.href}
            role="menuitem"
            {...navLinkProps("about-nav-dropdown__link", link.current)}
            onClick={() => setOpen(false)}
          >
            {link.label}
          </WebflowLink>
        ))}
      </div>
    </div>
  );
}
