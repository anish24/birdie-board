"use client"
import { motion } from "framer-motion"
import { containerVariants, itemVariants } from "@/lib/animations"
import { Check, ArrowRight } from "lucide-react"

const features = [
  "Fast, distraction-free score tracking",
  "9 and 18 hole game support",
  "Up to 4 players per round",
  "Mobile-first, built for the course",
]

export default function Home() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-8 pt-2"
    >
      <motion.div variants={itemVariants} className="flex flex-col gap-4">
        <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
          Golf Scoring
        </span>
        <h2 className="text-[2.75rem] font-black leading-[0.92] tracking-tight text-foreground">
          Made for<br />the course.
        </h2>
        <p className="text-[15px] text-stone-500 leading-relaxed font-medium">
          Simple, fast score tracking for your round. No sign-up. No fuss.
        </p>
      </motion.div>

      <motion.ul variants={itemVariants} className="flex flex-col gap-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-3">
            <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Check className="w-3 h-3 text-primary" strokeWidth={3} />
            </span>
            <span className="text-sm font-medium text-stone-700">{feature}</span>
          </li>
        ))}
      </motion.ul>

      <motion.a
        className="rounded-full bg-primary hover:bg-primary/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-white font-bold text-sm h-12 px-5 w-full"
        href="/dashboard/new-game"
        variants={itemVariants}
      >
        Start a game
        <ArrowRight className="w-4 h-4" />
      </motion.a>
    </motion.div>
  )
}
