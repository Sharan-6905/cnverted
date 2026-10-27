"use client";

import { useEffect, useRef } from "react";
import { productTourMarkup } from "./product-tour-markup";
import { mountProductTour } from "./product-tour-engine";
import "./product-tour.css";

/** Isolate the supplied DOM animation from React's reconciliation. */
export function ProductTour() {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    element.innerHTML = productTourMarkup;
    const root = element.querySelector<HTMLElement>("#cnv-motion");
    if (!root) return;
    const cleanup = mountProductTour(root);
    return () => {
      cleanup();
      element.replaceChildren();
    };
  }, []);

  return <div className="product-tour" ref={host} aria-label="Illustrative Cnvrted product tour" />;
}
