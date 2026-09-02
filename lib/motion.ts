import type { Transition, Variants } from "framer-motion";

export const easeOut: Transition["ease"] = [0.22, 1, 0.36, 1];

export const defaultTransition: Transition = {
  duration: 0.55,
  ease: easeOut,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1 },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.02,
    },
  },
};

export function mountMotion(reduceMotion: boolean | null) {
  if (reduceMotion) {
    return { initial: false as const, animate: "visible" as const };
  }

  return {
    initial: "hidden" as const,
    animate: "visible" as const,
  };
}

export function inViewMotion(reduceMotion: boolean | null) {
  if (reduceMotion) {
    return { initial: false as const, animate: "visible" as const };
  }

  return {
    initial: "hidden" as const,
    whileInView: "visible" as const,
    viewport: { once: true, amount: 0.12, margin: "0px 0px -8% 0px" },
  };
}
