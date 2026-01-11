"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Project } from "@/data/projects"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

interface ProjectCardProps {
    project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
    return (
        <Link href={`/projects/${project.slug}`} className="block h-full group">
            <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="h-full will-change-transform"
            >
                <Card className="h-full bg-gradient-to-br from-[#111111] to-[#0D0D0D] border border-white/10 text-[#E8E8E8] transition-all duration-300 hover:border-[#4FD1C5]/50 hover:shadow-[0_0_30px_rgba(79,209,197,0.2)] cursor-pointer overflow-hidden flex flex-col relative">
                    {/* Project Image Preview */}
                    <div className="relative h-48 w-full overflow-hidden border-b border-white/5 bg-[#0D0D0D]">
                        {/* Blurred background to fill space */}
                        <Image
                            src={project.images[0]}
                            alt=""
                            fill
                            className="object-cover blur-xl opacity-20 scale-110"
                        />
                        {/* Main Thumbnail */}
                        <Image
                            src={project.images[0]}
                            alt={project.title}
                            fill
                            className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />
                    </div>

                    {/* Subtle glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#4FD1C5]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    <CardContent className="p-6 flex flex-col flex-grow relative z-10">
                        {/* Header with title and arrow */}
                        <div className="flex items-start justify-between mb-3">
                            <h4 className="text-xl font-bold text-white group-hover:text-[#4FD1C5] transition-colors leading-tight flex-1">
                                {project.title}
                            </h4>
                            <ArrowUpRight
                                size={20}
                                className="text-gray-500 group-hover:text-[#4FD1C5] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 flex-shrink-0 ml-2"
                            />
                        </div>

                        {/* Description */}
                        <p className="text-gray-400 text-sm mb-6 flex-grow leading-relaxed">
                            {project.shortDescription}
                        </p>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-2 mt-auto">
                            {project.stack.slice(0, 3).map((tech) => (
                                <span
                                    key={tech}
                                    className="text-xs px-3 py-1.5 rounded-lg bg-white/5 text-[#4FD1C5] border border-[#4FD1C5]/20 font-medium backdrop-blur-sm"
                                >
                                    {tech}
                                </span>
                            ))}
                            {project.stack.length > 3 && (
                                <span className="text-xs px-3 py-1.5 rounded-lg bg-white/5 text-gray-500 border border-white/10 font-medium">
                                    +{project.stack.length - 3}
                                </span>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </Link>
    )
}
