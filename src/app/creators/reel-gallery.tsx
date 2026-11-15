"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Reel } from "./creators-data";

const PLAY = <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86A1 1 0 0 0 8 5.14z" /></svg>;
const ARROW = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8" /></svg>;
const CLOSE = <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>;
const CHEVRON = (dir: "l" | "r") => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={dir === "l" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} /></svg>;

/** The reels as our own cards: a self-hosted 720px poster (sharp, indexable, nothing third-party on load) with the
 *  hook and creator under it. Clicking one plays it in a lightbox; Instagram's player loads only then.
 *
 *  Lightbox controls sit on the player, not the screen edges: close in the header right above the video, prev/next
 *  beside it (under it on phones), plus Esc, ←/→ and a click on the backdrop. */
export function ReelGallery({ reels }: { reels: readonly Reel[] }) {
  const dlg = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const [index, setIndex] = useState<number | null>(null);
  const reel = index === null ? null : reels[index];
  const many = reels.length > 1;

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback((by: number) => setIndex((i) => (i === null ? i : (i + by + reels.length) % reels.length)), [reels.length]);

  useEffect(() => {
    const d = dlg.current;
    if (!d) return;
    if (index !== null && !d.open) d.showModal();
    if (index === null && d.open) { d.close(); opener.current?.focus(); }
    document.documentElement.style.overflow = index !== null ? "hidden" : "";
    return () => { document.documentElement.style.overflow = ""; };
  }, [index]);

  useEffect(() => {
    if (index === null || !many) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
      if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, many, step]);

  return (
    <>
      <ul className="cg-cr-reels">
        {reels.map((r, i) => (
          <li key={r.id}>
            <article className="cg-cr-reel">
              <button type="button" className="cg-cr-reel-play" aria-label={`Play “${r.title}” by @${r.handle}`}
                onClick={(e) => { opener.current = e.currentTarget; setIndex(i); }}>
                <img src={r.poster} alt={r.alt} width={720} height={1280} loading="lazy" decoding="async" />
                <span className="cg-cr-reel-btn" aria-hidden="true">{PLAY}</span>
              </button>
              <div className="cg-cr-reel-meta">
                <h3>{r.title}</h3>
                <p>{r.summary}</p>
                <div className="cg-cr-reel-foot">
                  <span>@{r.handle}</span>
                  <a href={`https://www.instagram.com/reel/${r.id}/`} target="_blank" rel="noopener noreferrer">Instagram{ARROW}</a>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>

      <dialog
        ref={dlg}
        className="cg-cr-lb"
        aria-labelledby="cg-cr-lb-title"
        onCancel={(e) => { e.preventDefault(); close(); }}
        onClick={(e) => { if (e.target === e.currentTarget) close(); }}
      >
        {reel && index !== null && (
          <div className="cg-cr-lb-stage" onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
            <div className="cg-cr-lb-col">
              <header className="cg-cr-lb-head">
                <div>
                  <p id="cg-cr-lb-title">{reel.title}</p>
                  <span>@{reel.handle}</span>
                </div>
                <button type="button" className="cg-cr-lb-close" onClick={close} aria-label="Close video" autoFocus>{CLOSE}</button>
              </header>

              <div className="cg-cr-lb-player">
                <iframe
                  key={reel.id}
                  src={`https://www.instagram.com/reel/${reel.id}/embed/`}
                  title={`${reel.title} by @${reel.handle} on Instagram`}
                  allow="autoplay; encrypted-media; picture-in-picture; clipboard-write"
                  allowFullScreen
                />
                {many && (
                  <>
                    <button type="button" className="cg-cr-lb-nav cg-cr-lb-nav--prev" onClick={() => step(-1)} aria-label="Previous reel">{CHEVRON("l")}</button>
                    <button type="button" className="cg-cr-lb-nav cg-cr-lb-nav--next" onClick={() => step(1)} aria-label="Next reel">{CHEVRON("r")}</button>
                  </>
                )}
              </div>

              <footer className="cg-cr-lb-foot">
                {many && <span className="cg-cr-lb-count" aria-live="polite">{index + 1} / {reels.length}</span>}
                <a href={`https://www.instagram.com/reel/${reel.id}/`} target="_blank" rel="noopener noreferrer">Open on Instagram{ARROW}</a>
              </footer>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
