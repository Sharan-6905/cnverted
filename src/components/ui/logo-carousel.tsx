"use client"

import React, { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

/**
 * Columns of logos that each swap every 2s, staggered by column, with a blur/slide swap.
 *
 * Changed from the upstream component:
 * - `img` can also be an image URL (our client logos are PNG/SVG files in /public, not inline SVG components); an
 *   image logo gets real alt text from `name`.
 * - No repeats on screen. Upstream gave each column its own shuffled list (padded with random picks), so two columns
 *   could show the same logo at once. Now all columns draw from one shared deck: a swapping column takes the
 *   logo at the front of the deck (never one on screen) and puts its old one at the back, so every logo gets equal
 *   time. Column count is capped at the number of logos.
 */
export interface Logo {
  name: string
  id: number
  img: React.ComponentType<React.SVGProps<SVGSVGElement>> | string
}

const CYCLE_MS = 2000
const COLUMN_STAGGER_MS = 200
const TICK_MS = 100

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

interface LogoColumnProps {
  logo: Logo
  index: number
}

const LogoColumn: React.FC<LogoColumnProps> = React.memo(({ logo, index }) => {
  const Img = logo.img

  return (
    <motion.div
      className="relative h-20 w-24 overflow-hidden sm:w-32 md:h-32 md:w-60"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.1,
        duration: 0.5,
        ease: "easeOut",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={logo.id}
          className="absolute inset-0 flex items-center justify-center"
          initial={{ y: "10%", opacity: 0, filter: "blur(8px)" }}
          animate={{
            y: "0%",
            opacity: 1,
            filter: "blur(0px)",
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 20,
              mass: 1,
              bounce: 0.2,
              duration: 0.5,
            },
          }}
          exit={{
            y: "-20%",
            opacity: 0,
            filter: "blur(6px)",
            transition: {
              type: "tween",
              ease: "easeIn",
              duration: 0.3,
            },
          }}
        >
          {typeof Img === "string" ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={Img}
              alt={logo.name ? `${logo.name} logo` : "Client logo"}
              className="max-h-[80%] max-w-[92%] object-contain"
              draggable={false}
            />
          ) : (
            <Img className="h-20 w-20 max-h-[80%] max-w-[80%] object-contain md:h-32 md:w-32" />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
})
LogoColumn.displayName = "LogoColumn"

interface LogoCarouselProps {
  columnCount?: number
  logos: Logo[]
}

export function LogoCarousel({ columnCount = 2, logos }: LogoCarouselProps) {
  const cols = Math.max(0, Math.min(columnCount, logos.length))
  const [shown, setShown] = useState<Logo[]>([])
  const shownRef = useRef<Logo[]>([])

  useEffect(() => {
    // shuffled on the client only, so server and first client render agree (both empty)
    const deck = shuffleArray(logos)
    const first = deck.slice(0, cols)
    const queue = deck.slice(cols) // never holds a logo that's on screen
    const steps = Array<number>(cols).fill(0)
    shownRef.current = first
    setShown(first)

    let elapsed = 0
    const id = setInterval(() => {
      elapsed += TICK_MS
      let next: Logo[] | null = null
      for (let i = 0; i < cols; i++) {
        // later columns run a little ahead, so the swaps ripple across the row
        const step = Math.floor((elapsed + i * COLUMN_STAGGER_MS) / CYCLE_MS)
        if (step === steps[i]) continue
        steps[i] = step
        const incoming = queue.shift()
        if (!incoming) continue // as many columns as logos: nothing spare to swap in
        next ??= [...shownRef.current]
        queue.push(next[i])
        next[i] = incoming
      }
      if (next) {
        shownRef.current = next
        setShown(next)
      }
    }, TICK_MS)
    return () => clearInterval(id)
  }, [logos, cols])

  return (
    <div className="flex space-x-4">
      {shown.map((logo, index) => (
        <LogoColumn key={index} logo={logo} index={index} />
      ))}
    </div>
  )
}

export { LogoColumn }
