import { projects } from "@/data/projects"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface ProjectPageProps {
    params: Promise<{
        slug: string
    }>
}

export function generateStaticParams() {
    return projects.map((project) => ({
        slug: project.slug,
    }))
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { slug } = await params
    const project = projects.find((p) => p.slug === slug)

    if (!project) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-[#0D0D0D] text-[#E8E8E8] font-inter p-6 md:p-10">
            <nav className="mb-10 max-w-4xl mx-auto">
                <Link href="/projects">
                    <Button variant="ghost" className="text-[#4FD1C5] hover:text-[#3CBFAF] hover:bg-[#1F1F1F]">
                        ← Retour aux projets
                    </Button>
                </Link>
            </nav>

            <main className="max-w-4xl mx-auto">
                <header className="mb-10 border-b border-[#1F1F1F] pb-10">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#E8E8E8]">{project.title}</h1>
                    <div className="flex flex-wrap items-center gap-4 text-gray-400 mb-6">
                        <span className="text-[#4FD1C5] font-medium">{project.role}</span>
                        <span>•</span>
                        <div className="flex flex-wrap gap-2">
                            {project.stack.map((tech) => (
                                <span
                                    key={tech}
                                    className="text-xs px-2 py-1 rounded-md bg-[#1F1F1F] text-gray-300 border border-[#2A2A2A]"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                    <p className="text-xl text-gray-300 leading-relaxed">
                        {project.shortDescription}
                    </p>
                </header>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4 text-[#4FD1C5]">À propos du projet</h2>
                    <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                        {project.longDescription}
                    </p>
                </section>

                <div className="flex gap-4 mb-12">
                    {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <Button className="bg-[#1F1F1F] text-[#E8E8E8] border border-[#2A2A2A] hover:bg-[#2A2A2A] hover:border-[#4FD1C5]">
                                Voir sur GitHub
                            </Button>
                        </a>
                    )}
                    {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                            <Button className="bg-[#4FD1C5] text-[#0D0D0D] hover:bg-[#3CBFAF]">
                                Voir le site
                            </Button>
                        </a>
                    )}
                </div>

                <section className="space-y-8">
                    {project.images.map((img, index) => (
                        <div key={index} className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden border border-[#1F1F1F]">
                            <Image
                                src={img}
                                alt={`${project.title} screenshot ${index + 1}`}
                                fill
                                className="object-cover"
                            />
                        </div>
                    ))}
                </section>
            </main>
        </div>
    )
}
