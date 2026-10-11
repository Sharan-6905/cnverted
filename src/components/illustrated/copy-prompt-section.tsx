"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import "./copy-prompt-section.css";
import dynamic from "next/dynamic";
import { promptAssistants } from "./prompt-assistants";

const CopyPromptWalkthrough = dynamic(() => import("./copy-prompt-walkthrough").then(module => module.CopyPromptWalkthrough), {
  loading: () => <p role="status">Loading your walkthrough…</p>,
});

const SETUP_PROMPT = `I use a B2B lead-generation tool named Cnvrted. It identifies companies that may be in the market to purchase from me by monitoring real-world signals such as funding rounds, job postings, product launches, and public inquiries about my offerings. It then matches these signals with a comprehensive profile of my business.

I'm setting up that profile for [YOUR COMPANY NAME]. Please review everything you know about this business from our previous discussions and document it below. If we've talked about multiple companies or projects, concentrate solely on this company.

IMPORTANT: Only include information you genuinely know from our conversations. If you lack real data for a point, write "no info" and move on. Do not invent customer names, results, pricing, or capabilities. Clearly separate confirmed facts from suggestions.

Create a concise, structured business brief with these sections:

1. BUSINESS OVERVIEW
Company name, website (if known), what we sell, and the problem we solve.

2. PRODUCT AND VALUE
Our main offerings, relevant features, differentiators, and the outcomes customers seek. Include pricing or engagement model only if known.

3. IDEAL CUSTOMER PROFILE
Industries, company sizes, locations, business models, and relevant tools or technologies. Explain what makes a company a strong fit and what disqualifies it.

4. PEOPLE WE SELL TO
Decision-maker titles, influencers, their responsibilities, and the problems or objections that matter to them.

5. BUYING SIGNALS
Events that could make our offering timely: hiring, funding, launches, expansion, tool changes, or publicly expressed needs. Explain why each suggested signal matters. Treat these as ideas to investigate, not evidence that any company is ready to buy.

6. OUTREACH CONTEXT
Our tone of voice, strongest value proposition, relevant proof we can support, and an appropriate next step. Do not fabricate testimonials or performance claims.

7. WHAT IS STILL MISSING
List the few most useful questions to complete the profile.

Use clear headings and plain language. Make the brief easy to copy into Cnvrted. Do not include private personal details, credentials, or unrelated information.`;

export function CopyPromptSection() {
  const [expanded, setExpanded] = useState(false);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");
  const [selectedAI, setSelectedAI] = useState<typeof promptAssistants[number] | null>(null);

  const restoreAssistant = useRef<string | null>(null);
  const actions = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (!selectedAI && restoreAssistant.current) {
      actions.current?.querySelector<HTMLButtonElement>(`[data-assistant="${restoreAssistant.current}"]`)?.focus({ preventScroll: true });
      restoreAssistant.current = null;
    }
  }, [selectedAI]);

  async function copyPrompt() {
    setCopyState("idle");
    try {
      await navigator.clipboard.writeText(SETUP_PROMPT);
      setCopyState("copied");
    } catch {
      setCopyState("error");
      setExpanded(true);
    }
  }

  return <section className="copy-prompt-section design-container" aria-labelledby="copy-prompt-title">
    <div className="copy-prompt-heading">
      <h2 id="copy-prompt-title">Bring your business context</h2>
      <p>Don’t start from scratch. Bring context from your previous work into Cnvrted.</p>
    </div>
    <div className="copy-prompt-panel" data-walkthrough={!!selectedAI}>
      {selectedAI ? <CopyPromptWalkthrough assistant={selectedAI} onBack={() => { restoreAssistant.current = selectedAI.name; setSelectedAI(null); }} /> : <>
      <h3>Copy the prompt below to set up Cnvrted</h3>
      <p className="copy-prompt-intro">Use a conversation that already knows your business, or add your business details first. Copy the resulting brief into Cnvrted.</p>
      <div className="copy-prompt-code" data-expanded={expanded}>
        <button className="copy-prompt-icon" type="button" onClick={() => void copyPrompt()} aria-label={copyState === "copied" ? "Copy setup prompt again" : "Copy setup prompt"}>
          {copyState === "copied" ? <Check size={17} /> : <Copy size={17} />}
        </button>
        <pre id="cnvrted-setup-prompt" tabIndex={expanded ? 0 : -1}>{SETUP_PROMPT}</pre>
        <div className="copy-prompt-expand-row">
          <button type="button" onClick={() => setExpanded(value => !value)} aria-expanded={expanded} aria-controls="cnvrted-setup-prompt">
            {expanded ? "Show less" : "Show the full prompt"}
          </button>
        </div>
      </div>
      <p className="copy-prompt-demo-label">Try a sample walkthrough with your preferred AI.</p>
      <div ref={actions} className="copy-prompt-actions" aria-label="Choose your AI assistant">
        {promptAssistants.map(item => <button key={item.name} data-assistant={item.name} type="button" onClick={() => { setSelectedAI(item); }} aria-label={`Try the ${item.name} setup walkthrough`}>
          <img src={item.logo} alt="" width={21} height={21} loading="lazy" />
          <span>{item.name}</span>
        </button>)}
        <button className="copy-prompt-copy-action" type="button" onClick={() => void copyPrompt()}>
          {copyState === "copied" ? <Check size={17} /> : <Copy size={17} />}
          <span>{copyState === "copied" ? "Copied!" : "Copy prompt"}</span>
        </button>
      </div>
      <div className="copy-prompt-help" role="status" aria-live="polite">
        {copyState === "error" ? <p>Copy wasn’t available in this browser. Select the expanded prompt above and copy it manually.</p>
          : copyState === "copied" ? <p><strong>Prompt copied.</strong> Paste it into an AI conversation that knows your business, replace [YOUR COMPANY NAME], then bring the resulting brief into Cnvrted.</p>
          : <p>Pick your AI above to try the setup animation. Or copy the prompt to use it yourself.</p>}
      </div>
      </>}
    </div>
  </section>;
}
