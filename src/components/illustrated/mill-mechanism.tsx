"use client";

import { useId, type CSSProperties } from "react";

const TOWER = "/figma/windmill-tower.png";

/** Unproject an elliptical face, rotate its original texture, then project it
 * back into place. The silhouette, bearings and timber frame never move. */
function TurningFace({
  id,
  x,
  y,
  radius,
  depth,
  seconds,
  reverse = false,
  shaft = 0,
}: {
  id: string;
  x: number;
  y: number;
  radius: number;
  depth: number;
  seconds: number;
  reverse?: boolean;
  shaft?: number;
}) {
  return (
    <svg
      x={x - radius}
      y={y - depth}
      width={radius * 2}
      height={depth * 2}
      viewBox={`0 0 ${radius * 2} ${radius * 2}`}
      preserveAspectRatio="none"
      overflow="hidden"
    >
      <defs>
        <mask
          id={id}
          maskUnits="userSpaceOnUse"
          x={0}
          y={0}
          width={radius * 2}
          height={radius * 2}
        >
          <circle cx={radius} cy={radius} r={radius} fill="white" />
          {shaft > 0 && (
            <rect
              x={radius - shaft / 2}
              y={0}
              width={shaft}
              height={radius * 2}
              fill="black"
            />
          )}
        </mask>
      </defs>
      <g mask={`url(#${id})`}>
        <g
          className="mill-turning-face"
          style={
            {
              "--mill-period": `${seconds}s`,
              animationDirection: reverse ? "reverse" : "normal",
            } as CSSProperties
          }
        >
          <image
            href={TOWER}
            x={radius - x}
            y={radius - (y * radius) / depth}
            width={1240}
            height={(1268 * radius) / depth}
            preserveAspectRatio="none"
          />
        </g>
      </g>
    </svg>
  );
}

export function MillMechanism() {
  const id = useId().replaceAll(":", "");
  return (
    <svg
      className="mill-mechanism"
      viewBox="0 0 1240 1268"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <clipPath id={`${id}-shaft`}>
          <path d="M680 605H701V675H680ZM683 691H703V713H683ZM684 782H704V805H684Z" />
        </clipPath>
        <clipPath id={`${id}-grain`}>
          <path d="M677 881H714L726 918H670Z" />
        </clipPath>
        <linearGradient id={`${id}-wood`}>
          <stop stopColor="#352617" stopOpacity=".48" />
          <stop offset=".48" stopColor="#f1d5a0" stopOpacity=".5" />
          <stop offset="1" stopColor="#352617" stopOpacity=".48" />
        </linearGradient>
      </defs>
      <TurningFace
        id={`${id}-crown`}
        x={682}
        y={542}
        radius={37}
        depth={8}
        seconds={24}
        shaft={21}
        reverse
      />
      <TurningFace
        id={`${id}-wheel`}
        x={686}
        y={766}
        radius={85}
        depth={17}
        seconds={12}
        shaft={28}
      />
      <TurningFace
        id={`${id}-stone`}
        x={704}
        y={922}
        radius={54}
        depth={11}
        seconds={6}
        reverse
      />
      <g clipPath={`url(#${id}-shaft)`}>
        <g className="mill-shaft-grain">
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect
                x={658 + i * 22}
                y="600"
                width="22"
                height="210"
                fill={`url(#${id}-wood)`}
              />
              <path
                d={`M${662 + i * 22} 605q2 29 0 61t0 65t1 75`}
                stroke="#513723"
                strokeWidth=".9"
                opacity=".5"
              />
            </g>
          ))}
        </g>
      </g>
      <g clipPath={`url(#${id}-grain)`}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path
            key={i}
            className="mill-grain"
            d={`M${688 + (i % 3) * 5} ${880 - (i % 2) * 3}l${i % 2 ? 1 : -1} 3`}
            stroke={i % 2 ? "#d9b981" : "#927347"}
            strokeWidth="2"
            strokeLinecap="round"
            style={{ animationDelay: `${-i * 0.14}s` }}
          />
        ))}
      </g>
    </svg>
  );
}
