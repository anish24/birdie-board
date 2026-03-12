"use client"
import { motion } from "framer-motion"
import { containerVariants, itemVariants } from "@/lib/animations"

export default function Home() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-10 pt-2"
    >
      <motion.div variants={itemVariants} className="flex flex-col gap-4">
        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
          Golf Scoring
        </span>
        <h2 className="text-[2.75rem] font-black leading-[0.95] tracking-tight text-foreground">
          Made for<br />the course.
        </h2>
        <p className="text-sm text-stone-500 leading-relaxed">
          Track your round easily and keep scores for friends.
        </p>
      </motion.div>

      <motion.ul variants={itemVariants} className="flex flex-col gap-3">
        <li className="flex items-center gap-3 text-sm font-medium text-stone-700">
          <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
          Fast score tracking
        </li>
        <li className="flex items-center gap-3 text-sm font-medium text-stone-700">
          <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
          Support for 9 and 18 hole games
        </li>
        <li className="flex items-center gap-3 text-sm font-medium text-stone-700">
          <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
          Multi-player support
        </li>
        <li className="flex items-center gap-3 text-sm font-medium text-stone-700">
          <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
          Mobile Friendly
        </li>
      </motion.ul>

      <motion.a
        className="rounded-full bg-primary hover:bg-primary/90 active:scale-[0.98] transition-all flex items-center justify-center text-white font-bold text-sm h-12 px-5 w-full"
        href="/dashboard/new-game"
        variants={itemVariants}
      >
        Start a game
      </motion.a>
    </motion.div>
  )
}
