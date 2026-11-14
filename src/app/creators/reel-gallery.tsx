"use client";

import { useEffect, useRef, useState } from "react";
import type { Reel } from "./creators-data";

const PLAY = <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86A1 1 0 0 0 8 5.14z" /></svg>;
const ARROW = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8" /></svg>;
const CLOSE = <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>;

/** The reels as our own cards: a self-hosted 720px poster (sharp, indexable, nothing third-party on load) with the
 *  creator and the hook on it. Clicking one plays it in a lightbox; Instagram's player loads only then. */
export function ReelGallery({ reels }: { reels: readonly Reel[] }) {
  const dlg = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState<Reel | null>(null);

  useEffect(() => {
    const d = dlg.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => { document.documentElement.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <ul className="cg-cr-reels">
        {reels.map((r) => (
          <li key={r.id}>
            <article className="cg-cr-reel">
              <button type="button" className="cg-cr-reel-play" onClick={() => setOpen(r)} aria-label={`Play “${r.title}” by @${r.handle}`}>
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
        className="cg-cr-lightbox"
        aria-label={open ? `${open.title} by @${open.handle}` : "Reel"}
        onClose={() => setOpen(null)}
        onClick={(e) => { if (e.target === e.currentTarget) setOpen(null); }}
      >
        {open && (
          <div className="cg-cr-lightbox-body">
            <button type="button" className="cg-cr-lightbox-close" onClick={() => setOpen(null)} aria-label="Close">{CLOSE}</button>
            <iframe
              src={`https://www.instagram.com/reel/${open.id}/embed/`}
              title={`${open.title} by @${open.handle} on Instagram`}
              allow="autoplay; encrypted-media; picture-in-picture; clipboard-write"
              allowFullScreen
            />
          </div>
        )}
      </dialog>
    </>
  );
}
