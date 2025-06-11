"use client"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Logo from "./icons/Logo.svg"

export default function Header() {
  const pathname = usePathname()
  const isScorecard = pathname.startsWith("/dashboard/game")

  return (
    <header
    className={`justify-items-start justify-between ${isScorecard && "flex flex-row w-full gap-4 items-center mt-4"}`}
    >
      <Link href="/">
        {isScorecard ? (
          <Logo className="w-24"></Logo>
        ) : (
          <Logo className="w-64"></Logo>
        )}
      </Link>
        {isScorecard && (
          <Link
            className="rounded-full border border-solid bg-primary border-transparent transition-colors flex items-center justify-center text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-bold text-sm sm:text-base h-8 sm:h-10 px-4 sm:px-5 sm:w-auto"
            href="/dashboard/new-game"
          >
            Start new round
          </Link>
        )}
    </header>
  )
}
