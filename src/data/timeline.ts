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
        description: "Jeu 3D multijoueur de type 'prop-hunt' en temps réel développé avec Unity et C#.",
        slug: "stickhunt",
        tags: ["Unity", "C#", "Multiplayer", "Game Design"],
    },
    {
        year: 2024,
        type: "project",
        label: "OCR WSS",
        subtitle: "Logiciel OCR en C",
        description: "Logiciel de résolution automatique de grilles de mots cachés.",
        slug: "ocr-wss",
        tags: ["C", "OCR", "Image Processing", "Algorithms"],
    },
    {
        year: 2025,
        type: "school",
        label: "Semestre d’échange",
        subtitle: "TEC de Monterrey",
        description: "Immersion internationale dans la prestigieuse université de TEC de Monterrey.",
        location: "Guadalajara, Mexique 🇲🇽",
        tags: ["International", "Engineering", "Spanish", "Culture"],
        images: [
            "/images/tec-1.jpg",
            "/images/tec-2.jpg",
            "/images/tec-3.jpg",
        ]
    },
    {
        year: 2025,
        type: "project",
        label: "Atlas",
        subtitle: "Assistant vocal IA",
        description: "Assistant intelligent local et modulaire intégrant ASR, LLM et TTS.",
        slug: "atlas",
        tags: ["Python", "LLM", "ASR", "TTS", "Voice AI"],
    },
    {
        year: 2025,
        type: "project",
        label: "Portfolio",
        subtitle: "Portfolio personnel",
        description: "Site personnel moderne et responsive développé avec Next.js, TypeScript et Tailwind.",
        slug: "portfolio",
        tags: ["Next.js", "TypeScript", "Tailwind"],
    },
    {
        year: 2025,
        type: "project",
        label: "Passer",
        subtitle: "Pont PC / iOS",
        description: "Utilitaire de synchronisation presse-papiers et fichiers entre Windows et iOS.",
        slug: "passer",
        tags: ["Rust", "Tauri", "React", "iOS Shortcuts"],
    },
]
