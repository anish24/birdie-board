import React from "react"
import { motion } from "framer-motion"
import { containerVariants, itemVariants } from "@/lib/animations"

type Props = {
  playerNames: string[]
  setPlayerNames: (names: string[]) => void
  playerCount: number
  setPlayerCount: (count: number) => void
  onNext: () => void
  onPrev: () => void
}

export default function PlayerNames({
  playerNames,
  setPlayerNames,
  playerCount,
  onNext,
  onPrev,
}: Props) {
  const handleNameChange = (index: number, value: string) => {
    const newNames = [...playerNames]
    newNames[index] = value
    setPlayerNames(newNames)
  }

  return (
    <motion.div
      className="flex flex-col gap-10 pt-2"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="flex flex-col gap-2">
        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
          Step 2 of 3
        </span>
        <h1 className="text-[2.75rem] font-black leading-[0.95] tracking-tight text-secondary">
          Enter player<br />names.
        </h1>
      </motion.div>

      <motion.div variants={itemVariants} className="flex flex-col gap-4 w-full">
        {Array.from({ length: playerCount }, (_, index) => (
          <div key={index} className="flex flex-col gap-1.5">
            <label
              className="text-[11px] font-bold uppercase tracking-[0.12em] text-stone-400"
              htmlFor={`player-${index}`}
            >
              Player {index + 1}
            </label>
            <input
              id={`player-${index}`}
              type="text"
              value={playerNames[index] || ""}
              className="w-full h-12 px-4 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-[16px]"
              placeholder={`Player ${index + 1}`}
              onChange={(e) => handleNameChange(index, e.target.value)}
            />
          </div>
        ))}
      </motion.div>

      <div className="flex flex-col gap-3">
        <motion.button
          variants={itemVariants}
          className="rounded-full bg-primary hover:bg-primary/90 active:scale-[0.98] transition-all flex items-center justify-center text-white font-bold text-sm h-12 px-5 w-full"
          onClick={onNext}
        >
          Continue
        </motion.button>
        <motion.button
          variants={itemVariants}
          className="rounded-full border-2 border-stone-200 hover:border-stone-300 active:scale-[0.98] transition-all flex items-center justify-center text-stone-500 font-bold text-sm h-12 px-5 w-full"
          onClick={onPrev}
        >
          Back
        </motion.button>
      </div>
    </motion.div>
  )
}
