"use client"
import React, { useState, useCallback } from "react"
import { Camera, X, Download, Printer } from "lucide-react"

type Props = {
  playerNames: string[]
  gameType: 9 | 18
  scores: { [playerIndex: number]: number[] }
  setScores: React.Dispatch<
    React.SetStateAction<{ [playerIndex: number]: number[] }>
  >
  pars: number[]
  setPars: React.Dispatch<React.SetStateAction<number[]>>
}

const playerColors = [
  { text: "text-emerald-600" },
  { text: "text-blue-600" },
  { text: "text-violet-600" },
  { text: "text-orange-500" },
]

function getScoreClass(score: number, par: number): string {
  if (!par || !score) return "bg-white border-stone-200 text-foreground"
  const diff = score - par
  if (diff <= -2) return "bg-purple-100 border-purple-300 text-purple-700"
  if (diff === -1) return "bg-red-100 border-red-300 text-red-600"
  if (diff === 0) return "bg-primary/10 border-primary/30 text-primary"
  if (diff === 1) return "bg-amber-50 border-amber-200 text-amber-700"
  return "bg-stone-100 border-stone-300 text-stone-500"
}

function formatVsPar(diff: number): string {
  if (diff === 0) return "E"
  return diff > 0 ? `+${diff}` : `${diff}`
}

function getVsParColor(diff: number): string {
  if (diff < 0) return "text-emerald-400"
  if (diff === 0) return "text-white/50"
  return "text-red-300"
}

function scoreStyle(score: number, par: number) {
  if (!par || !score) return { bg: "#FFFFFF", fg: "#111111", border: "#E7E5E4" }
  const d = score - par
  if (d <= -2) return { bg: "#EDE9FE", fg: "#6D28D9", border: "#C4B5FD" }
  if (d === -1) return { bg: "#FEE2E2", fg: "#DC2626", border: "#FCA5A5" }
  if (d === 0)  return { bg: "#DCFCE7", fg: "#16A34A", border: "#86EFAC" }
  if (d === 1)  return { bg: "#FFFBEB", fg: "#D97706", border: "#FDE68A" }
  return { bg: "#F5F5F4", fg: "#78716C", border: "#D6D3D1" }
}

