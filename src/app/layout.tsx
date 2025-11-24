import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Inter } from "next/font/google"
const inter = Inter({ subsets: ["latin"] })

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata = {
  title: "Walson Argan RENE | Développeur Fullstack & Ingénieur Logiciel",
  description: "Portfolio de Walson Argan RENE, étudiant ingénieur à l'EPITA. Expert en développement Web (Next.js), Mobile (React Native) et Systèmes (Rust/Python).",
  keywords: ["Développeur Fullstack", "Next.js", "React", "Rust", "Python", "EPITA", "Ingénieur Logiciel", "Portfolio"],
  authors: [{ name: "Walson Argan RENE" }],
  openGraph: {
    title: "Walson Argan RENE | Développeur Fullstack",
    description: "Découvrez mes projets innovants et mon parcours technique.",
    url: "https://walson.dev", // Placeholder URL
    siteName: "Walson Argan RENE Portfolio",
    images: [
      {
        url: "/images/og-image.jpg", // Placeholder image
        width: 1200,
        height: 630,
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
}

import { AtlasChat } from "@/components/atlas-chat"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        {children}
        <AtlasChat />
      </body>
    </html>
  )
}

