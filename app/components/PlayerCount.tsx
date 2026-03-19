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
      className="flex flex-col gap-8 pt-2"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="flex flex-col gap-3">
        <div className="flex flex-col gap-2.5">
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
            Step 1 of 3
          </span>
          <div className="flex gap-1.5">
            <div className="h-[3px] flex-1 rounded-full bg-primary" />
            <div className="h-[3px] flex-1 rounded-full bg-stone-200" />
            <div className="h-[3px] flex-1 rounded-full bg-stone-200" />
          </div>
        </div>
        <h1 className="text-[2.75rem] font-black leading-[0.92] tracking-tight text-secondary">
          How many<br />players?
        </h1>
      </motion.div>

      <motion.div variants={itemVariants} className="flex flex-col gap-6">
        <div className="flex items-center justify-center py-6">
          <div className="w-36 h-36 rounded-full border-[3px] border-stone-100 flex items-center justify-center">
            <span className="text-7xl font-black text-primary tabular-nums leading-none">
              {playerCount}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <input
            type="range"
            min={1}
            max={4}
            value={playerCount}
            onChange={(e) => setPlayerCount(Number(e.target.value))}
            className="w-full cursor-pointer"
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
