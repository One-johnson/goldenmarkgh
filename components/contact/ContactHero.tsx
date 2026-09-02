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
    <div className="relative overflow-hidden bg-charcoal pb-16 pt-32 lg:pb-20 lg:pt-36">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_20%,rgba(96,72,48,0.35),transparent_45%),radial-gradient(ellipse_at_90%_80%,rgba(196,168,130,0.1),transparent_40%)]"
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
          className="font-display text-3xl font-semibold tracking-tight text-gold-light sm:text-4xl"
        >
          {brandName}
        </motion.p>
        <motion.h1
          variants={fadeUp}
          transition={{ ...defaultTransition, delay: 0.08 }}
          className="mt-5 font-display text-5xl font-semibold tracking-tight text-white sm:text-6xl"
        >
          {title}
        </motion.h1>
        <motion.span
          aria-hidden
          variants={fadeUp}
          transition={{ ...defaultTransition, delay: 0.14 }}
          className="gold-rule mt-7 block"
        />
        {intro ? (
          <motion.p
            variants={fadeUp}
            transition={{ ...defaultTransition, delay: 0.2 }}
            className="mt-7 max-w-2xl text-xl leading-relaxed text-stone-light sm:text-2xl"
          >
            {intro}
          </motion.p>
        ) : null}
      </motion.div>
    </div>
  );
}
