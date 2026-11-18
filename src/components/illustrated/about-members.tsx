"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";

/** Figma "About Us" (Cnvrted_Design, node 7662:56068): "Founding MEMBERS" with the team cards over the wordmark.
 *  The wordmark is sticky: it pins under the header while the cards rise over it, each at its own speed, and lets
 *  go once the last row has passed. The cards land exactly on the Figma layout as the section reaches the top of
 *  the screen. Photos are 3x renders of the Figma cards (crop and greyscale included). Reduced motion: no
 *  movement, the wordmark still pins. */
/** label: the name tag's white alpha in Figma */
type Member = { name: string; role: string; photo?: string; label: number };

const ROWS: Member[][] = [
  [
    { name: "Dhruv Pradeep", role: "Founder & CEO", photo: "/figma/about/dhruv.webp", label: 0.44 },
    { name: "Kailas S", role: "Founder & CTO", photo: "/figma/about/kailas.webp", label: 0.67 },
  ],
  [
    { name: "Anupam Bagchi", role: "Designer", photo: "/figma/about/anupam.webp", label: 0.7 },
    { name: "Praanesh", role: "Developer", photo: "/figma/about/praanesh.webp", label: 0.67 },
    { name: "Pavana H", role: "Media Manager", label: 0.67 },
  ],
];

// px each card is below its Figma spot when the section enters, and above it when the section leaves
const ENTER = [[140, 260], [360, 220, 420]];
const LEAVE = [[-60, -140], [-200, -90, -260]];

function useCardY(enter: MotionValue<number>, leave: MotionValue<number>, from: number, to: number) {
  const y = useTransform([enter, leave], ([e, l]: number[]) => from * (1 - e) + to * l);
  return useSpring(y, { stiffness: 140, damping: 26, mass: 0.4 });
}

export function AboutMembers() {
  const ref = useRef<HTMLElement>(null);
  const still = useReducedMotion();
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
              <motion.article className="about-member" key={member.name} style={still ? undefined : { y: y[r][i] }}>
                {member.photo && (
                  <Image src={member.photo} alt="" width={738} height={829} sizes="246px" quality={95} />
                )}
                <div className="about-member-label" style={{ backgroundColor: `rgb(255 255 255 / ${member.label})` }}>
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                </div>
              </motion.article>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
