"use client"

import { Project } from "@/data/projects"
import { motion } from "framer-motion"
import { Calendar, Clock, Users, Code2, CheckCircle2, AlertCircle, PauseCircle } from "lucide-react"

interface ProjectDetailsProps {
    project: Project
}

export function ProjectDetails({ project }: ProjectDetailsProps) {
    const getStatusIcon = (status?: string) => {
        switch (status) {
            case "Terminé": return <CheckCircle2 className="text-green-500" />
            case "En cours": return <AlertCircle className="text-yellow-500" />
            case "En pause": return <PauseCircle className="text-gray-500" />
            default: return <CheckCircle2 className="text-[#4FD1C5]" />
        }
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Description & Tech Details (8 cols) */}
            <div className="lg:col-span-8 space-y-12">
                <section>
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <span className="w-8 h-1 bg-[#4FD1C5] rounded-full" />
                        À propos du projet
                    </h2>
                    <p className="text-gray-300 leading-relaxed text-lg whitespace-pre-line">
                        {project.longDescription}
                    </p>
                </section>

                {project.technicalDetails && (
                    <section className="bg-[#111111] border border-white/5 rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <Code2 className="text-[#4FD1C5]" />
                            Détails Techniques
                        </h2>
                        <p className="text-gray-400 leading-relaxed">
                            {project.technicalDetails}
                        </p>
                    </section>
                )}
            </div>

            {/* Right Column: Project Info (4 cols) */}
            <div className="lg:col-span-4 space-y-8">
                <div className="bg-[#111111] border border-white/5 rounded-2xl p-6 space-y-6">
                    <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-4">
                        Informations
                    </h3>

                    {/* Status */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-gray-400">
                            {getStatusIcon(project.status)}
                            <span>Statut</span>
                        </div>
                        <span className="font-medium text-white bg-white/5 px-3 py-1 rounded-lg">
                            {project.status || "Terminé"}
                        </span>
                    </div>

                    {/* Date */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-gray-400">
                            <Calendar size={20} />
                            <span>Date</span>
                        </div>
                        <span className="text-white">{project.date || "2024"}</span>
                    </div>

                    {/* Duration */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-gray-400">
                            <Clock size={20} />
                            <span>Durée</span>
                        </div>
                        <span className="text-white">{project.duration || "N/A"}</span>
                    </div>

                    {/* Role */}
                    <div className="space-y-2">
                        <div className="text-gray-400 text-sm uppercase tracking-wider font-bold">Rôle</div>
                        <div className="text-white font-medium">{project.role}</div>
                    </div>

                    {/* Stack */}
                    <div className="space-y-3">
                        <div className="text-gray-400 text-sm uppercase tracking-wider font-bold">Technologies</div>
                        <div className="flex flex-wrap gap-2">
                            {project.stack.map(tech => (
                                <span key={tech} className="text-xs px-3 py-1.5 rounded-lg bg-[#4FD1C5]/10 text-[#4FD1C5] border border-[#4FD1C5]/20">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Contributors */}
                    {project.contributors && project.contributors.length > 0 && (
                        <div className="space-y-3 pt-4 border-t border-white/10">
                            <div className="flex items-center gap-2 text-gray-400 text-sm uppercase tracking-wider font-bold">
                                <Users size={16} />
                                <span>Contributeurs</span>
                            </div>
                            <div className="space-y-2">
                                {project.contributors.map((contributor, idx) => (
                                    <a
                                        key={idx}
                                        href={contributor.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between group"
                                    >
                                        <span className="text-gray-300 group-hover:text-white transition-colors">{contributor.name}</span>
                                        <span className="text-xs text-gray-500 group-hover:text-[#4FD1C5] transition-colors">Voir GitHub</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
