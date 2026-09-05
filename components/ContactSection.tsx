"use client";

import { motion, useReducedMotion } from "framer-motion";
import ContactDetails from "@/components/ContactDetails";
import {
  defaultTransition,
  fadeUp,
  inViewMotion,
  staggerContainer,
} from "@/lib/motion";

interface ContactSectionProps {
  email: string;
  address: string;
  phone: string;
}

export default function ContactSection({
  email,
  address,
  phone,
}: ContactSectionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="space-y-8"
      variants={staggerContainer}
      {...inViewMotion(reduceMotion)}
    >
      <motion.div variants={fadeUp} transition={defaultTransition}>
        <ContactDetails
          title="Contact Us"
          email={email}
          address={address}
          phone={phone}
        />
        <p className="mt-8 text-base leading-relaxed text-stone sm:text-lg">
          Prefer email or phone? Reach us directly using the details above, or
          send a message through the inquiry form.
        </p>
      </motion.div>
    </motion.div>
  );
}
