import "./globals.css";
import { Inter } from "next/font/google"
import { AtlasChatWrapper } from "@/components/chat-wrapper"
import type { Metadata, Viewport } from "next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "Walson Argan RENE | Portfolio",
  description: "Portfolio de Walson Argan RENE, étudiant ingénieur à l'EPITA",
  keywords: ["Développeur Fullstack", "Next.js", "React", "Python", "C", "C#", "EPITA", "Ingénieur Logiciel",
    "Portfolio", "Walson Argan RENE", "Walson RENE", "Walson", "René", "Portfolio Walson", "Walson Portfolio",
    "Walson Argan RENE Portfolio", "Walson RENE Portfolio", "Walson Portfolio", "René Portfolio",
    "Portfolio dev", "Portfolio Tech"],
  authors: [{ name: "Walson Argan RENE", url: "https://walsondev.com" }],
  creator: "Walson Argan RENE",
  publisher: "Walson Argan RENE",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico", // Ideally a 180x180 PNG
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Walson Argan RENE | Portfolio",
    description: "Découvrez mes projets innovants et mon parcours technique.",
    url: "https://walsondev.com/",
    siteName: "Walson Argan RENE | Portfolio",
    images: [
      {
        url: "/images/photo.jpg", // Using professional photo since og-image is missing
        width: 800,
        height: 800,
        alt: "Walson Argan RENE",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Walson Argan RENE | Portfolio",
    description: "Découvrez mes projets innovants et mon parcours technique.",
    images: ["/images/photo.jpg"],
    creator: "@Walson_A", // Assuming standard handle
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
        <AtlasChatWrapper />
      </body>
    </html>
  )
}
