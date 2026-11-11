"use client";

import { useEffect, useRef, type ComponentType, type ReactNode, type RefAttributes } from "react";
import InkSplashRevealJs from "./InkSplashReveal";

type Handle = { play(): void };
// InkSplashReveal is plain JS; give it the props used here.
const InkSplashReveal = InkSplashRevealJs as unknown as ComponentType<{ children: ReactNode; className?: string; threshold?: number; zoomFrom?: number } & RefAttributes<Handle>>;

/** Scroll distance before the ink starts: the second wheel notch, whatever the window height. */
const AFTER_PX = 160;

/** The full-width app window. The ink waits until the reader has scrolled a little way in, not merely until the
 *  section is on screen (on a tall window it is visible on load). */
export function SplashWindow({ children }: { children: ReactNode }) {
  const ref = useRef<Handle>(null);
  useEffect(() => {
    let done = false;
    const check = () => {
      if (done || window.scrollY < AFTER_PX) return;
      done = true;
      ref.current?.play();
      window.removeEventListener("scroll", check);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);
  // threshold 0.9: the component's own trigger only fires if the page is jumped far past the window
  return <InkSplashReveal ref={ref} className="cg-splash" threshold={0.9} zoomFrom={1.06}>{children}</InkSplashReveal>;
}
