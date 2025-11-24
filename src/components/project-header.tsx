"use client"

import { motion } from "framer-motion"
import { Github, Globe, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Project } from "@/data/projects"

interface ProjectHeaderProps {
    project: Project
}

export function ProjectHeader({ project }: ProjectHeaderProps) {
    return (
        <div className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
            {/* Background Image with Blur */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D]/80 via-[#0D0D0D]/90 to-[#0D0D0D] z-10" />
                <img
                    src={project.images[0]}
                    alt={project.title}
                    className="w-full h-full object-cover blur-sm opacity-50 scale-105"
                />
            </div>

            {/* Content */}
            <div className="relative z-20 max-w-5xl mx-auto px-6 text-center space-y-8 mt-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <Link
                        href="/projects"
                        className="inline-flex items-center text-gray-400 hover:text-[#4FD1C5] transition-colors mb-8 group"
                    >
                        <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                        Retour aux projets
                    </Link>

                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6">
                        {project.title}
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        {project.shortDescription}
                    </p>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="flex flex-wrap items-center justify-center gap-4"
                >
                    {/* GitHub Button - Always visible if link exists */}
                    {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative flex items-center gap-3 px-8 py-4 rounded-full bg-[#1A1A1A] text-white font-bold border border-white/10 overflow-hidden transition-all hover:border-[#4FD1C5]/50 hover:shadow-[0_0_20px_rgba(79,209,197,0.15)]"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-[#4FD1C5]/0 via-[#4FD1C5]/10 to-[#4FD1C5]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                            <Github size={20} className="text-gray-400 group-hover:text-[#4FD1C5] transition-colors" />
                            <span className="relative z-10">Voir sur GitHub</span>
                        </a>
                    )}

                    {/* Live Site Button - Only for StickHunt and Portfolio */}
                    {(project.slug === "stickhunt" || project.slug === "portfolio") && (
                        <Link
                            href={project.slug === "portfolio" ? "/" : (project.link || "#")}
                            target={project.slug === "portfolio" ? "_self" : "_blank"}
                            className="group relative flex items-center gap-3 px-8 py-4 rounded-full bg-[#4FD1C5] text-[#0D0D0D] font-bold shadow-[0_0_20px_rgba(79,209,197,0.3)] overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(79,209,197,0.5)]"
                        >
                            <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
                            <Globe size={20} strokeWidth={2.5} />
                            <span className="relative z-10">Voir le site</span>
                        </Link>
                    )}
                </motion.div>
            </div>
        </div>
    )
}
