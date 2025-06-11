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
      className="flex flex-col gap-4 items-start"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        className="text-3xl font-black text-green-600"
        variants={itemVariants}
      >
        How many players 
      </motion.h1>
      <motion.div
      className="w-full"
      variants={itemVariants}
      >
        <input
          type="range"
          min={1}
          max={4}
          value={playerCount}
          onChange={(e) => setPlayerCount(Number(e.target.value))}
          className="accent-secondary hover:accent-primary w-full"
        />
      </motion.div>
      <motion.p
        variants={itemVariants}
        className="text-center text-lg font-medium"
      >
        Players: {playerCount}
      </motion.p>
      <motion.button
        className="rounded-full border border-solid bg-secondary hover:bg-primary border-transparent transition-colors flex items-center justify-center text-background gap-2 dark:hover:bg-[#ccc] font-bold text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full md:w-full"
        onClick={onNext}
        variants={itemVariants}
      >
        Next step
      </motion.button>
    </motion.div>
  )
}
