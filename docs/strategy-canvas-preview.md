# GTM copilot demo — local experiment

The original fourth homepage section has been restored at the user's request.
The demo remains saved locally for later. To resume it, change the StrategySection
import in `src/components/illustrated/home.tsx` from `./strategy-section-original`
to `./strategy-section`.

The saved experiment uses `StrategySection` from
`src/components/illustrated/strategy-section.tsx`. It retains the existing beta
app destination for **Try the canvas**. Preview the workspace directly at
`http://localhost:3020/#strategy-demo`.

The landing-page workspace is a deterministic local demo, not a live model
endpoint. The composer states this explicitly. It offers Fable 5, Opus, Sonnet,
GPT, Gemini, and Kimi as demo selections; no provider calls or new dependencies
are involved.

Three quick starts build startup, social/content, or product-launch plans. Users
can type a brief and send it with Enter (Shift+Enter inserts a newline). Follow-up
prompts support LinkedIn focus, a 30-day plan, and success metrics. Refinements
preserve the original brief and unrelated manual edits; adding metrics creates
a fifth node without duplicating it on subsequent requests.

Execution progresses through connected nodes, with a separate Activity view.
Stop cancels the run; Reset restores the initial demo. Rerunning preserves node
edits and positions. Node titles and next actions are editable. Desktop nodes
support pointer dragging and arrow-key movement, and the wires follow their
positions. Smaller layouts stack the nodes; phones switch between Copilot and
Canvas views. Escape closes the node editor and restores focus.

Reduced motion completes execution immediately and disables decorative motion.
Execution timers are cleaned up on stop, reset, and unmount. Demo state lasts for
the current page session. The export control creates a local Markdown download;
the in-app browser's automated download event did not return a saved file path,
so filesystem delivery of that export remains unverified.

## Restore the previous fourth section

The exact previous section is retained in
`src/components/illustrated/strategy-section-original.tsx`; its original artwork
and responsive CSS are unchanged. In `src/components/illustrated/home.tsx`, change
only the StrategySection import from `./strategy-section` to
`./strategy-section-original`. This restores the previous section without
reverting the hero, lead flow, careers, responsive work, or other local edits.

## Verification

- TypeScript and whitespace checks pass.
- Pure demo-engine checks cover all playbooks, combined refinements, original
  brief preservation, manual edit preservation, and metrics deduplication.
- Browser checks cover custom chat submission, quick starts, switching GPT/Opus/
  Kimi, sequential execution, Activity, Stop, Reset, a fifth connected node, node
  editing, keyboard focus restoration, pointer and keyboard movement, and reruns
  retaining edits and positions.
- Layout checked at 320, 390, 768, 1024, and 1440 pixels wide; no horizontal page
  overflow. Mobile Copilot/Canvas switching and node editing work.
- The CTA points to the existing `https://beta.cnvrted.com` app.
- No GitHub push or deployment was performed.
