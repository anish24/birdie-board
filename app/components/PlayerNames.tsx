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
      className="flex flex-col gap-5 items-start"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        variants={itemVariants}
        className="text-3xl font-black text-primary"
      >
        Enter player names
      </motion.h1>
      {Array.from({ length: playerCount }, (_, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          className="w-full"
        >
          <label
            className="flex flex-col w-full text-sm/6 font-medium text-gray-900"
            htmlFor={`player-${index}`}
          >
            Player {index + 1}:
            <input
              type="text"
              value={playerNames[index] || ""}
              className="block p-2 w-full border-1 h-7 sm:h-8 border-solid border-gray-800 rounded-sm shadow-sm sm:text-base text-[16px] focus:outline-none focus:ring-2 focus:ring-secondary"
              onChange={(e) => handleNameChange(index, e.target.value)}
            />
          </label>
        </motion.div>
      ))}
      <motion.button
      variants={itemVariants}
        className="rounded-full border border-solid bg-primary hover:bg-secondary border-transparent transition-colors flex items-center justify-center text-background gap-2 font-bold text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full md:w-full"
        onClick={onNext}
      >
        Next step
      </motion.button>
      <motion.button
      variants={itemVariants}
        className="rounded-full border-solid bg-transparent text-secondary hover:bg-secondary hover:text-white border-2 border-secondary transition-colors flex items-center justify-center gap-2 font-bold text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full md:w-full"
        onClick={onPrev}
      >
        Previous
      </motion.button>
    </motion.div>
  )
}
