"use client";

import { useEffect, useRef, useState, type CSSProperties, type FocusEvent, type KeyboardEvent, type PointerEvent } from "react";
import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

/** Figma "About Us" (Cnvrted_Design, node 7662:56068): "Founding MEMBERS" with the team cards over the wordmark.
 *  The wordmark is sticky: it pins under the header while the cards rise over it, each at its own speed, and lets
 *  go once the last row has passed. The cards land exactly on the Figma layout as the section reaches the top of
 *  the screen. Photos are 3x renders of the Figma cards (crop and greyscale included). Reduced motion: no
 *  movement, the wordmark still pins.
 *  Each card flips to a back from the "Commercial 0.3" page (frames "Dhruv", "Kailash", "Anupam", "Praanesh",
 *  "Pavana", 7668:38009-38029): a one-liner, contact buttons and an illustration. */

/** An illustration on a card back. box: where it sits on the 246×277 card (Figma), img: how the picture fills
 *  that box (Figma's crop), mirror: Figma flips these art layers horizontally. */
type Art = { src: string; w: number; h: number; box: CSSProperties; img?: CSSProperties; mirror?: boolean };
type Links = { email?: string; linkedin?: string; x?: string };
type Back = { quote: string; quoteBox: CSSProperties; art: Art[]; links: Links };
/** label: the name tag's white alpha in Figma */
type Member = { name: string; role: string; photo?: string; label: number; back: Back };

const ART = "/figma/about/backs";
// quote: Bricolage 28px, vertically centred on `top` like Figma's text boxes
const quote = (left: number, top: number, width: number): CSSProperties => ({ left, top, width });

const ROWS: Member[][] = [
  [
    {
      name: "Dhruv Pradeep",
      role: "Founder & CEO",
      photo: "/figma/about/dhruv.webp",
      label: 0.44,
      back: {
        quote: "I run the orchestra",
        quoteBox: quote(20, 66, 166),
        art: [
          {
            src: `${ART}/dhruv.png`,
            w: 1024,
            h: 1024,
            box: { right: 58, bottom: 0.25, width: 150, height: 124 },
            img: { left: "0.26%", top: 0, width: "97.1%", height: "116.8%" },
          },
        ],
        links: { linkedin: "https://www.linkedin.com/in/dhruvprad/", x: "https://x.com/dhruvprad" },
      },
    },
    {
      name: "Kailas S",
      role: "Founder & CTO",
      photo: "/figma/about/kailas.webp",
      label: 0.67,
      back: {
        quote: "I took space over space",
        quoteBox: quote(20, 66, 216),
        art: [
          {
            src: `${ART}/kailas-wall.png`,
            w: 1024,
            h: 1024,
            box: { inset: "59.73% 0.1% -8.64% 45.12%" },
            img: { left: "0.95%", top: "4.82%", width: "95.45%", height: "95.18%" },
            mirror: true,
          },
          {
            src: `${ART}/kailas-toys.png`,
            w: 771,
            h: 492,
            box: { inset: "82.05% 16.11% -1.34% 49.98%" },
            img: { left: "0.74%", top: "0.57%", width: "98.88%", height: "98.74%" },
            mirror: true,
          },
        ],
        links: { linkedin: "https://www.linkedin.com/in/kailas-krsna-s-a7855334a/", x: "https://x.com/kailaskrsna" },
      },
    },
  ],
  [
    {
      name: "Anupam Bagchi",
      role: "Designer",
      photo: "/figma/about/anupam.webp",
      label: 0.7,
      back: {
        quote: "Talk shit and design",
        quoteBox: quote(20, 66, 166),
        art: [{ src: `${ART}/anupam.png`, w: 1024, h: 1024, box: { left: 52, top: 141.75, width: 142, height: 142 }, mirror: true }],
        links: {},
      },
    },
    {
      name: "Praanesh",
      role: "Developer",
      photo: "/figma/about/praanesh.webp",
      label: 0.67,
      back: {
        quote: "More than\na vibe coder",
        quoteBox: quote(22, 56.75, 192),
        art: [
          { src: `${ART}/praanesh.png`, w: 1024, h: 1024, box: { left: 58, top: 154.75, width: 129, height: 130 }, mirror: true },
        ],
        links: {},
      },
    },
    {
      name: "Pavana H",
      role: "Media Manager",
      photo: "/figma/about/pavana-h.webp",
      label: 0.67,
      back: {
        quote: "Reel scrolling is my work",
        quoteBox: quote(19, 66, 181),
        art: [
          {
            src: `${ART}/pavana.png`,
            w: 1024,
            h: 1280,
            box: { left: "calc(50% + 0.5px)", top: 151.75, width: 113, height: 125, translate: "-50% 0" },
            img: { left: 0, top: "-0.5%", width: "100%", height: "113%" },
            mirror: true,
          },
        ],
        links: {},
      },
    },
  ],
];

