import { projects } from "@/data/projects"
import { Navbar } from "@/components/navbar"
import { ProjectHeader } from "@/components/project-header"
import { ProjectCarousel } from "@/components/project-carousel"
import { ProjectDetails } from "@/components/project-details"
import { notFound } from "next/navigation"
import Link from "next/link"

interface ProjectPageProps {
    params: {
        slug: string
    }
}

export function generateStaticParams() {
    return projects.map((project) => ({
        slug: project.slug,
    }))
}

export default function ProjectPage({ params }: ProjectPageProps) {
    const projectIndex = projects.findIndex((p) => p.slug === params.slug)
    const project = projects[projectIndex]

    if (!project) {
        notFound()
    }

    const prevProject = projects[projectIndex - 1]
    const nextProject = projects[projectIndex + 1]

    return (
        <div className="min-h-screen bg-[#0D0D0D] text-[#E8E8E8] font-inter selection:bg-[#4FD1C5]/30">
            <Navbar />

            <main>
                {/* Immersive Header */}
                <ProjectHeader project={project} />

                <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 space-y-20">
                    {/* Media Carousel */}
                    <section>
                        <ProjectCarousel images={project.images} video={project.video} />
                    </section>

                    {/* Details & Info */}
                    <ProjectDetails project={project} />

                    {/* Next/Prev Navigation */}
                    <div className="flex justify-between items-center pt-20 border-t border-white/10">
                        {prevProject ? (
                            <Link
                                href={`/projects/${prevProject.slug}`}
                                className="group flex flex-col gap-2 text-left"
                            >
                                <span className="text-sm text-gray-500 uppercase tracking-wider group-hover:text-[#4FD1C5] transition-colors">Projet Précédent</span>
                                <span className="text-xl font-bold text-white group-hover:translate-x-2 transition-transform">{prevProject.title}</span>
                            </Link>
                        ) : <div />}

                        {nextProject ? (
                            <Link
                                href={`/projects/${nextProject.slug}`}
                                className="group flex flex-col gap-2 text-right"
                            >
                                <span className="text-sm text-gray-500 uppercase tracking-wider group-hover:text-[#4FD1C5] transition-colors">Projet Suivant</span>
                                <span className="text-xl font-bold text-white group-hover:-translate-x-2 transition-transform">{nextProject.title}</span>
                            </Link>
                        ) : <div />}
                    </div>
                </div>
            </main>

            <footer className="text-center py-8 text-gray-600 text-sm border-t border-[#1F1F1F] mt-20">
                © 2025 Walson Argan RENE — Portfolio personnel
            </footer>
        </div>
    )
}
