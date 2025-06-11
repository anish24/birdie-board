"use client"  
import { motion } from "framer-motion"
import { containerVariants, itemVariants } from "@/lib/animations"

export default function Home() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="flex flex-col gap-[16px] row-start-2 items-start">
        <motion.h2 variants={itemVariants} className="text-3xl font-black text-green-600">Golf Scoring - Made Easy.</motion.h2>
        <motion.p
        variants={itemVariants} 
        className="text-md font-medium">
          Track your round easily and keep scores for friends.
        </motion.p>
        <motion.ul variants={itemVariants} className="list-inside list-disc text-sm/6 sm:text-left">
          <li className="tracking-[-.01em]">Fast score tracking</li>
          <li className="tracking-[-.01em]">Support for 9 and 18 hole games</li>
          <li className="tracking-[-.01em]">Multi-player support</li>
          <li className="tracking-[-.01em]">Mobile Friendly</li>
        </motion.ul>

          <motion.a
            className="rounded-full border border-solid bg-secondary hover:bg-primary border-transparent transition-colors flex items-center justify-center text-background gap-2 dark:hover:bg-[#ccc] font-bold text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full md:w-full"
            href="/dashboard/new-game"
            variants={itemVariants}
          >
            Start a game
          </motion.a>
      </motion.div>
    </motion.div>
  )
}