import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  fadeUpVariant,
  fadeInLeftVariant,
  fadeInRightVariant,
  scaleUpVariant,
  staggerContainerVariant,
  SCROLL_VIEWPORT_CONFIG,
  TRANSITION_SMOOTH,
} from '../utils/motionVariants';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'fadeUp' | 'fadeLeft' | 'fadeRight' | 'scaleUp' | 'stagger';
  delay?: number;
  threshold?: number;
  as?: keyof typeof motion;
  onClick?: () => void;
  id?: string;
}

export function ScrollReveal({
  children,
  className = '',
  variant = 'fadeUp',
  delay = 0,
  threshold = 0.15,
  as = 'div',
  onClick,
  id,
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  const getVariant = () => {
    switch (variant) {
      case 'fadeLeft':
        return fadeInLeftVariant;
      case 'fadeRight':
        return fadeInRightVariant;
      case 'scaleUp':
        return scaleUpVariant;
      case 'stagger':
        return staggerContainerVariant;
      case 'fadeUp':
      default:
        return fadeUpVariant;
    }
  };

  const selectedVariant = getVariant();

  // If reduced motion is preferred, simplify animation to gentle instant fade
  if (shouldReduceMotion) {
    return (
      <div className={className} id={id} onClick={onClick}>
        {children}
      </div>
    );
  }

  const MotionComponent = motion[as as 'div'] || motion.div;

  return (
    <MotionComponent
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: false,
        amount: threshold,
        margin: '-20px 0px -20px 0px',
      }}
      variants={selectedVariant}
      transition={{
        ...TRANSITION_SMOOTH,
        delay: delay,
      }}
      className={className}
      onClick={onClick}
    >
      {children}
    </MotionComponent>
  );
}