// px each card is below its Figma spot when the section enters, and above it when the section leaves
const ENTER = [[140, 260], [360, 220, 420]];
const LEAVE = [[-60, -140], [-200, -90, -260]];

function useCardY(enter: MotionValue<number>, leave: MotionValue<number>, from: number, to: number) {
  const y = useTransform([enter, leave], ([e, l]: number[]) => from * (1 - e) + to * l);
  return useSpring(y, { stiffness: 140, damping: 26, mass: 0.4 });
}

const TILT = { stiffness: 220, damping: 20, mass: 0.5 };
const REVEAL = { stiffness: 90, damping: 22, mass: 0.6 };
const FLIP = { type: "spring", stiffness: 120, damping: 17, mass: 0.9 } as const;

const LINKS: { key: keyof Links; label: string; icon: string; href: (v: string) => string }[] = [
  { key: "email", label: "Email", icon: `${ART}/envelope.svg`, href: (v) => `mailto:${v}` },
  { key: "linkedin", label: "LinkedIn", icon: `${ART}/linkedin.svg`, href: (v) => v },
  { key: "x", label: "X", icon: `${ART}/x.svg`, href: (v) => v },
];

// When the page last scrolled (AboutMembers keeps it current). The cards ride the scroll at different speeds, so
// while the page moves they slide under a mouse that hasn't moved, and the browser reports that as the pointer
// entering them: without this, scrolling past the section with the mouse over it flipped cards nobody pointed at.
let lastScroll = -Infinity;
const SCROLL_QUIET_MS = 300;
const scrolling = () => performance.now() - lastScroll < SCROLL_QUIET_MS;

const GLOW = { stiffness: 70, damping: 18, mass: 0.6 };
const GLOW_TRAIL = { stiffness: 28, damping: 14, mass: 0.9 };

/** Dark colour wash behind the back's content, steered by the cursor (px/py: 0-1 across the card): deep indigo
 *  follows it, teal sits opposite, and magenta trails behind on a slower spring, so the colours swirl as the mouse
 *  moves. Without a mouse it rests in its starting layout. */
function BackGlow({ px, py }: { px: MotionValue<number>; py: MotionValue<number> }) {
  const sx = useSpring(px, GLOW);
  const sy = useSpring(py, GLOW);
  const tx = useSpring(px, GLOW_TRAIL);
  const ty = useSpring(py, GLOW_TRAIL);
  const ix = useTransform(sx, (v) => 15 + v * 70);
  const iy = useTransform(sy, (v) => 10 + v * 80);
  const cx = useTransform(sx, (v) => 85 - v * 70);
  const cy = useTransform(sy, (v) => 95 - v * 70);
  const mx = useTransform(tx, (v) => 30 + v * 50);
  const my = useTransform(ty, (v) => 60 + v * 40);
  const background = useMotionTemplate`
    radial-gradient(70% 60% at ${ix}% ${iy}%, rgb(79 70 229 / 0.55), transparent 70%),
    radial-gradient(65% 55% at ${cx}% ${cy}%, rgb(13 148 136 / 0.35), transparent 70%),
    radial-gradient(60% 50% at ${mx}% ${my}%, rgb(190 24 93 / 0.3), transparent 70%)`;
  return <motion.div className="about-member-glow" style={{ background }} aria-hidden="true" />;
}

