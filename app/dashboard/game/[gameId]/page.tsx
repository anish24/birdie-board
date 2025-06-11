"use client"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import Scorecard from "@/app/components/Scorecard"
import { motion } from "framer-motion"
import { containerVariants, itemVariants } from "@/lib/animations"

export default function NewGamePage() {
  const searchParams = useSearchParams()
  const playerNames = searchParams.get("players")?.split(",") || []
  const gameType = parseInt(searchParams.get("gameType") || "18") as 9 | 18

  const [scores, setScores] = useState<{ [playerIndex: number]: number[] }>({})

  return (
      <Scorecard
        playerNames={playerNames}
        scores={scores}
        setScores={setScores}
        gameType={gameType}
      />
  )
}