function buildScorecardCanvas(
  names: string[],
  scores: { [playerIndex: number]: number[] },
  pars: number[],
  gameType: 9 | 18,
  playerTotals: { name: string; total: number; vsPar: number | null }[],
  holesPlayed: number
): string {
  const DPR = 3
  const W = 375
  const PAD = 16
  const HEADER_H = 112
  const COL_H = 32
  const ROW_H = 44
  const SUMM_H = 44
  const FOOTER_H = 44
  const GAP = 12
  const numSummary = gameType === 18 ? 3 : 2
  const tableH = COL_H + ROW_H * gameType + SUMM_H * numSummary
  const totalH = PAD + HEADER_H + GAP + tableH + GAP + FOOTER_H + PAD

  const canvas = document.createElement("canvas")
  canvas.width = W * DPR
  canvas.height = totalH * DPR
  const ctx = canvas.getContext("2d")!
  ctx.scale(DPR, DPR)

  const rr = (x: number, y: number, w: number, h: number, r: number | number[]) => {
    ctx.beginPath()
    ctx.roundRect(x, y, w, h, r as number)
  }
  const font = (size: number, weight = "700") =>
    `${weight} ${size}px Inter,-apple-system,BlinkMacSystemFont,sans-serif`

  // ── Background ──────────────────────────────────────────────────────
  ctx.fillStyle = "#F5F4F0"
  ctx.fillRect(0, 0, W, totalH)

  // ── Header ──────────────────────────────────────────────────────────
  rr(PAD, PAD, W - PAD * 2, HEADER_H, 16)
  ctx.fillStyle = "#00A14B"
  ctx.fill()

  ctx.fillStyle = "rgba(255,255,255,0.45)"
  ctx.font = font(9)
  ctx.textAlign = "left"
  ctx.fillText("LEADERBOARD", PAD + 14, PAD + 20)
  ctx.textAlign = "right"
  ctx.fillText(`${holesPlayed}/${gameType} HOLES`, W - PAD - 14, PAD + 20)

  const playerW = (W - PAD * 2 - 28) / names.length
  playerTotals.forEach(({ name, total, vsPar }, i) => {
    const x = PAD + 14 + i * playerW
    ctx.textAlign = "left"
    ctx.fillStyle = "#FFFFFF"
    ctx.font = font(38, "900")
    ctx.fillText(total ? String(total) : "—", x, PAD + 70)

    if (vsPar !== null && total > 0) {
      const label = vsPar === 0 ? "E" : vsPar > 0 ? `+${vsPar}` : String(vsPar)
      ctx.font = font(11)
      ctx.fillStyle = vsPar < 0 ? "#86efac" : vsPar === 0 ? "rgba(255,255,255,0.5)" : "#fca5a5"
      ctx.fillText(label, x, PAD + 86)
    }

    ctx.font = font(11, "600")
    ctx.fillStyle = "rgba(255,255,255,0.45)"
    ctx.fillText(
      name.length > 10 ? name.slice(0, 10) + "…" : name,
      x,
      PAD + HEADER_H - 10
    )
  })

  // ── Table ────────────────────────────────────────────────────────────
  const tableX = PAD
  const tableY = PAD + HEADER_H + GAP
  const tableW = W - PAD * 2
  const HOLE_COL = 52
  const PAR_COL = 48
  const PLAYER_COL = (tableW - HOLE_COL - PAR_COL) / names.length
  const pcx = (i: number) =>
    tableX + HOLE_COL + PAR_COL + i * PLAYER_COL + PLAYER_COL / 2

  rr(tableX, tableY, tableW, tableH, 16)
  ctx.fillStyle = "#FFFFFF"
  ctx.fill()
  ctx.strokeStyle = "#F1F0EC"
  ctx.lineWidth = 1
  ctx.stroke()

  // Col header
  rr(tableX, tableY, tableW, COL_H, [16, 16, 0, 0])
  ctx.fillStyle = "#FAFAF9"
  ctx.fill()
  ctx.beginPath()
  ctx.strokeStyle = "#EEECE8"
  ctx.lineWidth = 1
  ctx.moveTo(tableX, tableY + COL_H)
  ctx.lineTo(tableX + tableW, tableY + COL_H)
  ctx.stroke()

  ctx.fillStyle = "#A8A29E"
  ctx.font = font(9)
  ctx.textAlign = "left"
  ctx.fillText("HOLE", tableX + 14, tableY + COL_H / 2 + 4)
  ctx.fillStyle = "#D97706"
  ctx.fillText("PAR", tableX + HOLE_COL + 8, tableY + COL_H / 2 + 4)

  const pColors = ["#059669", "#2563EB", "#7C3AED", "#EA580C"]
  names.forEach((name, i) => {
    ctx.fillStyle = pColors[i % pColors.length]
    ctx.font = font(11)
    ctx.textAlign = "center"
    ctx.fillText(
      name.length > 9 ? name.slice(0, 9) + "…" : name,
      pcx(i),
      tableY + COL_H / 2 + 4
    )
  })

  // Hole rows
  Array.from({ length: gameType }, (_, idx) => idx + 1).forEach((hole) => {
    const rowY = tableY + COL_H + (hole - 1) * ROW_H
    const cy = rowY + ROW_H / 2

    if (hole % 2 === 0) {
      ctx.fillStyle = "rgba(245,244,240,0.55)"
      ctx.fillRect(tableX, rowY, tableW, ROW_H)
    }
    ctx.beginPath()
    ctx.strokeStyle = "#F5F4F0"
    ctx.lineWidth = 1
    ctx.moveTo(tableX, rowY + ROW_H)
    ctx.lineTo(tableX + tableW, rowY + ROW_H)
    ctx.stroke()

    // Hole circle
    ctx.beginPath()
    ctx.arc(tableX + 22, cy, 13, 0, Math.PI * 2)
    ctx.fillStyle = "#00A14B"
    ctx.fill()
    ctx.fillStyle = "#FFFFFF"
    ctx.font = font(11)
    ctx.textAlign = "center"
    ctx.fillText(String(hole), tableX + 22, cy + 4)

    // Par cell
    const par = pars[hole - 1]
    const parCX = tableX + HOLE_COL + 24
    if (par) {
      rr(parCX - 18, cy - 16, 36, 32, 8)
      ctx.fillStyle = "#FFFBEB"
      ctx.fill()
      ctx.strokeStyle = "#FDE68A"
      ctx.lineWidth = 1
      ctx.stroke()
      ctx.fillStyle = "#D97706"
      ctx.font = font(12)
      ctx.textAlign = "center"
      ctx.fillText(String(par), parCX, cy + 5)
    } else {
      ctx.fillStyle = "#D6D3D1"
      ctx.font = font(13)
      ctx.textAlign = "center"
      ctx.fillText("—", parCX, cy + 5)
    }

    // Score cells
    names.forEach((_, pi) => {
      const score = scores[pi]?.[hole - 1]
      const cx = pcx(pi)
      const s = scoreStyle(score, par)
      rr(cx - 17, cy - 17, 34, 34, 8)
      ctx.fillStyle = s.bg
      ctx.fill()
      ctx.strokeStyle = s.border
      ctx.lineWidth = 1
      ctx.stroke()
      if (score) {
        ctx.fillStyle = s.fg
        ctx.font = font(13)
        ctx.textAlign = "center"
        ctx.fillText(String(score), cx, cy + 5)
      }
    })
  })

  // Summary rows
  const summaryRows =
    gameType === 18
      ? [
          { label: "OUT", start: 0, end: 9 },
          { label: "IN", start: 9, end: 18 },
          { label: "TOTAL", start: 0, end: 18 },
        ]
      : [
          { label: "OUT", start: 0, end: 9 },
          { label: "TOTAL", start: 0, end: 9 },
        ]

  summaryRows.forEach(({ label, start, end }, si) => {
    const rowY = tableY + COL_H + gameType * ROW_H + si * SUMM_H
    const cy = rowY + SUMM_H / 2
    const isTotal = label === "TOTAL"
    const isLast = si === summaryRows.length - 1

    ctx.fillStyle = isTotal ? "rgba(0,161,75,0.05)" : "#FAFAF9"
    ctx.fillRect(tableX, rowY, tableW, SUMM_H)

    // Clip square corners back to match table card's rounded bottom
    if (isLast) {
      ctx.fillStyle = "#F5F4F0"
      ctx.fillRect(tableX, rowY + SUMM_H - 16, 16, 16)
      ctx.fillRect(tableX + tableW - 16, rowY + SUMM_H - 16, 16, 16)
    }

    ctx.beginPath()
    ctx.strokeStyle = si === 0 ? "#DDDBD6" : "#EEECE8"
    ctx.lineWidth = si === 0 ? 2 : 1
    ctx.moveTo(tableX, rowY)
    ctx.lineTo(tableX + tableW, rowY)
    ctx.stroke()

    ctx.fillStyle = isTotal ? "#00A14B" : "#A8A29E"
    ctx.font = font(9)
    ctx.textAlign = "left"
    ctx.fillText(label, tableX + 14, cy + 4)

    const parCX = tableX + HOLE_COL + 24
    const parTotal = pars.slice(start, end).reduce((s, p) => s + (p || 0), 0)
    rr(parCX - 18, cy - 16, 36, 32, 8)
    ctx.fillStyle = "#FFFBEB"
    ctx.fill()
    ctx.strokeStyle = "#FDE68A"
    ctx.lineWidth = 1
    ctx.stroke()
    ctx.fillStyle = "#D97706"
    ctx.font = font(12)
    ctx.textAlign = "center"
    ctx.fillText(parTotal ? String(parTotal) : "—", parCX, cy + 5)

    names.forEach((_, pi) => {
      const total = (scores[pi] || [])
        .slice(start, end)
        .reduce((s, sc) => s + (sc || 0), 0)
      const cx = pcx(pi)
      rr(cx - 17, cy - 17, 34, 34, 8)
      ctx.fillStyle = isTotal ? "rgba(0,161,75,0.1)" : "#F0EFEB"
      ctx.fill()
      ctx.strokeStyle = isTotal ? "rgba(0,161,75,0.2)" : "#E4E2DD"
      ctx.lineWidth = 1
      ctx.stroke()
      ctx.fillStyle = isTotal ? "#00A14B" : "#57534E"
      ctx.font = font(13)
      ctx.textAlign = "center"
      ctx.fillText(total ? String(total) : "—", cx, cy + 5)
    })
  })

  // ── Footer ────────────────────────────────────────────────────────────
  const footerY = PAD + HEADER_H + GAP + tableH + GAP
  ctx.fillStyle = "#B0ADA8"
  ctx.font = font(10)
  ctx.textAlign = "center"
  ctx.fillText("BIRDIE BOARD", W / 2, footerY + 20)
  ctx.fillStyle = "#C9C6C0"
  ctx.font = font(10, "500")
  ctx.fillText("birdieboard.app", W / 2, footerY + 36)

  return canvas.toDataURL("image/png")
}

