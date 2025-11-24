export type EventType = "project" | "school" | "work"

export interface TimelineEvent {
    year: number
    type: EventType
    label: string
    subtitle?: string
    description?: string
    images?: string[]
    slug?: string
    location?: string
    tags?: string[]
}

export const timelineEvents: TimelineEvent[] = [
    {
        year: 2023,
        type: "project",
        label: "StickHunt",
        subtitle: "Jeu vidéo multijoueur",
        description: "Jeu de cache-cache multijoueur en temps réel développé avec Unity et C#.",
        slug: "stickhunt",
        tags: ["Unity", "C#", "Multiplayer", "Game Design"],
        images: [
            "https://placehold.co/600x400/1a1a1a/4FD1C5/png?text=StickHunt+1",
            "https://placehold.co/600x400/1a1a1a/4FD1C5/png?text=StickHunt+2",
            "https://placehold.co/600x400/1a1a1a/4FD1C5/png?text=StickHunt+3"
        ]
    },
    {
        year: 2024,
        type: "project",
        label: "OCR Word Search",
        subtitle: "Projet C de reconnaissance de grilles",
        description: "Algorithme de vision par ordinateur pour résoudre des mots mêlés.",
        slug: "ocr-wss",
        tags: ["C", "OCR", "Image Processing", "Algorithms"],
        images: [
            "https://placehold.co/600x400/1a1a1a/4FD1C5/png?text=OCR+1",
            "https://placehold.co/600x400/1a1a1a/4FD1C5/png?text=OCR+2"
        ]
    },
    {
        year: 2025,
        type: "school",
        label: "Semestre d’échange – TEC Monterrey",
        subtitle: "Mexique",
        description: "Immersion internationale et cours d'ingénierie avancée.",
        location: "Guadalajara, Mexique",
        tags: ["International", "Engineering", "Spanish", "Culture"],
        images: [
            "https://placehold.co/600x400/1a1a1a/F6E05E/png?text=TEC+Monterrey+1",
            "https://placehold.co/600x400/1a1a1a/F6E05E/png?text=TEC+Monterrey+2"
        ]
    },
    {
        year: 2025,
        type: "project",
        label: "Atlas",
        subtitle: "Assistant vocal IA",
        description: "Assistant intelligent modulaire intégrant STT, LLM et TTS.",
        slug: "atlas",
        tags: ["Python", "LLM", "TTS/STT", "Voice AI"],
        images: [
            "https://placehold.co/600x400/1a1a1a/4FD1C5/png?text=Atlas+1",
            "https://placehold.co/600x400/1a1a1a/4FD1C5/png?text=Atlas+2"
        ]
    },
    {
        year: 2025,
        type: "project",
        label: "Portfolio",
        subtitle: "Portfolio développeur",
        description: "Site personnel développé avec Next.js, TypeScript et Tailwind.",
        slug: "portfolio",
        tags: ["Next.js", "React", "TypeScript", "Tailwind"],
        images: [
            "https://placehold.co/600x400/1a1a1a/4FD1C5/png?text=Portfolio+1",
            "https://placehold.co/600x400/1a1a1a/4FD1C5/png?text=Portfolio+2"
        ]
    }
]
