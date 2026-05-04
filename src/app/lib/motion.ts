/**
 * Shared motion tokens — editorial / award-site curves (smooth deceleration, no bounce).
 */
export const easeOutExpo = [0.16, 1, 0.3, 1] as const;
export const easeOutStrong = [0.22, 1, 0.36, 1] as const;

export const transitionReveal = {
  duration: 0.95,
  ease: easeOutExpo,
} as const;

export const transitionSnappy = {
  duration: 0.55,
  ease: easeOutExpo,
} as const;

export const springMagnetic = { type: "spring" as const, stiffness: 400, damping: 32, mass: 0.45 };