function CardBack({
  member,
  open,
  px,
  py,
}: {
  member: Member;
  open: boolean;
  px: MotionValue<number>;
  py: MotionValue<number>;
}) {
  const { quote, quoteBox, art, links } = member.back;
  const first = member.name.split(" ")[0];
  const buttons = LINKS.filter((l) => links[l.key]);
  return (
    <div className="about-member-face about-member-back" aria-hidden={!open}>
      <BackGlow px={px} py={py} />
      {art.map((a) => (
        <div className="about-member-art" key={a.src} style={{ ...a.box, ...(a.mirror ? { scale: "-1 1" } : null) }}>
          <Image
            src={a.src}
            alt=""
            width={a.w}
            height={a.h}
            sizes="160px"
            style={a.img ?? { inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      ))}
      <p className="about-member-quote" style={quoteBox}>
        {quote}
      </p>
      {buttons.length > 0 && (
        <div className="about-member-links">
          {buttons.map((l) => (
            <a
              key={l.key}
              href={l.href(links[l.key]!)}
              aria-label={`${first} on ${l.label}`}
              tabIndex={open ? 0 : -1}
              {...(l.key === "email" ? {} : { target: "_blank", rel: "noopener noreferrer" })}
            >
              <Image src={l.icon} alt="" width={24} height={24} unoptimized />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

/** One face card, two-sided. The front is liquid glass: the photo refracts at the edges (the #member-glass
 *  filter) under a lit glass rim. The back is the dark Figma card. The outer article carries the scroll parallax;
 *  the inner card does the rest:
 *  - reveal (tied to scroll, so it reverses on the way back up): the front starts as a heavily frosted pane, and
 *    as it rises into place the photo sharpens, fades up to full and settles from a slight zoom, the frost thins
 *    out and the name tag rises in
 *  - flip: hovering with a mouse turns the card over; touch flips it on tap, keyboard on Enter/Space (the card
 *    is focusable and turns back once focus leaves it). A card that arrives under a still mouse because the page
 *    scrolled waits for the mouse to actually move.
 *  The pointer is read on the outer article, which never tilts: read on the tilting card, the card's own lean
 *  moved its edges (and its measured box) under the cursor, so near an edge it flipped back and forth.
 *  - tilt (mouse only): the card leans toward the cursor while it's turned over, and the back's dark colour
 *    wash (BackGlow) swirls after it
 *  Reduced motion: the finished front, and the flip swaps sides without turning. */
function MemberCard({ member, y, still }: { member: Member; y: MotionValue<number>; still: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpenState] = useState(false);
  // A resting, unflipped card is drawn flat with no back at all: 3D (and the back) only switch on while the card
  // is turned over or turning back. Drawing the resting card in 3D left a hairline along its edge on some
  // pixel positions. The front is never hidden: hiding it made the card vanish while turning back.
  const [returning, setReturning] = useState(false);
  const openRef = useRef(false);
  function setOpen(next: boolean | ((o: boolean) => boolean)) {
    const n = typeof next === "function" ? next(openRef.current) : next;
    if (n === openRef.current) return;
    openRef.current = n;
    if (!n) setReturning(true);
    setOpenState(n);
  }
  // 0 → 1 while the card's top travels from the bottom of the screen to 70% of the way down it
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.7"] });
  const p = useSpring(scrollYProgress, REVEAL);
  const blur = useTransform(p, [0, 1], [18, 0]);
  const photoFilter = useMotionTemplate`url(#member-glass) blur(${blur}px) saturate(0.9)`;
  const photoOpacity = useTransform(p, [0, 1], [0.2, 1]);
  const photoScale = useTransform(p, [0, 1], [1.12, 1]);
  const frost = useTransform(p, [0, 1], [1, 0]);
  const labelOpacity = useTransform(p, [0.55, 1], [0, 1]);
  const labelY = useTransform(p, [0.55, 1], [12, 0]);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [7, -7]), TILT);
  const rotateY = useSpring(useTransform(px, [0, 1], [-9, 9]), TILT);

  function onEnter(e: PointerEvent<HTMLElement>) {
    if (e.pointerType === "mouse" && !scrolling()) setOpen(true);
  }
  function onMove(e: PointerEvent<HTMLElement>) {
    if (e.pointerType !== "mouse") return;
    // entered while the page was scrolling: turn over once the mouse itself moves
    if (!openRef.current) {
      if (scrolling() || (!e.movementX && !e.movementY)) return;
      setOpen(true);
    }
    if (still) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  }
  function onLeave(e: PointerEvent<HTMLElement>) {
    px.set(0.5);
    py.set(0.5);
    if (e.pointerType === "mouse") setOpen(false);
  }
  function onTap(e: PointerEvent<HTMLElement>) {
    // a tap on one of the back's links should follow the link, not turn the card over
    if (e.pointerType !== "mouse" && !(e.target as HTMLElement).closest("a")) setOpen((o) => !o);
  }
  function onKey(e: KeyboardEvent<HTMLDivElement>) {
    if (e.target !== e.currentTarget || (e.key !== "Enter" && e.key !== " ")) return;
    e.preventDefault();
    setOpen((o) => !o);
  }
  function onBlur(e: FocusEvent<HTMLDivElement>) {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false);
  }

  return (
    <motion.article
      ref={ref}
      className="about-member"
      data-open={open || undefined}
      style={still ? undefined : { y }}
      onPointerEnter={onEnter}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      onPointerUp={onTap}
    >
      <motion.div
        className="about-member-card"
        data-3d={open || returning || undefined}
        role="button"
        tabIndex={0}
        aria-label={`${member.name}, ${member.role}. Press Enter to ${open ? "show the photo" : "see more"}.`}
        onKeyDown={onKey}
        onBlur={onBlur}
        style={still ? undefined : { rotateX, rotateY }}
      >
        <motion.div
          className="about-member-flip"
          onAnimationComplete={(done) => {
            // a turn that's cut short also reports as complete, with its own target: only the turn back to the
            // front (rotateY 0) ends the 3D phase
            const target = (done as { rotateY?: number } | undefined)?.rotateY;
            if (target === 0 && !openRef.current) setReturning(false);
          }}
          initial={false}
          animate={{ rotateY: open ? 180 : 0 }}
          transition={still ? { duration: 0 } : FLIP}
        >
          <div className="about-member-face about-member-front" aria-hidden={open}>
            {member.photo && (
              <motion.div
                className="about-member-photo"
                style={still ? undefined : { filter: photoFilter, opacity: photoOpacity, scale: photoScale }}
              >
                <Image src={member.photo} alt="" width={738} height={829} sizes="246px" quality={95} />
              </motion.div>
            )}
            {!still && <motion.div className="about-member-frost" style={{ opacity: frost }} aria-hidden="true" />}
            <div className="about-member-sheen" aria-hidden="true" />
            <motion.div
              className="about-member-label"
              style={{
                backgroundColor: `rgb(255 255 255 / ${member.label})`,
                ...(still ? {} : { opacity: labelOpacity, y: labelY }),
              }}
            >
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </motion.div>
          </div>
          <CardBack member={member} open={open} px={px} py={py} />
        </motion.div>
      </motion.div>
    </motion.article>
  );
}

export function AboutMembers() {
  const ref = useRef<HTMLElement>(null);
  const still = useReducedMotion();
  useEffect(() => {
    const onScroll = () => { lastScroll = performance.now(); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  // 0 → 1 while the section's top travels from the bottom of the screen to the top
  const { scrollYProgress: enter } = useScroll({ target: ref, offset: ["start end", "start start"] });
  // 0 → 1 while the rest of the section scrolls past
  const { scrollYProgress: leave } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const y = [
    [useCardY(enter, leave, ENTER[0][0], LEAVE[0][0]), useCardY(enter, leave, ENTER[0][1], LEAVE[0][1])],
    [
      useCardY(enter, leave, ENTER[1][0], LEAVE[1][0]),
      useCardY(enter, leave, ENTER[1][1], LEAVE[1][1]),
      useCardY(enter, leave, ENTER[1][2], LEAVE[1][2]),
    ],
  ];
  // the wordmark eases back a touch as the cards cover it
  const wordScale = useTransform(leave, [0, 0.6], [1, 0.94]);
  const wordOpacity = useTransform(leave, [0, 0.6], [1, 0.55]);

  return (
    <section ref={ref} id="team" className="about-members" aria-labelledby="members-title">
      {/* Liquid glass refraction for the card photos: glass-map.png (card-sized) is neutral in the middle and,
          over the outer 32px of each edge, shifts the photo inward on a bevel-shaped curve, so the picture bends
          at the rim like it's seen through a thick slab of glass. R = x shift, G = y shift. */}
      <svg className="about-members-defs" width="0" height="0" aria-hidden="true" focusable="false">
        <filter
          id="member-glass"
          x="0"
          y="0"
          width="1"
          height="1"
          primitiveUnits="objectBoundingBox"
          colorInterpolationFilters="sRGB"
        >
          <feImage href="/figma/about/glass-map.png" x="0" y="0" width="1" height="1" preserveAspectRatio="none" result="map" />
          <feDisplacementMap in="SourceGraphic" in2="map" scale="0.1" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      <div className="about-members-pin">
        <motion.div className="about-members-word" style={still ? undefined : { scale: wordScale, opacity: wordOpacity }}>
          <h2 id="members-title">
            Founding<span className="sr-only"> members</span>
          </h2>
          <Image src="/figma/about/members.svg" width={1153} height={166.108} alt="" aria-hidden="true" unoptimized />
        </motion.div>
      </div>
      <div className="about-members-cards">
        {ROWS.map((row, r) => (
          <div className={`about-members-row about-members-row-${r + 1}`} key={r}>
            {row.map((member, i) => (
              <MemberCard key={member.name} member={member} y={y[r][i]} still={!!still} />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
