"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  INQUIRY_TYPES,
  type DepartmentEmails,
} from "@/lib/contact-routing";
import {
  defaultTransition,
  fadeUp,
  inViewMotion,
  staggerContainer,
  staggerFast,
} from "@/lib/motion";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface ContactSectionProps {
  address?: string;
  phone?: string;
  emails: DepartmentEmails;
}

const DEPARTMENT_LABELS: Record<keyof DepartmentEmails, string> = {
  info: "General inquiries",
  trade: "Trade & sourcing",
  finance: "Finance",
  operations: "Operations",
  ceo: "Executive office",
};

export default function ContactSection({
  address,
  phone,
  emails,
}: ContactSectionProps) {
  const reduceMotion = useReducedMotion();
  const phoneHref = phone?.replace(/\s/g, "") ?? "";

  const mailboxOrder: (keyof DepartmentEmails)[] = [
    "info",
    "trade",
    "finance",
    "operations",
    "ceo",
  ];

  return (
    <motion.div
      className="space-y-8"
      variants={staggerContainer}
      {...inViewMotion(reduceMotion)}
    >
      <motion.div variants={fadeUp} transition={defaultTransition}>
        <p className="section-label">Reach our team</p>
        <h2 className="mt-3 font-display text-3xl font-semibold text-charcoal sm:text-4xl">
          Direct lines & mailboxes
        </h2>
        <span aria-hidden className="gold-rule mt-5" />
        <p className="mt-5 text-base leading-relaxed text-stone sm:text-lg">
          Use the form for routed inquiries, or contact a department directly
          below.
        </p>
      </motion.div>

      <motion.div
        className="grid gap-4 sm:grid-cols-2"
        variants={staggerFast}
      >
        {address ? (
          <motion.div variants={fadeUp} transition={defaultTransition}>
            <Card className="border-gold/15 bg-surface/80 py-4 shadow-none">
              <CardHeader className="gap-2 px-5">
                <CardDescription className="section-label text-gold-muted">
                  Address
                </CardDescription>
                <CardTitle className="font-sans text-lg font-normal text-foreground">
                  {address}
                </CardTitle>
              </CardHeader>
            </Card>
          </motion.div>
        ) : null}
        {phone ? (
          <motion.div variants={fadeUp} transition={defaultTransition}>
            <Card className="border-gold/15 bg-surface/80 py-4 shadow-none">
              <CardHeader className="gap-2 px-5">
                <CardDescription className="section-label text-gold-muted">
                  Phone
                </CardDescription>
                <CardTitle className="font-sans text-lg font-normal">
                  <a
                    href={`tel:${phoneHref}`}
                    className="text-foreground transition hover:text-gold-muted"
                  >
                    {phone}
                  </a>
                </CardTitle>
              </CardHeader>
            </Card>
          </motion.div>
        ) : null}
      </motion.div>

      <motion.div variants={fadeUp} transition={defaultTransition}>
        <div className="flex items-center gap-3">
          <p className="section-label">Department mailboxes</p>
          <Separator className="flex-1 bg-gold/15" />
        </div>
        <motion.ul
          className="mt-4 space-y-3"
          variants={staggerFast}
          initial="hidden"
          whileInView="visible"
          viewport={
            reduceMotion
              ? undefined
              : { once: true, amount: 0.08, margin: "0px 0px -8% 0px" }
          }
        >
          {mailboxOrder.map((key) => {
            const inquiry = INQUIRY_TYPES.find((item) => item.department === key);
            return (
              <motion.li
                key={key}
                variants={fadeUp}
                transition={defaultTransition}
                whileHover={
                  reduceMotion ? undefined : { y: -2, transition: { duration: 0.2 } }
                }
              >
                <Card className="border-gold/15 bg-surface/80 py-4 shadow-none transition hover:border-gold/30">
                  <CardContent className="px-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge
                        variant="outline"
                        className="border-gold/25 bg-gold/5 text-gold-muted"
                      >
                        {DEPARTMENT_LABELS[key]}
                      </Badge>
                    </div>
                    {emails[key] ? (
                      <a
                        href={`mailto:${emails[key]}`}
                        className="mt-3 block font-medium text-charcoal transition hover:text-gold-muted"
                      >
                        {emails[key]}
                      </a>
                    ) : (
                      <p className="mt-3 text-sm text-stone-light">Coming soon</p>
                    )}
                    {inquiry ? (
                      <p className="mt-1 text-sm text-stone-light">
                        {inquiry.description}
                      </p>
                    ) : null}
                  </CardContent>
                </Card>
              </motion.li>
            );
          })}
        </motion.ul>
      </motion.div>
    </motion.div>
  );
}
