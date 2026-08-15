"use client";

import { useRef, useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import {
  TEAM_SIZES,
  SALES_TOOLS,
  INTENT_OPTIONS,
  EARLY_ACCESS_DEFAULTS,
  type EarlyAccessData,
} from "@/lib/early-access-options";

type Errors = Partial<Record<keyof EarlyAccessData, string>>;

function validate(data: EarlyAccessData): Errors {
  const errors: Errors = {};
  if (data.fullName.trim().length < 2) errors.fullName = "Add your name so we know who to reply to.";
  if ((data.phone.match(/\d/g) ?? []).length < 8) errors.phone = "That looks short — include your country code.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "That does not look like an email address.";
  if (data.role.trim().length < 2) errors.role = "Your role helps us shape the demo.";
  if (!data.teamSize) errors.teamSize = "Pick the closest fit.";
  if (data.location.trim().length < 2) errors.location = "City and country is enough.";
  if (!data.usedSalesTool) errors.usedSalesTool = "Yes or no is all we need.";
  if (!data.intent) errors.intent = "Pick whichever is honest.";
  return errors;
}

function StepHeading({ number, title }: { number: number; title: string }) {
  return (
    <div className="flex items-center gap-3.5">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-teal/15 font-mono text-xs font-medium text-brand-teal">
        {number}
      </span>
      <h2 className="font-display text-lg font-semibold tracking-tight text-ink">{title}</h2>
    </div>
  );
}

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-ink">
      {children}
    </label>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1.5 text-xs text-red-600" role="alert">
      {message}
    </p>
  );
}

function PillOption({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full px-3.5 py-1.5 text-sm smooth-transition transition-colors",
        selected
          ? "bg-ink text-on-dark"
          : "border border-hairline bg-canvas text-muted hover:text-ink"
      )}
    >
      {label}
    </button>
  );
}

