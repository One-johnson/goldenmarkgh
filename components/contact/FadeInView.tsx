"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  defaultTransition,
  fadeUp,
  inViewMotion,
} from "@/lib/motion";

interface FadeInViewProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function FadeInView({
  children,
  className,
  delay = 0,
}: FadeInViewProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={fadeUp}
      transition={{ ...defaultTransition, delay }}
      {...inViewMotion(reduceMotion)}
    >
      {children}
    </motion.div>
  );
}
