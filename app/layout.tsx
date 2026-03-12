import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/app/components/Header"

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
})

export const metadata: Metadata = {
  title: "Birdie Board",
  description: "Golf scoring - made easy!",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${interSans.variable} antialiased`}>
        <main className="flex flex-col items-center min-h-svh">
          <div className="flex flex-col w-full max-w-sm px-5 pt-6 pb-16 gap-8">
            <Header />
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
