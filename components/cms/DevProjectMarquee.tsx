"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { BrowserFrame } from "@/components/cms/DevProjectCard";
import { WebflowLink } from "@/components/webflow/WebflowLink";
import { devProjectPath } from "@/lib/cms/paths";
import type { DevProject } from "@/lib/cms/types";

const CARD_GAP_PX = 32;
const AUTO_SCROLL_RESUME_MS = 4000;

type DevProjectMarqueeProps = {
  projects: DevProject[];
};

function MarqueeCard({ project }: { project: DevProject }) {
  const accent = project.accentColor ?? "var(--tomato, #ea5342)";

  return (
    <WebflowLink
      href={devProjectPath(project.slug)}
      className="dev-project-marquee-card w-inline-block"
      aria-label={`View ${project.name}`}
    >
      <div className="dev-project-marquee-card__header">
        <div>
          {project.year ? <div className="dev-project-card__year">{project.year}</div> : null}
          <div className="dev-project-card__name">{project.name}</div>
        </div>
        <div className="inside-button-container hero">
          <div className="button-text red">View</div>
          <img src="/images/down-arrow.svg" loading="lazy" alt="" className="image cr-arrow" />
        </div>
      </div>

      <div className="dev-project-stack dev-project-marquee-card__stack">
        {project.stack.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="dev-project-stack__badge"
            style={project.accentColor ? { borderColor: `${project.accentColor}44` } : undefined}
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="dev-project-marquee-card__preview" style={{ borderColor: `${accent}33` }}>
        <BrowserFrame
          projectName={project.name}
          heroImage={project.heroImage}
          accentColor={project.accentColor}
        />
      </div>
    </WebflowLink>
  );
}

export function DevProjectMarquee({ projects }: DevProjectMarqueeProps) {
  const reduceMotion = useReducedMotion();
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const clearResumeTimer = useCallback(() => {
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
  }, []);

  const pauseAutoScroll = useCallback(
    (resumeAfterMs?: number) => {
      setIsPaused(true);
      clearResumeTimer();
      if (resumeAfterMs !== undefined && !reduceMotion) {
        resumeTimerRef.current = setTimeout(() => setIsPaused(false), resumeAfterMs);
      }
    },
    [clearResumeTimer, reduceMotion],
  );

  const getCardStep = useCallback(() => {
    const viewport = viewportRef.current;
    const card = viewport?.querySelector<HTMLElement>(".dev-project-marquee-card");
    return card ? card.offsetWidth + CARD_GAP_PX : 0;
  }, []);

  const normalizeScrollPosition = useCallback(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const half = track.scrollWidth / 2;
    if (half <= 0) return;

    if (viewport.scrollLeft >= half) {
      viewport.scrollLeft -= half;
    } else if (viewport.scrollLeft < 0) {
      viewport.scrollLeft += half;
    }
  }, []);

  const scrollByCard = useCallback(
    (direction: 1 | -1) => {
      const viewport = viewportRef.current;
      const track = trackRef.current;
      const step = getCardStep();
      if (!viewport || !track || step === 0) return;

      pauseAutoScroll(AUTO_SCROLL_RESUME_MS);

      const half = track.scrollWidth / 2;
      if (direction < 0 && viewport.scrollLeft < step && half > 0) {
        viewport.scrollLeft = half;
      }

      viewport.scrollBy({ left: direction * step, behavior: "smooth" });
      window.setTimeout(normalizeScrollPosition, 350);
    },
    [getCardStep, normalizeScrollPosition, pauseAutoScroll],
  );

  useEffect(() => {
    return () => clearResumeTimer();
  }, [clearResumeTimer]);

  useEffect(() => {
    if (reduceMotion || isPaused) return;

    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    let raf = 0;
    const tick = () => {
      const half = track.scrollWidth / 2;
      if (half > 0) {
        viewport.scrollLeft += 0.55;
        if (viewport.scrollLeft >= half) {
          viewport.scrollLeft -= half;
        }
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isPaused, reduceMotion]);

  if (projects.length === 0) {
    return (
      <div className="w-dyn-empty">
        <div>No items found.</div>
      </div>
    );
  }

  const items = projects.length === 1 ? [projects[0], projects[0]] : projects;
  const loop = [...items, ...items];
  const showNav = projects.length > 1;

  return (
    <div
      className="dev-project-marquee"
      aria-label="Dev projects"
      onMouseEnter={() => pauseAutoScroll()}
      onMouseLeave={() => {
        clearResumeTimer();
        if (!reduceMotion) setIsPaused(false);
      }}
    >
      <div className="dev-project-marquee__fade dev-project-marquee__fade--left" aria-hidden="true" />
      <div className="dev-project-marquee__fade dev-project-marquee__fade--right" aria-hidden="true" />

      {showNav ? (
        <>
          <button
            type="button"
            className="dev-project-marquee__nav dev-project-marquee__nav--prev"
            aria-label="Previous project"
            onClick={() => scrollByCard(-1)}
          >
            <img
              src="/images/5e783247e7efaf4135a2d97a_right-long-arrow-red.svg"
              loading="lazy"
              alt=""
              className="dev-project-marquee__nav-icon dev-project-marquee__nav-icon--prev"
            />
          </button>
          <button
            type="button"
            className="dev-project-marquee__nav dev-project-marquee__nav--next"
            aria-label="Next project"
            onClick={() => scrollByCard(1)}
          >
            <img
              src="/images/5e783247e7efaf4135a2d97a_right-long-arrow-red.svg"
              loading="lazy"
              alt=""
              className="dev-project-marquee__nav-icon"
            />
          </button>
        </>
      ) : null}

      <div ref={viewportRef} className="dev-project-marquee__viewport">
        <div ref={trackRef} className="dev-project-marquee__track">
          {loop.map((project, index) => (
            <MarqueeCard key={`${project.slug}-${index}`} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
