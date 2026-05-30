"use client";

import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
  type MotionProps,
} from "framer-motion";
import type { HTMLAttributes, ReactNode } from "react";
import {
  revealHidden,
  revealTransition,
  revealViewport,
  revealVisible,
} from "@/lib/motion/variants";

type MotionTag =
  | "div"
  | "section"
  | "article"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span"
  | "img"
  | "ul"
  | "li";

type RevealProps = {
  children?: ReactNode;
  className?: string;
  /** Stagger delay in seconds */
  delay?: number;
  /** Above-the-fold heroes: animate on mount instead of scroll */
  immediate?: boolean;
  as?: MotionTag;
} & Omit<HTMLMotionProps<"div">, keyof MotionProps | "children">;

export default function Reveal({
  children,
  className,
  delay = 0,
  immediate = false,
  as = "div",
  ...rest
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const MotionEl = motion[as] as typeof motion.div;

  const hidden = reduceMotion ? revealVisible : revealHidden;
  const visible = revealVisible;

  const transition = { ...revealTransition, delay };

  if (reduceMotion) {
    const Tag = as;
    return (
      <Tag className={className} {...(rest as HTMLAttributes<HTMLElement>)}>
        {children}
      </Tag>
    );
  }

  if (immediate) {
    return (
      <MotionEl
        className={className}
        initial={hidden}
        animate={visible}
        transition={transition}
        {...rest}
      >
        {children}
      </MotionEl>
    );
  }

  return (
    <MotionEl
      className={className}
      initial={hidden}
      whileInView={visible}
      viewport={revealViewport}
      transition={transition}
      {...rest}
    >
      {children}
    </MotionEl>
  );
}
