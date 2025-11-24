"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { ProjectCard } from "@/components/project-card"
import { ProjectFilters } from "@/components/project-filters"
import { projects as allProjects } from "@/data/projects"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function ProjectsPage() {
    const [filteredProjects, setFilteredProjects] = useState(allProjects)

    return (
        <div className="min-h-screen bg-[#0A0A0A]">
            <Navbar />

            <main className="container mx-auto px-6 pt-36 pb-20">
                {/* Header */}
                <div className="text-center mb-16">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-[#4FD1C5] transition-colors mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Retour à l'accueil
                    </Link>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-bold mb-6"
                    >
                        <span className="text-white">Mes</span> <span className="text-[#4FD1C5]">Projets</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-400 max-w-2xl mx-auto text-lg"
                    >
                        Une collection de mes travaux récents, allant du développement web aux applications mobiles et systèmes embarqués.
                    </motion.p>
                </div>

                {/* Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <ProjectFilters projects={allProjects} onFilterChange={setFilteredProjects} />
                </motion.div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project, index) => (
                        <motion.div
                            key={project.slug}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                        >
                            <ProjectCard project={project} />
                        </motion.div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredProjects.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">Aucun projet ne correspond à votre recherche.</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-4 text-[#4FD1C5] hover:underline"
                        >
                            Réinitialiser les filtres
                        </button>
                    </div>
                )}
            </main>

            <footer className="text-center py-8 text-gray-600 text-sm border-t border-[#1F1F1F] mt-20">
                © 2025 Walson Argan RENE — Portfolio personnel
            </footer>
        </div>
    )
}
