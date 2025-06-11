import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { usePathname } from "next/navigation"
import "./globals.css"
import Header from "@/app/components/Header"

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
})

export const metadata: Metadata = {
  title: "Birdie Board",
  description: "Golf scoring - made easy!",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) 
{
  return (
    <html lang="en">
      <body className={`${interSans.variable} antialiased`}>
        <main
        className="flex flex-col items-center justify-center min-h-screen">
          <div 
          className="flex flex-col gap-4"
          >
            <Header />
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}