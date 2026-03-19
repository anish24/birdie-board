import React from "react"
import { motion } from "framer-motion"
import { containerVariants, itemVariants } from "@/lib/animations"

type Props = {
  gameType: 9 | 18
  setGameType: (type: 9 | 18) => void
  onNext: () => void
  onPrev: () => void
}

export default function GameType({
  gameType,
  setGameType,
  onNext,
  onPrev,
}: Props) {
  return (
    <motion.div
      className="flex flex-col gap-8 pt-2"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="flex flex-col gap-3">
        <div className="flex flex-col gap-2.5">
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
            Step 3 of 3
          </span>
          <div className="flex gap-1.5">
            <div className="h-[3px] flex-1 rounded-full bg-primary" />
            <div className="h-[3px] flex-1 rounded-full bg-primary" />
            <div className="h-[3px] flex-1 rounded-full bg-primary" />
          </div>
        </div>
        <h1 className="text-[2.75rem] font-black leading-[0.92] tracking-tight text-secondary">
          How many<br />holes?
        </h1>
      </motion.div>

      <motion.fieldset
        className="flex flex-row gap-3"
        aria-label="Select game type"
        variants={itemVariants}
      >
        <motion.button
          type="button"
          className={`flex-1 h-36 rounded-2xl flex flex-col items-center justify-center gap-1.5 border-2 cursor-pointer transition-all active:scale-[0.97] ${
            gameType === 9
              ? "bg-primary border-primary text-white"
              : "bg-stone-50 border-stone-200 text-stone-500 hover:border-stone-300 hover:bg-stone-100"
          }`}
          onClick={() => setGameType(9)}
        >
          <span className="text-5xl font-black leading-none">9</span>
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] opacity-70">
            holes
          </span>
          <span className={`text-[11px] font-semibold mt-0.5 ${gameType === 9 ? "text-white/60" : "text-stone-400"}`}>
            Front nine
          </span>
        </motion.button>
        <motion.button
          type="button"
          className={`flex-1 h-36 rounded-2xl flex flex-col items-center justify-center gap-1.5 border-2 cursor-pointer transition-all active:scale-[0.97] ${
            gameType === 18
              ? "bg-primary border-primary text-white"
              : "bg-stone-50 border-stone-200 text-stone-500 hover:border-stone-300 hover:bg-stone-100"
          }`}
          onClick={() => setGameType(18)}
        >
          <span className="text-5xl font-black leading-none">18</span>
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] opacity-70">
            holes
          </span>
          <span className={`text-[11px] font-semibold mt-0.5 ${gameType === 18 ? "text-white/60" : "text-stone-400"}`}>
            Full round
          </span>
        </motion.button>
      </motion.fieldset>

      <div className="flex flex-col gap-3">
        <motion.button
          type="button"
          variants={itemVariants}
          className="rounded-full bg-primary hover:bg-primary/90 active:scale-[0.98] cursor-pointer transition-all flex items-center justify-center text-white font-bold text-sm h-12 px-5 w-full"
          onClick={onNext}
        >
          Continue
        </motion.button>
        <motion.button
          type="button"
          variants={itemVariants}
          className="rounded-full border-2 border-stone-200 hover:border-stone-300 active:scale-[0.98] cursor-pointer transition-all flex items-center justify-center text-stone-500 font-bold text-sm h-12 px-5 w-full"
          onClick={onPrev}
        >
          Back
        </motion.button>
      </div>
    </motion.div>
  )
}
