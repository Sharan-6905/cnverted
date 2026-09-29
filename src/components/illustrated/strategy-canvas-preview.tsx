"use client";

import {
  useLayoutEffect,
  useRef,
  useState,
  type FormEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
import { homepageCanvasAssets } from "./homepage-canvas-assets";

const art = homepageCanvasAssets.gtm;
const models = ["GPT.4.0", "Sonnet", "Opus", "Gemini"];

function Icon({ asset }: { asset: { src: string; width: number; height: number } }) {
  return <img {...asset} alt="" draggable={false} />;
}

export function StrategyCanvasPreview({ children }: { children: ReactNode }) {
  const viewport = useRef<HTMLDivElement>(null);
  const pendingCenter = useRef<{ x: number; y: number } | null>(null);
  const drag = useRef<{ x: number; y: number; left: number; top: number } | null>(null);
  const [fit, setFit] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [model, setModel] = useState(models[0]);
  const [prompt, setPrompt] = useState("");
  const [briefs, setBriefs] = useState<{ text: string; model: string }[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [saved, setSaved] = useState(false);

  useLayoutEffect(() => {
    const element = viewport.current;
    if (!element) return;
    const resize = () => setFit(element.clientWidth / 883);
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    const element = viewport.current;
    const center = pendingCenter.current;
    if (!element || !center) return;
    element.scrollLeft = center.x * fit * zoom - element.clientWidth / 2;
    element.scrollTop = center.y * fit * zoom - element.clientHeight / 2;
    pendingCenter.current = null;
  }, [zoom, fit]);

  function changeZoom(next: number) {
    const element = viewport.current;
    if (!element) return;
    pendingCenter.current = {
      x: (element.scrollLeft + element.clientWidth / 2) / (fit * zoom),
      y: (element.scrollTop + element.clientHeight / 2) / (fit * zoom),
    };
    setZoom(Math.max(1, Math.min(3, next)));
  }

  function startPan(event: PointerEvent<HTMLDivElement>) {
    if (zoom === 1 || event.pointerType !== "mouse" || event.button !== 0) return;
    drag.current = {
      x: event.clientX, y: event.clientY,
      left: event.currentTarget.scrollLeft, top: event.currentTarget.scrollTop,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function pan(event: PointerEvent<HTMLDivElement>) {
    if (!drag.current) return;
    event.currentTarget.scrollLeft = drag.current.left + drag.current.x - event.clientX;
    event.currentTarget.scrollTop = drag.current.top + drag.current.y - event.clientY;
  }

  function saveBrief(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!prompt.trim()) return;
    setBriefs((previous) => [{ text: prompt.trim(), model }, ...previous].slice(0, 10));
    setSaved(true);
    setShowHistory(false);
  }

  return (
    <div className="strategy-canvas-preview" aria-label="GTM strategy canvas preview">
      <aside className="strategy-preview-sidebar" aria-label="Strategy brief">
        {showHistory && (
          <div className="strategy-preview-history" id="strategy-brief-history">
            <strong>Your briefs</strong>
            <p>Saved in this preview session.</p>
            {briefs.length ? briefs.map((brief, index) => (
              <button type="button" key={index} onClick={() => {
                setPrompt(brief.text); setModel(brief.model); setSaved(false); setShowHistory(false);
              }}>
                <span>{brief.text}</span><small>{brief.model}</small>
              </button>
            )) : <p>Your submitted briefs will appear here.</p>}
          </div>
        )}
        {saved && !showHistory && (
          <div className="strategy-preview-handoff" role="status">
            <strong>Your brief is ready.</strong>
            <p>This canvas shows a sample strategy. Open your workspace to generate your own.</p>
            <a href="https://beta.cnvrted.com" target="_blank" rel="noopener noreferrer">Open Cnvrted ↗</a>
          </div>
        )}
        <form className="strategy-preview-composer" onSubmit={saveBrief}>
          <label className="sr-only" htmlFor="strategy-preview-prompt">Describe your go-to-market strategy</label>
          <textarea id="strategy-preview-prompt" placeholder="Enter here..." value={prompt} maxLength={2000}
            onChange={(event) => { setPrompt(event.target.value); setSaved(false); }} />
          <div className="strategy-preview-toolbar">
            <label className="strategy-preview-model">
              <Icon asset={art.imgIcon6} />
              <span>{model}</span>
              <Icon asset={art.imgIcon7} />
              <select aria-label="Preferred AI model" value={model} onChange={(event) => setModel(event.target.value)}>
                {models.map((name) => <option key={name}>{name}</option>)}
              </select>
            </label>
            <button type="button" className="strategy-preview-history-button" aria-expanded={showHistory}
              aria-controls="strategy-brief-history" onClick={() => setShowHistory(!showHistory)}>
              <Icon asset={art.imgClockCounterClockwise} /><span>History</span>
            </button>
            <button type="submit" className="strategy-preview-send" aria-label="Prepare strategy brief" disabled={!prompt.trim()}>
              <Icon asset={art.imgPaperPlaneTilt} />
            </button>
          </div>
        </form>
      </aside>
      <div className="strategy-preview-workspace">
        <div ref={viewport} className="strategy-preview-viewport" tabIndex={0}
          aria-label="Sample strategy graph. Use the zoom buttons to explore, then drag or scroll to pan."
          data-zoomed={zoom > 1} onPointerDown={startPan} onPointerMove={pan}
          onPointerUp={() => { drag.current = null; }} onPointerCancel={() => { drag.current = null; }}
          onLostPointerCapture={() => { drag.current = null; }}>
          <div className="strategy-preview-extent" style={{ width: 883 * fit * zoom, height: 677 * fit * zoom }}>
            <div className="strategy-preview-scene" style={{ transform: `scale(${fit * zoom})` }}>
              {children}
            </div>
          </div>
        </div>
        <div className="strategy-preview-zoom" aria-label="Canvas zoom controls">
          <button type="button" aria-label="Zoom in on strategy" disabled={zoom >= 3} onClick={() => changeZoom(zoom + 0.5)}>
            <Icon asset={art.imgPlus} />
          </button>
          <button type="button" aria-label="Zoom out on strategy" disabled={zoom <= 1} onClick={() => changeZoom(zoom - 0.5)}>
            <Icon asset={art.imgMinus} />
          </button>
          {zoom > 1 && <button type="button" className="strategy-preview-fit" onClick={() => changeZoom(1)}>Fit</button>}
          <output className="sr-only" aria-live="polite">Canvas zoom {Math.round(zoom * 100)}%</output>
        </div>
      </div>
    </div>
  );
}
