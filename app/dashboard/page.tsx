"use client"
import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { containerVariants, itemVariants } from "@/lib/animations"
import { Flag, Clock } from "lucide-react"

export default function DashboardPage() {
  return (
    <motion.div
      className="flex flex-col gap-8 pt-2"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="flex flex-col gap-2">
        <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
          Dashboard
        </span>
        <h1 className="text-[2.75rem] font-black leading-[0.92] tracking-tight">
          Welcome<br />back.
        </h1>
      </motion.div>

      <div className="flex flex-col gap-3">
        <motion.div variants={itemVariants}>
          <Link
            className="rounded-full bg-primary hover:bg-primary/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 text-white font-bold text-sm h-12 px-5 w-full"
            href="/dashboard/new-game"
          >
            <Flag className="w-4 h-4" />
            Start new round
          </Link>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Link
            className="rounded-full border-2 border-stone-200 hover:border-stone-300 active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 text-stone-600 font-bold text-sm h-12 px-5 w-full"
            href="/dashboard/history"
          >
            <Clock className="w-4 h-4" />
            Round history
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
}
