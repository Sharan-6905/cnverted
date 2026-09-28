"use client";

import { useLayoutEffect, useRef, type CSSProperties } from "react";

type SignalRoute = {
  id: string;
  d: string;
  startsAt?: number;
  arrivesAt?: number;
  width?: number;
};

type SignalTiming = {
  speed: number;
  cycle: number;
  packetLength: number;
};

/** Travel is measured in SVG units, so a packet keeps its size and speed on bends. */
export function SignalWires({
  source,
  width,
  height,
  routes,
  timing,
}: {
  source: string;
  width: number;
  height: number;
  routes: SignalRoute[];
  timing: SignalTiming;
}) {
  const root = useRef<SVGSVGElement>(null);
  const pitch = timing.speed * timing.cycle;

  useLayoutEffect(() => {
    const svg = root.current;
    if (!svg) return;
    const groups = svg.querySelectorAll<SVGGElement>("[data-signal-route]");
    groups.forEach((group, index) => {
      const path = group.querySelector<SVGPathElement>("path");
      if (!path) return;
      const distance = path.getTotalLength();
      const route = routes[index];
      // All inputs reach the node together; the output waits for their tails.
      const launch =
        route.arrivesAt === undefined
          ? (route.startsAt ?? 0)
          : route.arrivesAt - distance / timing.speed;
      group.style.setProperty("--signal-delay", `${launch}s`);
      group.style.setProperty("--signal-rest", `${-distance * 0.45}`);
      group.dataset.signalDistance = distance.toFixed(3);
      group.dataset.signalLaunch = launch.toFixed(3);
    });
    svg.dataset.ready = "true";
  }, [routes, timing.speed]);

  return (
    <svg
      ref={root}
      className="design-signal-wires"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
      style={
        {
          "--signal-cycle": `${timing.cycle}s`,
          "--signal-packet": timing.packetLength,
          "--signal-gap": pitch - timing.packetLength,
          "--signal-end": timing.packetLength - pitch,
        } as CSSProperties
      }
    >
      <image href={source} width={width} height={height} />
      {routes.map((route) => (
        <g
          key={route.id}
          data-signal-route={route.id}
          style={
            {
              "--signal-width": route.width ?? 4,
            } as CSSProperties
          }
        >
          <path
            className="design-signal-pulse design-signal-glow"
            d={route.d}
          />
          <path className="design-signal-pulse" d={route.d} />
        </g>
      ))}
    </svg>
  );
}
