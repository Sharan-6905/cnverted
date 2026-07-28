"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

const ROLE_OPTIONS = [
  "AI/ML Engineer",
  "GTM Engineer",
  "GTM Lead",
  "Founders Office Intern (In batches)",
];

export function CareerApplicationForm() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !phone || !email || !role) return;
    console.log("[careers] submit:", { name, phone, email, role });
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <Card className="mx-auto max-w-xl p-8 text-center sm:p-10">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-intent-high-bg">
          <Check className="h-6 w-6 text-intent-high" />
        </div>
        <p className="mt-4 text-[15px] leading-relaxed text-ink">
          Thank you for filling the form — our team will get in touch with you.
        </p>
      </Card>
    );
  }

  if (!open) {
    return (
      <div className="text-center">
        <Button variant="primary" size="lg" onClick={() => setOpen(true)}>
          Join with us
        </Button>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <Card className="mx-auto max-w-sm border border-blue-200/50 bg-gradient-to-br from-blue-400/15 via-teal-300/10 to-emerald-300/10 p-6 shadow-soft backdrop-blur-xl sm:p-7">
          <h3 className="text-center font-display text-xl font-semibold text-ink">
            Join with us
          </h3>
          <form onSubmit={handleSubmit} className="mt-5 space-y-3">
        <div>
          <label htmlFor="career-name" className="mb-1.5 block text-sm font-medium text-ink">
            Name
          </label>
          <Input
            id="career-name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
          />
        </div>

        <div>
          <label htmlFor="career-phone" className="mb-1.5 block text-sm font-medium text-ink">
            Phone
          </label>
          <Input
            id="career-phone"
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Your phone number"
          />
        </div>

        <div>
          <label htmlFor="career-email" className="mb-1.5 block text-sm font-medium text-ink">
            Email
          </label>
          <Input
            id="career-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your mail"
          />
        </div>

        <div>
          <label htmlFor="career-role" className="mb-1.5 block text-sm font-medium text-ink">
            Role applied for
          </label>
          <select
            id="career-role"
            required
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="h-11 w-full rounded-xl border border-hairline bg-canvas px-4 text-sm text-ink smooth-transition transition-colors focus:border-ink focus:outline-none focus:ring-2 focus:ring-brand-teal/25"
          >
            <option value="" disabled>
              Select a role
            </option>
            {ROLE_OPTIONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <Button type="submit" variant="primary" size="md" className="w-full">
          Submit
        </Button>
          </form>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