// ─────────────────────────────────────────────────────────────────────────────

export default function Scorecard({
  gameType,
  playerNames,
  setScores,
  scores,
  pars,
  setPars,
}: Props) {
  const holes = Array.from({ length: gameType }, (_, i) => i + 1)
  const names = playerNames.map((name, index) => name || `Player ${index + 1}`)
  const [imageUrl, setImageUrl] = useState<string | null>(null)

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

  const handleParChange =
    (holeIndex: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value) || 0
      setPars((prev) => {
        const updated = [...prev]
        updated[holeIndex] = value
        return updated
      })
    }

  const parEntered = pars.some((p) => p > 0)

  const playerTotals = names.map((name, i) => {
    const total = (scores[i] || []).reduce((sum, s) => sum + (s || 0), 0)
    const parForPlayedHoles = pars.reduce(
      (sum, p, h) => ((scores[i]?.[h] || 0) > 0 && p > 0 ? sum + p : sum),
      0
    )
    const vsPar = parEntered ? total - parForPlayedHoles : null
    return { name, total, vsPar }
  })

  const holesPlayed = Math.max(
    0,
    ...names.map((_, i) => (scores[i] || []).filter((s) => s > 0).length)
  )

  const handleSave = useCallback(() => {
    const url = buildScorecardCanvas(
      names,
      scores,
      pars,
      gameType,
      playerTotals,
      holesPlayed
    )
    setImageUrl(url)
  }, [names, scores, pars, gameType, playerTotals, holesPlayed])

  return (
    <>
      {/* Save image overlay */}
      {imageUrl && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col gap-5 p-6 print:hidden">
          <div className="flex items-center justify-between flex-shrink-0">
            <p className="text-white/50 text-sm font-medium">
              Press &amp; hold image to save
            </p>
            <button
              onClick={() => setImageUrl(null)}
              className="text-white/50 hover:text-white transition-colors p-1 -mr-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt="Scorecard"
              className="w-full rounded-2xl"
            />
          </div>
          <a
            href={imageUrl}
            download="birdie-board-scorecard.png"
            className="flex-shrink-0 rounded-full bg-white active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 text-foreground font-bold text-sm h-12 px-5 w-full"
          >
            <Download className="w-4 h-4" />
            Download
          </a>
        </div>
      )}

      <div className="flex flex-col gap-5 w-full">
        {/* Live leaderboard */}
        <div className="rounded-2xl bg-primary p-4 text-white">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/55">
              Leaderboard
            </span>
            <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/55">
              {holesPlayed}/{gameType} holes
            </span>
          </div>
          <div className="flex gap-6">
            {playerTotals.map(({ name, total, vsPar }, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-3xl font-black tabular-nums leading-none">
                  {total || "—"}
                </span>
                {vsPar !== null && total > 0 && (
                  <span
                    className={`text-[11px] font-bold tabular-nums mt-0.5 ${getVsParColor(vsPar)}`}
                  >
                    {formatVsPar(vsPar)}
                  </span>
                )}
                <span className="text-[11px] font-semibold text-white/55 mt-1 truncate max-w-[72px]">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Scorecard table */}
        <div className="w-full overflow-x-auto rounded-2xl border border-stone-100">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-stone-100 bg-stone-50">
                <th className="py-3 px-3 text-left w-12">
                  <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-stone-400">
                    Hole
                  </span>
                </th>
                <th className="py-3 px-2 text-left w-12">
                  <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-amber-500">
                    Par
                  </span>
                </th>
                {names.map((name, index) => (
                  <th
                    key={index}
                    className={`py-3 px-2 text-left text-[11px] font-bold truncate max-w-[72px] ${playerColors[index % playerColors.length].text}`}
                  >
                    {name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {holes.map((hole) => (
                <tr
                  className={`border-b border-stone-50 ${hole % 2 === 0 ? "bg-stone-50/50" : "bg-white"}`}
                  key={hole}
                >
                  <td className="py-2 px-3">
                    <span className="w-7 h-7 rounded-full bg-primary text-white text-[11px] font-bold flex items-center justify-center tabular-nums">
                      {hole}
                    </span>
                  </td>
                  <td className="px-2 py-2">
                    <input
                      className="w-10 h-10 text-center font-bold text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-300/50 focus:border-amber-400 transition-all placeholder:text-amber-300"
                      type="number"
                      value={pars[hole - 1] || ""}
                      onChange={handleParChange(hole - 1)}
                      placeholder="—"
                    />
                  </td>
                  {names.map((_, index) => {
                    const score = scores[index]?.[hole - 1]
                    const par = pars[hole - 1]
                    return (
                      <td key={index} className="px-2 py-2">
                        <input
                          className={`w-10 h-10 text-center font-bold text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary transition-all ${getScoreClass(score, par)}`}
                          type="number"
                          value={score || ""}
                          onChange={handleScoreChange(index, hole - 1)}
                        />
                      </td>
                    )
                  })}
                </tr>
              ))}

              {/* Out row */}
              <tr className="border-t-2 border-stone-100 bg-stone-50">
                <td className="py-3 px-3">
                  <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-stone-400">
                    Out
                  </span>
                </td>
                <td className="px-2 py-2">
                  <div className="w-10 h-10 flex items-center justify-center font-bold text-xs text-amber-600 bg-amber-50 rounded-xl tabular-nums">
                    {pars.slice(0, 9).reduce((s, p) => s + (p || 0), 0) || "—"}
                  </div>
                </td>
                {names.map((_, index) => {
                  const outTotal = (scores[index] || [])
                    .slice(0, 9)
                    .reduce((sum, s) => sum + (s || 0), 0)
                  return (
                    <td key={index} className="px-2 py-2">
                      <div className="w-10 h-10 flex items-center justify-center font-bold text-sm text-stone-600 bg-stone-100 rounded-xl tabular-nums">
                        {outTotal || "—"}
                      </div>
                    </td>
                  )
                })}
              </tr>

              {/* In row — only for 18-hole games */}
              {gameType === 18 && (
                <tr className="bg-stone-50 border-b border-stone-100">
                  <td className="py-3 px-3">
                    <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-stone-400">
                      In
                    </span>
                  </td>
                  <td className="px-2 py-2">
                    <div className="w-10 h-10 flex items-center justify-center font-bold text-xs text-amber-600 bg-amber-50 rounded-xl tabular-nums">
                      {pars.slice(9, 18).reduce((s, p) => s + (p || 0), 0) || "—"}
                    </div>
                  </td>
                  {names.map((_, index) => {
                    const inTotal = (scores[index] || [])
                      .slice(9, 18)
                      .reduce((sum, s) => sum + (s || 0), 0)
                    return (
                      <td key={index} className="px-2 py-2">
                        <div className="w-10 h-10 flex items-center justify-center font-bold text-sm text-stone-600 bg-stone-100 rounded-xl tabular-nums">
                          {inTotal || "—"}
                        </div>
                      </td>
                    )
                  })}
                </tr>
              )}

              {/* Total row */}
              <tr className="bg-primary/5 border-t border-primary/10">
                <td className="py-3 px-3">
                  <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-primary">
                    Total
                  </span>
                </td>
                <td className="px-2 py-2">
                  <div className="w-10 h-10 flex items-center justify-center font-bold text-xs text-amber-600 bg-amber-50 rounded-xl tabular-nums">
                    {pars.reduce((s, p) => s + (p || 0), 0) || "—"}
                  </div>
                </td>
                {names.map((_, index) => {
                  const total = (scores[index] || []).reduce(
                    (sum, s) => sum + (s || 0),
                    0
                  )
                  return (
                    <td key={index} className="px-2 py-2">
                      <div className="w-10 h-10 flex items-center justify-center font-bold text-sm text-primary bg-primary/10 rounded-xl tabular-nums">
                        {total || "—"}
                      </div>
                    </td>
                  )
                })}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Action buttons */}
        <button
          onClick={handleSave}
          className="print:hidden rounded-full bg-primary hover:bg-primary/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 text-white font-bold text-sm h-12 px-5 w-full"
        >
          <Camera className="w-4 h-4" />
          Save scorecard
        </button>
        <button
          onClick={() => window.print()}
          className="print:hidden rounded-full border-2 border-stone-200 hover:border-stone-300 active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 text-stone-600 font-bold text-sm h-12 px-5 w-full"
        >
          <Printer className="w-4 h-4" />
          Print scorecard
        </button>
      </div>
    </>
  )
}
