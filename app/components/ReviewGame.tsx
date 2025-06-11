"use client"
import React from "react"
import { useRouter } from "next/navigation"
import { v4 as uuidv4 } from "uuid"
import { motion } from "framer-motion"
import { containerVariants, itemVariants } from "@/lib/animations"

type Props = {
  playerNames: string[]
  gameType: 9 | 18
  onStartGame: () => void
  onPrev: () => void
}

export default function ReviewGame({
  playerNames,
  gameType,
  onStartGame,
  onPrev,
}: Props) {
  const router = useRouter()

  const handleStartGame = () => {
    const gameId = uuidv4()
    const names = encodeURIComponent(playerNames.join(","))
    router.push(
      `/dashboard/game/${gameId}?players=${names}&gameType=${gameType}`
    )
  }

  return (
    <motion.div
      className="flex flex-col gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        className="text-3xl font-black text-primary"
        variants={itemVariants}
      >
        Review your game.
      </motion.h1>

      <motion.div variants={itemVariants}>
        <fieldset className="w-full max-w-sm">
          <legend className="text-xl font-semibold mb-2">Players</legend>
          <ol className="list-decimal list-inside flex flex-col gap-2">
            {playerNames.map((name, index) => (
              <li key={index}>{name || `Player ${index + 1}`}</li>
            ))}
          </ol>
        </fieldset>
      </motion.div>

      <motion.p className="text-lg font-medium" variants={itemVariants}>
        Game type: {gameType} holes
      </motion.p>

        <motion.button
          className="rounded-full cursor-pointer border border-solid bg-primary hover:bg-secondary border-transparent transition-colors flex items-center justify-center text-background gap-2 dark:hover:bg-[#ccc] font-bold text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full md:w-full"
          onClick={handleStartGame}
          variants={itemVariants}
          >
          Start
        </motion.button>

        <motion.button
          className="rounded-full cursor-pointer border-solid bg-transparent text-secondary hover:bg-secondary hover:text-white border-2 border-secondary transition-colors flex items-center justify-center gap-2 dark:hover:bg-[#ccc] font-bold text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full md:w-full"
          onClick={onPrev}
          variants={itemVariants}
          >
          Previous
        </motion.button>
    </motion.div>
  )
}
