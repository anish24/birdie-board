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
      // parse the value
      const value = parseInt(e.target.value) || 0

      // update the scores state immutably
      setScores((prev) => {
        const updated = { ...prev }
        updated[playerIndex] = [...(prev[playerIndex] || [])]
        updated[playerIndex][holeIndex] = value
        return updated
      })
    }

  return (
    <div className="flex-col items-center gap-6 justify-center">
      <div className="w-full max-w-5xl">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="border-b-2 px-4 py-2 text-left">Hole</th>
              {names.map((name, index) => (
                <th key={index} className="border-b-2 px-4 py-2 text-left">
                  {name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {holes.map((hole) => (
              <tr className="border-b" key={hole}>
                <td className="font-semibold bg-gray-300 text-center">{hole}</td>
                {names.map((_, index) => (
                  <td key={index} className="px-4 py-2">
                    <input
                      className="w-9 px-2 h-9 py-1 border text-center focus:visible:bord [&::-webkit-inner-spin-button]:appearance-none"
                      type="number"
                      value={scores[index]?.[hole - 1] ?? ""}
                      onChange={handleScoreChange(index, hole - 1)}
                    />
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <td className="px-4 py-2 font-semibold">Out</td>
              {names.map((_, index) => {
                const outTotal = (scores[index] || [])
                .slice(0,9)
                .reduce(
                  (sum, s) => sum + (s || 0),
                  0
                )
                return (
                  <td key={index} className="px-4 py-2">
                    <input
                      className="w-9 px-2 h-9 py-1 border text-center bg-gray-100"
                      value={outTotal}
                      readOnly
                    />
                  </td>
                )
              })}
            </tr>
            <tr>
              <td className="px-4 py-2 font-semibold">In</td>
              {names.map((_, index) => {
                const inTotal = (scores[index] || [])
                .slice(9,18)
                .reduce(
                  (sum, s) => sum + (s || 0),
                  0
                )
                return (
                  <td key={index} className="px-4 py-2">
                    <input
                      className="w-9 px-2 h-9 py-1 border text-center bg-gray-100"
                      value={inTotal}
                      readOnly
                    />
                  </td>
                )
              })}
            </tr>
            <tr>
              <td className="px-4 py-2 font-semibold">Total</td>
              {names.map((_, index) => {
                const total = (scores[index] || []).reduce(
                  (sum, s) => sum + (s || 0),
                  0
                )
                return (
                  <td key={index} className="px-4 py-2">
                    <input
                      className="w-9 px-2 h-9 py-1 border text-center bg-gray-100"
                      value={total}
                      readOnly
                    />
                  </td>
                )
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
