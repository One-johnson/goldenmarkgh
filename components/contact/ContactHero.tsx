"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  defaultTransition,
  fadeUp,
  mountMotion,
  staggerContainer,
} from "@/lib/motion";

interface ContactHeroProps {
  brandName: string;
  title: string;
  intro?: string;
}

export default function ContactHero({
  brandName,
  title,
  intro,
}: ContactHeroProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative overflow-hidden bg-charcoal pb-10 pt-24 sm:pb-12 sm:pt-28 lg:pb-14 lg:pt-32">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_20%,rgba(201,162,39,0.18),transparent_45%),radial-gradient(ellipse_at_90%_80%,rgba(24,67,54,0.45),transparent_40%)]"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="relative mx-auto max-w-6xl px-6 lg:px-8"
        variants={staggerContainer}
        {...mountMotion(reduceMotion)}
      >
        <motion.p
          variants={fadeUp}
          transition={defaultTransition}
          className="font-display text-2xl font-semibold tracking-tight text-gold-light sm:text-3xl"
        >
          {brandName}
        </motion.p>
        <motion.h1
          variants={fadeUp}
          transition={{ ...defaultTransition, delay: 0.08 }}
          className="mt-3 font-display text-4xl font-semibold tracking-tight text-white sm:mt-4 sm:text-5xl lg:text-6xl"
        >
          {title}
        </motion.h1>
        <motion.span
          aria-hidden
          variants={fadeUp}
          transition={{ ...defaultTransition, delay: 0.14 }}
          className="gold-rule mt-5 block"
        />
        {intro ? (
          <motion.p
            variants={fadeUp}
            transition={{ ...defaultTransition, delay: 0.2 }}
            className="mt-5 max-w-2xl text-lg leading-relaxed text-stone-light sm:mt-6 sm:text-xl"
          >
            {intro}
          </motion.p>
        ) : null}
      </motion.div>
    </div>
  );
}
