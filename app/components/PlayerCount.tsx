import React from "react"
import { motion } from "framer-motion"
import { containerVariants, itemVariants } from "@/lib/animations"

type Props = {
  playerCount: number
  setPlayerCount: (count: number) => void
  onNext: () => void
}

export default function PlayerCount({
  playerCount,
  setPlayerCount,
  onNext,
}: Props) {
  return (
    <motion.div
      className="flex flex-col gap-10 pt-2"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="flex flex-col gap-2">
        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
          Step 1 of 3
        </span>
        <h1 className="text-[2.75rem] font-black leading-[0.95] tracking-tight">
          How many<br />players?
        </h1>
      </motion.div>

      <motion.div variants={itemVariants} className="flex flex-col gap-6">
        <div className="flex items-center justify-center py-4">
          <span className="text-8xl font-black text-primary tabular-nums leading-none">
            {playerCount}
          </span>
        </div>
        <input
          type="range"
          min={1}
          max={4}
          value={playerCount}
          onChange={(e) => setPlayerCount(Number(e.target.value))}
          className="w-full accent-primary cursor-pointer"
        />
        <div className="flex justify-between px-0.5">
          {[1, 2, 3, 4].map((n) => (
            <span
              key={n}
              className={`text-xs font-bold tabular-nums transition-colors ${
                n === playerCount ? "text-primary" : "text-stone-300"
              }`}
            >
              {n}
            </span>
          ))}
        </div>
      </motion.div>

      <motion.button
        className="rounded-full bg-primary hover:bg-primary/90 active:scale-[0.98] transition-all flex items-center justify-center text-white font-bold text-sm h-12 px-5 w-full"
        onClick={onNext}
        variants={itemVariants}
      >
        Continue
      </motion.button>
    </motion.div>
  )
}
