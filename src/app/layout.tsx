import "./globals.css";
import { Inter } from "next/font/google"
import { AtlasChat } from "@/components/atlas-chat"
import type { Metadata, Viewport } from "next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Walson Argan RENE | Portfolio",
  description: "Portfolio de Walson Argan RENE, étudiant ingénieur à l'EPITA",
  keywords: ["Développeur Fullstack", "Next.js", "React", "Python", "C", "C#", "EPITA", "Ingénieur Logiciel",
    "Portfolio", "Walson Argan RENE", "Walson RENE", "Walson", "René", "Portfolio Walson", "Walson Portfolio",
    "Walson Argan RENE Portfolio", "Walson RENE Portfolio", "Walson Portfolio", "René Portfolio",
    "Portfolio dev", "Portfolio Tech"],
  authors: [{ name: "Walson Argan RENE" }],
  openGraph: {
    title: "Walson Argan RENE | Portfolio",
    description: "Découvrez mes projets innovants et mon parcours technique.",
    url: "https://portfoliodeploy-iota.vercel.app/",
    siteName: "Walson Argan RENE | Portfolio",
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

export const viewport: Viewport = {
  themeColor: "#0D0D0D",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="bg-[#0D0D0D]">
      <body className={inter.className}>
        {children}
        <AtlasChat />
      </body>
    </html>
  )
}
