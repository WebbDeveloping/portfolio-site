/** Matches Webflow IX2 scroll reveal: fade in + scale from 0.8 */
export const revealHidden = { opacity: 0, scale: 0.8 } as const;

export const revealVisible = { opacity: 1, scale: 1 } as const;

export const revealTransition = {
  duration: 0.6,
  ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
};

export const revealViewport = {
  once: true,
  amount: 0.15,
  margin: "0px 0px -60px 0px",
} as const;
