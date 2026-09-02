"use client";

import { FormEvent, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import { INQUIRY_TYPES, type InquiryType } from "@/lib/contact-routing";
import {
  defaultTransition,
  fadeUp,
  inViewMotion,
  scaleIn,
} from "@/lib/motion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface ContactFormProps {
  heading?: string;
  description?: string;
  buttonText?: string;
  successMessage?: string;
}

type Status = "idle" | "loading" | "success" | "error";

function FormCardAccent() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-gold via-gold-light to-gold"
    />
  );
}

export default function ContactForm({
  heading = "Send an inquiry",
  description = "Choose the team that best matches your message. We route each submission to the right department.",
  buttonText = "Send message",
  successMessage = "Thank you — we received your inquiry and will reply within one business day.",
}: ContactFormProps) {
  const reduceMotion = useReducedMotion();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [inquiryType, setInquiryType] = useState<InquiryType>("general");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          company: formData.get("company"),
          inquiryType,
          message: formData.get("message"),
        }),
      });

      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong. Please try again.");
      }

      form.reset();
      setInquiryType("general");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <motion.div variants={fadeUp} transition={defaultTransition} {...inViewMotion(reduceMotion)}>
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div
            key="success"
            initial={reduceMotion ? false : { opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8, scale: 0.98 }}
            transition={defaultTransition}
          >
            <Card className="relative overflow-hidden border-gold/20 py-0 shadow-sm shadow-charcoal/5">
              <FormCardAccent />
              <CardHeader className="gap-4 px-8 pt-8 sm:px-10 sm:pt-10">
                <motion.div
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-gold"
                  variants={scaleIn}
                  initial={reduceMotion ? false : "hidden"}
                  animate="visible"
                  transition={{ ...defaultTransition, delay: 0.1 }}
                >
                  <CheckCircle2 className="h-6 w-6" aria-hidden />
                </motion.div>
                <CardTitle className="font-display text-3xl font-semibold text-charcoal sm:text-4xl">
                  Message sent
                </CardTitle>
                <CardDescription className="text-base leading-relaxed text-stone sm:text-lg">
                  {successMessage}
                </CardDescription>
              </CardHeader>
              <CardContent className="px-8 pb-8 sm:px-10 sm:pb-10">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() => setStatus("idle")}
                >
                  Send another message
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={reduceMotion ? false : { opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8, scale: 0.98 }}
            transition={defaultTransition}
          >
            <Card className="relative overflow-hidden border-gold/20 py-0 shadow-sm shadow-charcoal/5">
              <FormCardAccent />
              <CardHeader className="gap-3 px-8 pt-8 sm:px-10 sm:pt-10">
                <p className="section-label">Inquiry form</p>
                <CardTitle className="font-display text-3xl font-semibold text-charcoal sm:text-4xl">
                  {heading}
                </CardTitle>
                {description ? (
                  <CardDescription className="max-w-xl text-base leading-relaxed text-stone sm:text-lg">
                    {description}
                  </CardDescription>
                ) : null}
              </CardHeader>
              <CardContent className="px-8 pb-8 sm:px-10 sm:pb-10">
                <form onSubmit={onSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="inquiryType"
                      className="text-sm font-semibold uppercase tracking-[0.14em] text-gold-muted"
                    >
                      Inquiry type
                    </Label>
                    <Select
                      value={inquiryType}
                      onValueChange={(value) => setInquiryType(value as InquiryType)}
                    >
                      <SelectTrigger id="inquiryType" className="h-11 w-full">
                        <SelectValue placeholder="Select inquiry type" />
                      </SelectTrigger>
                      <SelectContent>
                        {INQUIRY_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-stone-light">
                      General inquiries go to{" "}
                      <span className="font-medium text-stone">info@</span>. Other types
                      route to the matching department inbox.
                    </p>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full name</Label>
                      <Input
                        id="name"
                        name="name"
                        required
                        autoComplete="name"
                        placeholder="Your name"
                        className="h-11 bg-background/80"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">
                        Company{" "}
                        <span className="font-normal text-muted-foreground">
                          (optional)
                        </span>
                      </Label>
                      <Input
                        id="company"
                        name="company"
                        autoComplete="organization"
                        placeholder="Company or organisation"
                        className="h-11 bg-background/80"
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="you@company.com"
                        className="h-11 bg-background/80"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">
                        Phone{" "}
                        <span className="font-normal text-muted-foreground">
                          (optional)
                        </span>
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="+233 ..."
                        className="h-11 bg-background/80"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      placeholder="Tell us about your inquiry, timeline and how we can help."
                      className="min-h-36 bg-background/80"
                    />
                  </div>

                  <AnimatePresence initial={false}>
                    {status === "error" ? (
                      <motion.div
                        key="error"
                        initial={reduceMotion ? false : { opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={reduceMotion ? undefined : { opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <Alert variant="destructive">
                          <AlertDescription>{error}</AlertDescription>
                        </Alert>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>

                  <Button
                    type="submit"
                    variant="gold"
                    size="lg"
                    disabled={status === "loading"}
                    className="w-full sm:w-auto"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="animate-spin" aria-hidden />
                        Sending…
                      </>
                    ) : (
                      buttonText
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
