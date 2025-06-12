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
  const baseButtonClass =
    "rounded-small border border-solid cursor-pointer transition-colors flex flex items-center justify-center text-background gap-2 hover:bg-[#383838] font-bold text-sm sm:text-base h-10 sm:h-12 px-4 w-1/2"
  return (
    <motion.div
          className="flex flex-col gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
      <motion.h1
        className="text-3xl font-black text-primary tracking-[-.01em]"
        variants={itemVariants}
      >
        How many holes?
      </motion.h1>

      <motion.fieldset
        className="flex flex-row items-center gap-4"
        aria-label="Select game type"
        variants={itemVariants}
      >
        <motion.button
          type="button"
          className={`${baseButtonClass} ${
            gameType === 9 ? "bg-primary border-secondary" : "bg-secondary"
          }`}
          onClick={() => setGameType(9)}
        >
          9 Holes
        </motion.button>
        <motion.button
          type="button"
          className={`${baseButtonClass} ${
            gameType === 18 ? "bg-primary border-secondary" : "bg-secondary"
          }`}
          onClick={() => setGameType(18)}
        >
          18 Holes
        </motion.button>
      </motion.fieldset>

        <motion.button
          type="button"
          variants={itemVariants}
          className="rounded-full cursor-pointer border border-solid bg-primary hover:bg-secondary border-transparent transition-colors flex items-center justify-center text-background gap-2 font-bold text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full md:w-full"
          onClick={onNext}
        >
          Next
        </motion.button>
        <motion.button
          type="button"
          variants={itemVariants}
          className="rounded-full cursor-pointer border-solid bg-transparent text-secondary hover:bg-secondary hover:text-white border-2 border-secondary transition-colors flex items-center justify-center gap-2 font-bold text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full md:w-full"
          onClick={onPrev}
        >
          Previous
        </motion.button>
        
    </motion.div>
  )
}
