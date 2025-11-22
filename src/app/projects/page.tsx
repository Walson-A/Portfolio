import { projects } from "@/data/projects"
import { ProjectCard } from "@/components/project-card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ProjectsPage() {
    return (
        <div className="min-h-screen bg-[#0D0D0D] text-[#E8E8E8] font-inter p-10">
            <nav className="mb-10 flex justify-between items-center">
                <Link href="/">
                    <Button variant="ghost" className="text-[#4FD1C5] hover:text-[#3CBFAF] hover:bg-[#1F1F1F]">
                        ← Retour à l'accueil
                    </Button>
                </Link>
            </nav>

            <header className="mb-16 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#4FD1C5]">Mes Projets</h1>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                    Découvrez une sélection de mes travaux récents, alliant technique, créativité et résolution de problèmes.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {projects.map((project) => (
                    <ProjectCard key={project.slug} project={project} />
                ))}
            </div>
        </div>
    )
}
