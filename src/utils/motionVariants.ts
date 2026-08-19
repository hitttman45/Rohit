import { Variants, Transition } from 'motion/react';

/**
 * Premium Cubic Bezier & Timing Configurations
 * High-end creative director feel: smooth acceleration, organic deceleration, zero harsh bouncing.
 */
export const TRANSITION_SMOOTH: Transition = {
  duration: 0.75,
  ease: [0.22, 1, 0.36, 1],
};

export const TRANSITION_SLOW: Transition = {
  duration: 0.95,
  ease: [0.22, 1, 0.36, 1],
};

export const TRANSITION_FAST: Transition = {
  duration: 0.55,
  ease: [0.22, 1, 0.36, 1],
};

/**
 * Viewport configuration for bidirectional scroll animations
 * once: false ensures it replays smoothly when scrolling up & down
 * amount: 0.15 gives immediate natural trigger as soon as edge enters
 */
export const SCROLL_VIEWPORT_CONFIG = {
  once: false,
  amount: 0.15,
  margin: '-20px 0px -20px 0px',
};

export const SCROLL_VIEWPORT_STRICT = {
  once: false,
  amount: 0.25,
};

/**
 * Reusable Motion Variants for Reversible Scroll-Triggered Animations
 */
export const fadeUpVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: TRANSITION_SMOOTH,
  },
};

export const fadeDownVariant: Variants = {
  hidden: {
    opacity: 0,
    y: -30,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: TRANSITION_SMOOTH,
  },
};

export const fadeInLeftVariant: Variants = {
  hidden: {
    opacity: 0,
    x: -35,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: TRANSITION_SMOOTH,
  },
};

export const fadeInRightVariant: Variants = {
  hidden: {
    opacity: 0,
    x: 35,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: TRANSITION_SMOOTH,
  },
};

export const scaleUpVariant: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.94,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: TRANSITION_SMOOTH,
  },
};

/**
 * Stagger Container Variant
 */
export const staggerContainerVariant: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.05,
    },
  },
};

export const fastStaggerContainerVariant: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.03,
    },
  },
};
