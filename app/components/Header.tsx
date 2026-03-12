"use client"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Logo from "./icons/Logo.svg"

export default function Header() {
  const pathname = usePathname()
  const isScorecard = pathname.startsWith("/dashboard/game")

  return (
    <header className="flex flex-row items-center justify-between w-full">
      <Link href="/">
        {isScorecard ? (
          <Logo className="w-20" />
        ) : (
          <Logo className="w-44" />
        )}
      </Link>
      {isScorecard && (
        <Link
          className="rounded-full bg-primary hover:bg-primary/90 active:scale-[0.98] transition-all flex items-center justify-center text-white font-bold text-xs h-8 px-4"
          href="/dashboard/new-game"
        >
          New round
        </Link>
      )}
    </header>
  )
}
