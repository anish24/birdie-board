"use client"
import React from "react"
import { useState } from "react"

type Props = {
  playerNames: string[]
  gameType: 9 | 18
  scores: { [playerIndex: number]: number[] }
  setScores: React.Dispatch<
    React.SetStateAction<{ [playerIndex: number]: number[] }>
  >
}

const playerColors = [
  "text-emerald-600",
  "text-blue-600",
  "text-violet-600",
  "text-orange-500",
]

export default function Scorecard({
  gameType,
  playerNames,
  setScores,
  scores,
}: Props) {
  const holes = Array.from({ length: gameType }, (_, i) => i + 1)
  const names = playerNames.map((name, index) => name || `Player ${index + 1}`)

  const handleScoreChange =
    (playerIndex: number, holeIndex: number) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value) || 0
      setScores((prev) => {
        const updated = { ...prev }
        updated[playerIndex] = [...(prev[playerIndex] || [])]
        updated[playerIndex][holeIndex] = value
        return updated
      })
    }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b-2 border-stone-200">
            <th className="py-3 px-2 text-left w-10">
              <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-stone-400">
                Hole
              </span>
            </th>
            {names.map((name, index) => (
              <th
                key={index}
                className={`py-3 px-2 text-left text-xs font-bold truncate max-w-[72px] ${playerColors[index % playerColors.length]}`}
              >
                {name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {holes.map((hole) => (
            <tr
              className={`border-b border-stone-100 ${hole % 2 === 0 ? "bg-stone-50/60" : ""}`}
              key={hole}
            >
              <td className="py-1.5 px-2">
                <span className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center tabular-nums">
                  {hole}
                </span>
              </td>
              {names.map((_, index) => (
                <td key={index} className="px-2 py-1.5">
                  <input
                    className="w-10 h-10 text-center font-semibold text-sm bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    type="number"
                    value={scores[index]?.[hole - 1] || ""}
                    onChange={handleScoreChange(index, hole - 1)}
                  />
                </td>
              ))}
            </tr>
          ))}

          {/* Out row */}
          <tr className="border-t-2 border-stone-200 bg-stone-50">
            <td className="py-3 px-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-stone-400">
                Out
              </span>
            </td>
            {names.map((_, index) => {
              const outTotal = (scores[index] || [])
                .slice(0, 9)
                .reduce((sum, s) => sum + (s || 0), 0)
              return (
                <td key={index} className="px-2 py-1.5">
                  <div className="w-10 h-10 flex items-center justify-center font-bold text-sm text-stone-600 bg-stone-100 rounded-lg tabular-nums">
                    {outTotal || "—"}
                  </div>
                </td>
              )
            })}
          </tr>

          {/* In row */}
          <tr className="bg-stone-50 border-b border-stone-100">
            <td className="py-3 px-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-stone-400">
                In
              </span>
            </td>
            {names.map((_, index) => {
              const inTotal = (scores[index] || [])
                .slice(9, 18)
                .reduce((sum, s) => sum + (s || 0), 0)
              return (
                <td key={index} className="px-2 py-1.5">
                  <div className="w-10 h-10 flex items-center justify-center font-bold text-sm text-stone-600 bg-stone-100 rounded-lg tabular-nums">
                    {inTotal || "—"}
                  </div>
                </td>
              )
            })}
          </tr>

          {/* Total row */}
          <tr className="bg-primary/5">
            <td className="py-3 px-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-primary">
                Total
              </span>
            </td>
            {names.map((_, index) => {
              const total = (scores[index] || []).reduce(
                (sum, s) => sum + (s || 0),
                0
              )
              return (
                <td key={index} className="px-2 py-2">
                  <div className="w-10 h-10 flex items-center justify-center font-bold text-sm text-primary bg-primary/10 rounded-lg tabular-nums">
                    {total || "—"}
                  </div>
                </td>
              )
            })}
          </tr>
        </tbody>
      </table>
    </div>
  )
}
