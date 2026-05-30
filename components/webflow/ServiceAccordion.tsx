"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useId, useState } from "react";
import type { HomeServiceItem } from "@/lib/content/services";

type ServiceAccordionProps = {
  items: HomeServiceItem[];
  className?: string;
};

export default function ServiceAccordion({ items, className }: ServiceAccordionProps) {
  const baseId = useId();
  const reduceMotion = useReducedMotion();
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  const panels = items.map((item) => {
        const isOpen = openId === item.id;
        const panelId = `${baseId}-${item.id}-panel`;

        return (
          <div key={item.id} className={`service${isOpen ? " is-open" : ""}`}>
            <button
              type="button"
              className="service-trigger"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggle(item.id)}
            >
              <div className="question">
                <div className="plus" aria-hidden="true">
                  +
                </div>
                <h4 className="question-text sub-title normal">{item.title}</h4>
              </div>
            </button>
            <motion.div
              id={panelId}
              className="answer"
              role="region"
              aria-hidden={!isOpen}
              initial={false}
              animate={{
                height: isOpen ? "auto" : 0,
                opacity: isOpen ? 1 : 0,
              }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: 0.25, ease: "easeInOut" }
              }
              style={{ overflow: "hidden" }}
            >
              {item.content}
            </motion.div>
          </div>
        );
      });

  if (className) {
    return <div className={className}>{panels}</div>;
  }

  return <>{panels}</>;
}
