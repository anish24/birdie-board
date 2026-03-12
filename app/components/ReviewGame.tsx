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
      className="flex flex-col gap-10 pt-2"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="flex flex-col gap-2">
        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
          Ready to play
        </span>
        <h1 className="text-[2.75rem] font-black leading-[0.95] tracking-tight text-secondary">
          Review your<br />game.
        </h1>
      </motion.div>
      
      <motion.div variants={itemVariants} className="flex flex-col gap-3">
        <div className="bg-stone-50 border border-stone-100 rounded-2xl p-4 flex flex-col gap-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-stone-400">
            Players
          </p>
          <ol className="flex flex-col gap-2.5">
            {playerNames.map((name, index) => (
              <li key={index} className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0">
                  {index + 1}
                </span>
                <span className="text-sm font-semibold text-foreground">
                  {name || `Player ${index + 1}`}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="bg-stone-50 border border-stone-100 rounded-2xl px-4 py-3.5 flex items-center justify-between">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-stone-400">
            Game type
          </p>
          <p className="text-sm font-bold text-foreground">{gameType} holes</p>
        </div>
      </motion.div>

      <div className="flex flex-col gap-3">
        <motion.button
          className="rounded-full bg-primary hover:bg-primary/90 active:scale-[0.98] cursor-pointer transition-all flex items-center justify-center text-white font-bold text-sm h-12 px-5 w-full"
          onClick={handleStartGame}
          variants={itemVariants}
        >
          Let's play
        </motion.button>
        <motion.button
          className="rounded-full border-2 border-stone-200 hover:border-stone-300 active:scale-[0.98] cursor-pointer transition-all flex items-center justify-center text-stone-500 font-bold text-sm h-12 px-5 w-full"
          onClick={onPrev}
          variants={itemVariants}
        >
          Back
        </motion.button>
      </div>
    </motion.div>
  )
}
