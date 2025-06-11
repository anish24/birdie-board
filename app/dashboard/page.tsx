"use client"
import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { containerVariants, itemVariants } from "@/lib/animations"

export default function DashboardPage() {
  return (
    <motion.div
      className="flex flex-col items-center gap-3 justify-center h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 variants={itemVariants} className="text-4xl font-bold">
        Dashboard
      </motion.h1>

      <motion.p variants={itemVariants} className="mt-4 text-lg">
        Welcome to your dashboard!
      </motion.p>

      {/* Wrap each button individually */}
      <div className="flex flex-row gap-4">
        <motion.div variants={itemVariants}>
          <Link
            className="rounded-full border border-solid bg-lime-500 border-transparent transition-colors flex items-center justify-center text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-bold text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto md:w-[200px]"
            href="/dashboard/new-game"
          >
            Start new round
          </Link>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Link
            className="rounded-full border border-solid border-lime-500 dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-bold text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[200px]"
            href="/dashboard/history"
          >
            Round history
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
}