export function EarlyAccessForm() {
  const [data, setData] = useState<EarlyAccessData>(EARLY_ACCESS_DEFAULTS);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function set<K extends keyof EarlyAccessData>(key: K, value: EarlyAccessData[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  function toggleTool(tool: string) {
    setData((d) => ({
      ...d,
      tools: d.tools.includes(tool) ? d.tools.filter((t) => t !== tool) : [...d.tools, tool],
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors = validate(data);
    setErrors(nextErrors);

    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) {
      const el = formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      el?.focus({ preventScroll: true });
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    const { error } = await supabase.from("registration").insert({
      full_name: data.fullName,
      phone: data.phone,
      email: data.email,
      company: data.company || null,
      role: data.role,
      what_you_do: data.whatYouDo || null,
      team_size: data.teamSize,
      location: data.location,
      used_sales_tool: data.usedSalesTool,
      tools: data.tools,
      tools_feedback: data.toolsFeedback || null,
      finding_accounts_today: data.findingAccountsToday || null,
      biggest_challenge: data.biggestChallenge || null,
      intent: data.intent,
      demo_time: data.demoTime || null,
    });

    if (error) {
      setSubmitError(
        error.code === "23505"
          ? "That email has already registered — we've got it."
          : "Something went wrong — please try again."
      );
      setSubmitting(false);
      return;
    }

    // Confirmation email is best-effort — a failure here shouldn't block the
    // success screen, since the submission is already saved.
    fetch("/api/early-access-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: data.email, fullName: data.fullName }),
    }).catch(() => {});

    setSent(true);
    setSubmitting(false);
  }

  if (sent) {
    return (
      <div className="rounded-3xl border border-hairline bg-canvas px-6 py-16 text-center shadow-soft sm:px-12">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-intent-high-bg">
          <Check className="h-6 w-6 text-intent-high" />
        </div>
        <h2 className="mt-6 font-display text-2xl font-semibold tracking-tight text-ink">We&rsquo;ve got it.</h2>
        <p className="mx-auto mt-3 max-w-[420px] text-[15px] leading-relaxed text-body">
          A founder reads this within 24 hours and emails you directly to lock a demo slot.
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="rounded-3xl border border-hairline bg-canvas shadow-soft">
      {/* Step 1 — Who you are */}
      <section className="px-6 py-9 sm:px-11 sm:py-11">
        <StepHeading number={1} title="Who you are" />
        <div className="mt-6 space-y-5">
          <div>
            <FieldLabel htmlFor="fullName">Full name</FieldLabel>
            <Input
              id="fullName"
              name="fullName"
              autoComplete="name"
              value={data.fullName}
              onChange={(e) => set("fullName", e.target.value)}
            />
            <FieldError message={errors.fullName} />
          </div>
          <div>
            <FieldLabel htmlFor="phone">Phone number</FieldLabel>
            <Input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={data.phone}
              onChange={(e) => set("phone", e.target.value)}
            />
            <p className="mt-1.5 text-xs text-muted-soft">Include your country code.</p>
            <FieldError message={errors.phone} />
          </div>
          <div>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={data.email}
              onChange={(e) => set("email", e.target.value)}
            />
            <FieldError message={errors.email} />
          </div>
        </div>
      </section>

      <div className="border-t border-hairline" />

      {/* Step 2 — Where you work */}
      <section className="px-6 py-9 sm:px-11 sm:py-11">
        <StepHeading number={2} title="Where you work" />
        <div className="mt-6 space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <FieldLabel htmlFor="company">
                Company name <span className="text-muted-soft">— optional</span>
              </FieldLabel>
              <Input
                id="company"
                name="company"
                autoComplete="organization"
                value={data.company}
                onChange={(e) => set("company", e.target.value)}
              />
            </div>
            <div>
              <FieldLabel htmlFor="role">Role</FieldLabel>
              <Input
                id="role"
                name="role"
                autoComplete="organization-title"
                placeholder="Founder, Head of Sales, SDR lead…"
                value={data.role}
                onChange={(e) => set("role", e.target.value)}
              />
              <FieldError message={errors.role} />
            </div>
          </div>

          <div>
            <FieldLabel htmlFor="whatYouDo">
              What do you do? <span className="text-muted-soft">— optional</span>
            </FieldLabel>
            <textarea
              id="whatYouDo"
              name="whatYouDo"
              rows={2}
              placeholder="One line on what your team sells and to whom."
              className="w-full rounded-xl border border-hairline bg-canvas px-4 py-2.5 text-sm text-ink smooth-transition transition-colors placeholder:text-muted-soft focus:border-ink focus:outline-none focus:ring-2 focus:ring-brand-teal/25"
              value={data.whatYouDo}
              onChange={(e) => set("whatYouDo", e.target.value)}
            />
          </div>

          <div>
            <p className="mb-1.5 text-sm font-medium text-ink">Team size</p>
            <div className="flex flex-wrap gap-2">
              {TEAM_SIZES.map((size) => (
                <PillOption
                  key={size}
                  label={size}
                  selected={data.teamSize === size}
                  onClick={() => set("teamSize", size)}
                />
              ))}
            </div>
            <input type="hidden" name="teamSize" value={data.teamSize} />
            <FieldError message={errors.teamSize} />
          </div>

          <div>
            <FieldLabel htmlFor="location">Location</FieldLabel>
            <Input
              id="location"
              name="location"
              placeholder="City, country"
              value={data.location}
              onChange={(e) => set("location", e.target.value)}
            />
            <FieldError message={errors.location} />
          </div>
        </div>
      </section>

      <div className="border-t border-hairline" />

      {/* Step 3 — Your current tooling */}
      <section className="px-6 py-9 sm:px-11 sm:py-11">
        <StepHeading number={3} title="Your current tooling" />
        <div className="mt-6 space-y-5">
          <div>
            <p className="mb-1.5 text-sm font-medium text-ink">Have you used any sales tool before?</p>
            <div className="flex flex-wrap gap-2">
              {(["yes", "no"] as const).map((option) => (
                <PillOption
                  key={option}
                  label={option === "yes" ? "Yes" : "No"}
                  selected={data.usedSalesTool === option}
                  onClick={() => set("usedSalesTool", option)}
                />
              ))}
            </div>
            <input type="hidden" name="usedSalesTool" value={data.usedSalesTool} />
            <FieldError message={errors.usedSalesTool} />
          </div>

          {data.usedSalesTool === "yes" && (
            <div className="space-y-5 pt-1">
              <div>
                <p className="mb-1.5 text-sm font-medium text-ink">Which ones?</p>
                <div className="flex flex-wrap gap-2">
                  {SALES_TOOLS.map((tool) => (
                    <PillOption
                      key={tool}
                      label={tool}
                      selected={data.tools.includes(tool)}
                      onClick={() => toggleTool(tool)}
                    />
                  ))}
                </div>
              </div>
              <div>
                <FieldLabel htmlFor="toolsFeedback">
                  What&rsquo;s it good at, and where does it fall short?
                </FieldLabel>
                <textarea
                  id="toolsFeedback"
                  rows={3}
                  className="w-full rounded-xl border border-hairline bg-canvas px-4 py-2.5 text-sm text-ink smooth-transition transition-colors placeholder:text-muted-soft focus:border-ink focus:outline-none focus:ring-2 focus:ring-brand-teal/25"
                  value={data.toolsFeedback}
                  onChange={(e) => set("toolsFeedback", e.target.value)}
                />
              </div>
            </div>
          )}

          {data.usedSalesTool === "no" && (
            <div className="pt-1">
              <FieldLabel htmlFor="findingAccountsToday">How are you finding accounts today?</FieldLabel>
              <textarea
                id="findingAccountsToday"
                rows={3}
                className="w-full rounded-xl border border-hairline bg-canvas px-4 py-2.5 text-sm text-ink smooth-transition transition-colors placeholder:text-muted-soft focus:border-ink focus:outline-none focus:ring-2 focus:ring-brand-teal/25"
                value={data.findingAccountsToday}
                onChange={(e) => set("findingAccountsToday", e.target.value)}
              />
            </div>
          )}
        </div>
      </section>

      <div className="border-t border-hairline" />

      {/* Step 4 — The gap */}
      <section className="px-6 py-9 sm:px-11 sm:py-11">
        <StepHeading number={4} title="The gap" />
        <div className="mt-6">
          <FieldLabel htmlFor="biggestChallenge">
            What&rsquo;s your biggest challenge finding accounts that are actually ready to buy?
          </FieldLabel>
          <p className="mb-2 text-xs text-muted-soft">Optional — helps us prioritise what to build.</p>
          <textarea
            id="biggestChallenge"
            rows={4}
            className="w-full rounded-xl border border-hairline bg-canvas px-4 py-2.5 text-sm text-ink smooth-transition transition-colors placeholder:text-muted-soft focus:border-ink focus:outline-none focus:ring-2 focus:ring-brand-teal/25"
            value={data.biggestChallenge}
            onChange={(e) => set("biggestChallenge", e.target.value)}
          />
        </div>
      </section>

      <div className="border-t border-hairline" />

      {/* Step 5 — Fit & timing */}
      <section className="px-6 py-9 sm:px-11 sm:py-11">
        <StepHeading number={5} title="Fit and timing" />
        <div className="mt-6 space-y-5">
          <div>
            <p className="mb-1.5 text-sm font-medium text-ink">
              Are you actively looking for something like this right now?
            </p>
            <div className="flex flex-wrap gap-2">
              {INTENT_OPTIONS.map((option) => (
                <PillOption
                  key={option}
                  label={option}
                  selected={data.intent === option}
                  onClick={() => set("intent", option)}
                />
              ))}
            </div>
            <input type="hidden" name="intent" value={data.intent} />
            <FieldError message={errors.intent} />
          </div>

          <div>
            <FieldLabel htmlFor="demoTime">
              When&rsquo;s a good time to reach you for a quick demo call?{" "}
              <span className="text-muted-soft">— optional</span>
            </FieldLabel>
            <Input
              id="demoTime"
              placeholder="Weekday afternoons, Tuesday 3pm — whatever works."
              value={data.demoTime}
              onChange={(e) => set("demoTime", e.target.value)}
            />
          </div>
        </div>
      </section>

      <div className="border-t border-hairline" />

      {/* Footer */}
      <div className="px-6 py-9 text-center sm:px-11">
        <Button type="submit" variant="accent" size="lg" disabled={submitting}>
          {submitting ? "Sending…" : "Send it over"}
        </Button>
        {submitError && <p className="mt-3 text-xs text-red-600">{submitError}</p>}
        <p className="mt-3 text-xs text-muted-soft">No spam. Ever.</p>
      </div>
    </form>
  );
}
