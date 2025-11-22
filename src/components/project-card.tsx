"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Project } from "@/data/projects"
import Link from "next/link"

// I'll check if Badge exists, if not I'll use a span with tailwind classes.
// Looking at the file list earlier, I didn't see badge.tsx in components/ui.
// I will use standard HTML/Tailwind for badges to be safe.

interface ProjectCardProps {
    project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
    return (
        <Link href={`/projects/${project.slug}`} className="block h-full">
            <Card className="h-full bg-[#111111] border-[#1F1F1F] text-[#E8E8E8] transition-all duration-300 hover:scale-[1.02] hover:border-[#4FD1C5] hover:shadow-[0_0_15px_rgba(79,209,197,0.3)] cursor-pointer overflow-hidden flex flex-col">
                <CardContent className="p-6 flex flex-col flex-grow">
                    <h4 className="text-xl font-semibold mb-2 text-[#E8E8E8] group-hover:text-[#4FD1C5] transition-colors">
                        {project.title}
                    </h4>
                    <p className="text-gray-400 text-sm mb-4 flex-grow">
                        {project.shortDescription}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                        {project.stack.slice(0, 3).map((tech) => (
                            <span
                                key={tech}
                                className="text-xs px-2 py-1 rounded-md bg-[#1F1F1F] text-[#4FD1C5] border border-[#2A2A2A]"
                            >
                                {tech}
                            </span>
                        ))}
                        {project.stack.length > 3 && (
                            <span className="text-xs px-2 py-1 rounded-md bg-[#1F1F1F] text-gray-500 border border-[#2A2A2A]">
                                +{project.stack.length - 3}
                            </span>
                        )}
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}
