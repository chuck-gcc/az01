// app/layout.tsx

import type { Metadata } from "next"
import { Geist, Geist_Mono, Permanent_Marker, Anton } from "next/font/google"

import "./globals.css"
import Navbar from "@/app/components/Navbar"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const graffiti = Permanent_Marker({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-graffiti',
})

const fashion = Anton({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-fashion',
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Réseau Nomade",
  description: "Trouve ton spot de travail transfrontalier connecté.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="scroll-smooth h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-black text-white antialiased min-h-screen relative overflow-x-hidden`}
        style={{
          backgroundImage: "radial-gradient(circle at 20% 30%, #0ff2 0%, transparent 60%), radial-gradient(circle at 80% 70%, #0ff1 0%, transparent 60%)",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Navbar />
        <main className="relative pt-20 z-10">{children}</main>
      </body>
    </html>
  )
}
