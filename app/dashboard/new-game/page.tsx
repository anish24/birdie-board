"use client"
import React from "react"
import { useState } from "react"
import PlayerCount from "@/app/components/PlayerCount"
import PlayerNames from "@/app/components/PlayerNames"
import GameType from "@/app/components/GameType"
import ReviewGame from "@/app/components/ReviewGame"
import Logo from '@/app/components/icons/Logo.svg';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from "@/lib/animations";

export default function NewGamePage() {
  const [playerCount, setPlayerCount] = useState(2)
  const [stepCount, setStepCount] = useState(0)
  const [playerNames, setPlayerNames] = useState<string[]>(Array(playerCount).fill(""));
  const [gameType, setGameType] = useState<9 | 18>(18);
  const handleSetPlayerCount = (count: number) => {
    setPlayerCount(count);
    setPlayerNames((prev) => {
      const updated = prev.slice(0, count);
      while (updated.length < count) {
        updated.push("");
      }
      return updated;
    });
  };

  return (
    <>
      {stepCount === 0 && (
        <PlayerCount
          playerCount={playerCount}
          setPlayerCount={handleSetPlayerCount}
          onNext={() => setStepCount(1)}
        />
      )}
      {stepCount === 1 && (
        <PlayerNames
          playerCount={playerCount}
          setPlayerCount={setPlayerCount}
          onNext={() => setStepCount(2)}
          onPrev={() => setStepCount(0)}
          playerNames={playerNames}
          setPlayerNames={setPlayerNames}
        />
      )}
      {stepCount === 2 && (
        <GameType
          gameType={gameType}
          setGameType={setGameType}
          onPrev={() => setStepCount(1)}
          onNext={() => setStepCount(3)}
        />
      )}
      {stepCount === 3 && (
        <ReviewGame
          playerNames={playerNames}
          gameType={gameType}
          onStartGame={() => setStepCount(4)}
          onPrev={() => setStepCount(2)}
        />
      )}
    </>
  )
}
