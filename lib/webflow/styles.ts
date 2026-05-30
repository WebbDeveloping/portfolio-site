/** Join class names (replaces Webflow wf-initial + webflowClass). */
export function cn(...classes: Array<string | undefined | false>): string {
  return classes.filter(Boolean).join(" ");
}

/** @deprecated Use cn() — wf-initial removed in favor of Framer Motion Reveal */
export function webflowClass(...classes: Array<string | undefined | false>): string {
  return cn(...classes);
}
