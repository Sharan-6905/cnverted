"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SlackLogo } from "@/components/slack-logo";
import { COMMUNITY_STEPS, EMPTY_COMMUNITY_ANSWERS, SLACK_INVITE_URL, communityFieldError, type CommunityAnswers } from "@/lib/community";

export function CommunityForm() {
  const [answers, setAnswers] = useState<CommunityAnswers>(EMPTY_COMMUNITY_ANSWERS);
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const success = useRef<HTMLHeadingElement>(null);
  const honeypot = useRef<HTMLInputElement>(null);
  const pending = useRef(false);
  const moved = useRef(false);
  const controller = useRef<AbortController | null>(null);
  const current = COMMUNITY_STEPS[step];

  useEffect(() => {
    if (moved.current) input.current?.focus({ preventScroll: true });
  }, [step]);
  useEffect(() => { if (sent) success.current?.focus({ preventScroll: true }); }, [sent]);
  useEffect(() => () => controller.current?.abort(), []);

  function goTo(next: number) {
    moved.current = true;
    setError("");
    setStep(next);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current) return;
    const invalid = communityFieldError(current.key, answers[current.key]);
    if (invalid) { setError(invalid); input.current?.focus(); return; }
    if (step < COMMUNITY_STEPS.length - 1) { goTo(step + 1); return; }

    pending.current = true;
    setBusy(true);
    setError("");
    const request = new AbortController();
    controller.current = request;
    const timeout = window.setTimeout(() => request.abort(), 15000);
    try {
      const response = await fetch("/api/community", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...answers, companyFax: honeypot.current?.value ?? "" }),
        signal: request.signal,
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true) {
        const invalidStep = COMMUNITY_STEPS.findIndex((item) => item.key === result.field);
        if (invalidStep >= 0) goTo(invalidStep);
        throw new Error(result.error || "Your answers weren’t sent. Please try again.");
      }
      setSent(true);
    } catch (cause) {
      setError(request.signal.aborted ? "This is taking longer than expected. Please try again." : cause instanceof Error ? cause.message : "Unable to connect. Please try again.");
    } finally {
      window.clearTimeout(timeout);
      pending.current = false;
      setBusy(false);
    }
  }

  if (sent) return (
    <div className="community-complete">
      <h2 ref={success} tabIndex={-1}>Thank you for your time <span>!</span><span>!</span></h2>
      <p>Your answers are with our team. You’re ready to join the conversation.</p>
      <a href={SLACK_INVITE_URL} target="_blank" rel="noopener noreferrer" className="design-button design-button-solid">
        <SlackLogo width={21} height={21} /> Join Slack <ArrowRight size={19} aria-hidden="true" />
      </a>
      <small>Slack opens in a new tab. You’ll finish joining there.</small>
      <p className="community-support">Invite not working? <a href="mailto:work@cnvrted.com">Let us know.</a></p>
    </div>
  );

  return (
    <form className="community-form" method="post" onSubmit={submit} noValidate aria-busy={busy}>
      <noscript><p>Please enable JavaScript to complete this form, or email <a href="mailto:work@cnvrted.com">work@cnvrted.com</a>.</p></noscript>
      <div className="community-answer-card">
        <div className="community-card-header">
          <span className="community-card-eyebrow"><SlackLogo width={18} height={18} /> Your introduction</span>
          <span className="community-step-count" aria-hidden="true"><strong>{String(step + 1).padStart(2, "0")}</strong> / {String(COMMUNITY_STEPS.length).padStart(2, "0")}</span>
        </div>
        <div className="community-progress" role="progressbar" aria-label="Community sign-up progress" aria-valuemin={1} aria-valuemax={COMMUNITY_STEPS.length} aria-valuenow={step + 1} aria-valuetext={`Step ${step + 1} of ${COMMUNITY_STEPS.length}: ${current.label}`}>
          {COMMUNITY_STEPS.map((item, index) => <span key={item.key} data-reached={index <= step} />)}
        </div>
        <div className="community-step" key={current.key}>
          <label htmlFor={`community-${current.key}`} className="community-label">
            <span className="community-field-name">{current.label}</span>
            <span className="community-question">{current.question}</span>
          </label>
          <div className="community-answer" data-invalid={Boolean(error)}>
            <input
              ref={input}
              id={`community-${current.key}`}
              name={current.key}
              type={current.type}
              inputMode={current.key === "website" ? "url" : current.key === "email" ? "email" : "text"}
              autoComplete={current.autoComplete}
              autoCapitalize={current.key === "email" || current.key === "website" ? "none" : "words"}
              spellCheck={false}
              maxLength={current.maxLength}
              required={current.key !== "website"}
              placeholder={current.placeholder}
              value={answers[current.key]}
              onChange={(event) => { setAnswers((previous) => ({ ...previous, [current.key]: event.target.value })); setError(""); }}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "community-hint community-error" : "community-hint"}
              readOnly={busy}
              enterKeyHint={step === COMMUNITY_STEPS.length - 1 ? "send" : "next"}
            />
          </div>
          <p id="community-hint" className="community-hint">{current.hint}</p>
        </div>
        <div className="community-honeypot" aria-hidden="true"><label htmlFor="community-fax">Leave empty</label><input ref={honeypot} id="community-fax" name="companyFax" tabIndex={-1} autoComplete="off" /></div>
        <div className="community-error-slot">{error && <p id="community-error" role="alert">{error}</p>}</div>
        <div className="community-actions">
          <button type="button" className="community-back" onClick={() => goTo(step - 1)} disabled={step === 0 || busy}><ArrowLeft size={20} aria-hidden="true" /> Back</button>
          <div className="community-next">
            <button type="submit" className="design-button design-button-solid" disabled={busy}>{busy ? "Sending…" : step === COMMUNITY_STEPS.length - 1 ? "Send & continue" : "Continue"}<ArrowRight size={19} aria-hidden="true" /></button>
            <span className="community-enter">or press <kbd>Enter ↵</kbd></span>
          </div>
        </div>
      </div>
      <p className="community-privacy">Your answers go to the Cnvrted team. Read our <Link href="/privacy">Privacy Policy</Link> and <Link href="/terms">Terms & Conditions</Link>.</p>
    </form>
  );
}
