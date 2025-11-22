"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { projects } from "@/data/projects"
import { ProjectCard } from "@/components/project-card"
import Link from "next/link"
import { Timeline } from "@/components/timeline"

function clamp(n: number, min = 0, max = 1) {
  return Math.max(min, Math.min(max, n))
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#E8E8E8] font-inter">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 flex justify-between items-center px-10 py-4 bg-opacity-40 backdrop-blur-md bg-[#0D0D0D]/60 z-50 border-b border-[#1F1F1F]">
        <h1 className="text-2xl font-bold text-[#4FD1C5]">Walson Argan RENE</h1>
        <ul className="flex space-x-8 text-sm">
          <li>
            <a href="#" className="hover:text-[#4FD1C5] transition-colors cursor-pointer">Accueil</a>
          </li>
          <li>
            <a href="#timeline" className="hover:text-[#4FD1C5] transition-colors cursor-pointer">Compétences</a>
          </li>
          <li>
            <a href="#projects" className="hover:text-[#4FD1C5] transition-colors cursor-pointer">Projets</a>
          </li>
          <li>
            <a href="#contact" className="hover:text-[#4FD1C5] transition-colors cursor-pointer">Contact</a>
          </li>
        </ul>
      </nav>

      {/* Hero */}
      <section className="flex flex-col justify-center items-center text-center h-screen px-6 relative overflow-hidden">
        {/* Animated Background Orbs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 2 }}
          className="absolute -top-32 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-[#4FD1C5]/30 blur-[120px]"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0.1, 0.15, 0.1],
            scale: [0.8, 1, 0.8],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 right-1/4 h-64 w-64 rounded-full bg-[#4FD1C5]/20 blur-[100px]"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0.08, 0.12, 0.08],
            scale: [0.9, 1.1, 0.9],
            x: [0, -40, 0],
            y: [0, 40, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-1/4 left-1/4 h-72 w-72 rounded-full bg-[#4FD1C5]/15 blur-[110px]"
        />

        {/* Content */}
        <div className="relative z-10 max-w-5xl">
          {/* Name with Cinematic Styling */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-black tracking-widest mb-8 text-white"
            style={{
              textShadow: "0 0 30px rgba(79, 209, 197, 0.5), 0 0 60px rgba(79, 209, 197, 0.3)",
              WebkitTextStroke: "1px rgba(79, 209, 197, 0.1)"
            }}
          >
            Walson Argan RENE
          </motion.h1>

          {/* Role Badge with Glassmorphism */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-block px-8 py-4 rounded-2xl border border-[#4FD1C5]/30 bg-[#0D0D0D]/60 backdrop-blur-xl mb-8"
            style={{ boxShadow: "0 0 20px rgba(79, 209, 197, 0.1)" }}
          >
            <span className="text-xl md:text-2xl font-bold text-[#4FD1C5] tracking-wide">
              Étudiant ingénieur à l'EPITA
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-4 leading-relaxed"
          >
            Passionné par le développement et la création numérique.
            <br className="hidden md:block" />
            J'aime comprendre, concevoir et donner vie à des projets à travers le code.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto mb-10"
          >
            Je cherche à renforcer mes compétences en développement au sein d'une entreprise,
            afin de gagner en expérience concrète et de participer à des projets réels.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a href="#projects">
              <Button
                className="bg-[#4FD1C5] text-[#0D0D0D] font-bold hover:bg-[#3CBFAF] px-8 py-6 text-lg transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(79,209,197,0.5)]"
              >
                Voir les projets
              </Button>
            </a>
            <a href="#contact">
              <Button
                className="bg-[#141414] text-[#E8E8E8] border-2 border-[#4FD1C5]/30 hover:bg-[#1A1A1A] hover:border-[#4FD1C5]/50 px-8 py-6 text-lg font-bold transition-all hover:scale-105"
              >
                Me contacter
              </Button>
            </a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            opacity: { delay: 1, duration: 0.8 },
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-gray-500 uppercase tracking-widest">Scroll</span>
          <svg
            className="w-6 h-6 text-[#4FD1C5]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </section>

      <section id="timeline" className="px-6 md:px-10 py-20">
        <h2
          className="text-4xl md:text-5xl font-black tracking-widest mb-16 text-center text-white"
          style={{
            textShadow: "0 0 30px rgba(79, 209, 197, 0.5), 0 0 60px rgba(79, 209, 197, 0.3)",
            WebkitTextStroke: "1px rgba(79, 209, 197, 0.1)"
          }}
        >
          Parcours
        </h2>
        <Timeline />
      </section>

      {/* Projets */}
      <section id="projects" className="px-10 py-20 text-center">
        <h2
          className="text-4xl md:text-5xl font-black tracking-widest mb-16 text-white"
          style={{
            textShadow: "0 0 30px rgba(79, 209, 197, 0.5), 0 0 60px rgba(79, 209, 197, 0.3)",
            WebkitTextStroke: "1px rgba(79, 209, 197, 0.1)"
          }}
        >
          Projets
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.slice(0, 3).map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        <div className="mt-10">
          <Link href="/projects">
            <Button className="bg-[#4FD1C5] text-black hover:bg-[#3CBFAF]">Voir tous les projets</Button>
          </Link>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="px-10 py-20 text-center">
        <h2
          className="text-4xl md:text-5xl font-black tracking-widest mb-8 text-white"
          style={{
            textShadow: "0 0 30px rgba(79, 209, 197, 0.5), 0 0 60px rgba(79, 209, 197, 0.3)",
            WebkitTextStroke: "1px rgba(79, 209, 197, 0.1)"
          }}
        >
          Contact
        </h2>
        <p className="text-gray-400 mb-8">
          Une idée, une collaboration ou un retour ? Écrivez-moi.
        </p>

        <div className="flex justify-center items-center gap-16">
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/walson-rené"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full"
          >
            <svg
              viewBox="0 0 24 24"
              fill="#4FD1C5"
              className="w-full h-full transition-transform duration-300 hover:scale-110"
              style={{ filter: "drop-shadow(0 0 18px #4FD1C5)" }}
            >
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.026-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.838-1.563 3.036 0 3.6 2 3.6 4.594v5.602z" />
            </svg>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/Walson-A"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full"
          >
            <svg
              viewBox="0 0 24 24"
              fill="#4FD1C5"
              className="w-full h-full transition-transform duration-300 hover:scale-110"
              style={{ filter: "drop-shadow(0 0 18px #4FD1C5)" }}
            >
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.332-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.371.823 1.102.823 2.222v3.293c0 .322.218.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </a>

          {/* Mail */}
          <a
            href="mailto:walson.a.rene@gmail.com"
            className="w-10 h-10 flex items-center justify-center rounded-full"
          >
            <svg
              viewBox="0 0 24 24"
              fill="#4FD1C5"
              className="w-full h-full transition-transform duration-300 hover:scale-110"
              style={{ filter: "drop-shadow(0 0 18px #4FD1C5)" }}
            >
              <path d="M12 13.065l-11.99-7.065v14h23.98v-14zm11.99-9.065h-23.98l11.99 7.065z" />
            </svg>
          </a>
        </div>
      </section>

      <footer className="text-center py-6 text-gray-600 text-sm border-t border-[#1F1F1F]">
        © 2025 Walson Argan RENE — Portfolio personnel
      </footer>
    </div>
  )
}
