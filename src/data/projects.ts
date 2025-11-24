export interface Project {
    slug: string
    title: string
    shortDescription: string
    longDescription: string
    role: string
    stack: string[]
    images: string[]
    video?: string
    github?: string
    link?: string
    date?: string
    status?: "Terminé" | "En cours" | "En pause"
    duration?: string
    contributors?: { name: string; github: string }[]
    technicalDetails?: string
    featured?: boolean
}

export const projects: Project[] = [
    {
        slug: "atlas",
        title: "Atlas",
        shortDescription: "Assistant vocal IA local ultra-rapide mêlant ASR, LLM, TTS et domotique.",
        longDescription: "Atlas est un assistant vocal IA de nouvelle génération, conçu pour fonctionner entièrement en local afin de garantir confidentialité et réactivité. S'affranchissant des écosystèmes fermés, il orchestre un pipeline audio complet intégrant détection de mot-clé (hotword), reconnaissance vocale (ASR Whisper), et synthèse vocale (TTS) modulable.\n\nAu-delà de la simple commande vocale, Atlas est une véritable intelligence ambiante connectée à son environnement via Home Assistant. Il offre une expérience conversationnelle fluide et naturelle (barge-in, contexte), tout en étant bâti sur une architecture modulaire prête pour le futur (mémoire long terme, analyse émotionnelle, routines adaptatives). Ce n'est pas un simple clone, mais une plateforme évolutive pensée pour grandir avec son utilisateur.",
        role: "Architecte Système & Développeur Fullstack",
        stack: ["Python", "LLM", "Function Tools", "ASR", "TTS"],
        images: ["/images/atlas-1.png"], // Placeholder
        github: "https://github.com/Walson-A",
        date: "2025-07",
        duration: "Projet long terme",
        status: "En cours",
        featured: true,
        technicalDetails: "Le défi majeur a été de concevoir un pipeline audio temps réel à faible latence capable de gérer simultanément le hotword, le VAD, la transcription et l'interruption (barge-in), le tout en local. L'architecture est strictement découplée : `asr.py` pour l'oreille, `llm.py` pour l'intelligence, et `tts.py` pour la voix, permettant une maintenance et une évolution indépendantes de chaque module.",
    },
    {
        slug: "stickhunt",
        title: "StickHunt",
        shortDescription: "Jeu multijoueur 3D type 'Prop Hunt' développé sous Unity.",
        longDescription: "StickHunt est un jeu multijoueur compétitif en 3D reprenant le concept populaire du 'Prop Hunt'. Les joueurs sont divisés en deux équipes : les 'Props', qui doivent se fondre dans le décor en imitant des objets physiques, et les 'Hunters', chargés de les débusquer avant la fin du temps imparti.\n\nInspiré par la physique décalée de Human Fall Flat et la tension de Dead by Daylight, le jeu propose une direction artistique unique et un gameplay émergent riche. Ce projet d'envergure a nécessité une gestion complexe du réseau pour synchroniser les états des joueurs et des objets en temps réel, tout en assurant une expérience fluide et immersive.",
        role: "Gameplay Developer & Sound Designer",
        stack: ["Unity", "C#"],
        images: ["/images/stickhunt-1.png", "/images/stickhunt-2.png", "/images/stickhunt-3.png", "/images/stickhunt-4.png", "/images/stickhunt-5.png", "/images/stickhunt-6.png", "/images/stickhunt-7.png"],  // Placeholder
        video: "https://www.youtube.com/watch?v=8nj42coQlKY",
        github: "https://github.com/Triple-III/StickHunt",
        link: "https://triple-iii.github.io/website/",
        date: "2023",
        duration: "10 mois",
        status: "Terminé",
        featured: true,
        contributors: [
            { name: "Walson René", github: "https://github.com/Walson-A" },
            { name: "Mathéo Chahwan", github: "https://github.com/capritkt" },
            { name: "Nicolas Lefevre Pontalis", github: "https://github.com/NicoLP04" },
            { name: "Lucas Peres", github: "https://github.com/xNarius" },
        ],
        technicalDetails: "Le développement multijoueur sous Unity a imposé un changement de paradigme complet par rapport au développement solo. La gestion de la réplication réseau, de la latence et de la synchronisation des objets physiques a été au cœur des défis techniques. L'architecture repose sur une séparation stricte entre la logique client (UI, sons, input) et la logique serveur (état du jeu, validation).",
    },
    {
        slug: "ocr-wss",
        title: "OCR Word Search Solver",
        shortDescription: "Pipeline OCR complet pour résoudre des mots cachés depuis une image.",
        longDescription: "OCR WSS est un système de vision par ordinateur capable de résoudre automatiquement des grilles de mots cachés à partir d'une simple photo. Développé entièrement en C sans bibliothèques de haut niveau (hormis SDL2), le projet implémente un pipeline complet : prétraitement d'image, détection de grille, segmentation des caractères, reconnaissance optique (OCR) via un réseau de neurones maison, et algorithme de résolution.\n\nCe projet démontre une maîtrise des algorithmes bas niveau de traitement d'image (projections, binarisation, détection de lignes) et une compréhension profonde des structures de données nécessaires pour manipuler efficacement des matrices de caractères et des dictionnaires.",
        role: "Développeur C & Computer Vision",
        stack: ["C", "SDL2", "Neural Networks", "Image Processing"],
        images: ["/images/ocr-wss-1.png"], // Placeholder
        github: "https://github.com/Walson-A",
        date: "2024",
        duration: "10 mois",
        status: "Terminé",
        featured: true,
        contributors: [
            { name: "Walson René", github: "https://github.com/Walson-A" },
            { name: "Baptiste De Sousa", github: "" },
            { name: "Sacha Radic", github: "" },
        ],
        technicalDetails: "La contrainte de n'utiliser que la SDL2 a nécessité l'implémentation manuelle d'algorithmes complexes de vision par ordinateur. La détection de grille robuste face aux rotations et au bruit, ainsi que la création d'un réseau de neurones optimisé (XNOR) pour la reconnaissance de caractères sur CPU, ont constitué les principaux défis techniques.",
    },
    {
        slug: "portfolio",
        title: "Portfolio Personnel",
        shortDescription: "Vitrine interactive moderne présentant mon parcours et mes projets.",
        longDescription: "Ce portfolio est une application web moderne conçue pour offrir une expérience utilisateur immersive et fluide. Il met en avant mes compétences techniques et créatives à travers une interface soignée, des animations subtiles et une navigation intuitive. \n\nAu-delà de la simple présentation, ce projet sert de terrain d'expérimentation pour les dernières technologies du web moderne (Next.js 14, Server Components, Framer Motion). Il intègre un système de gestion de contenu dynamique pour les projets, un mode sombre natif et une optimisation poussée pour le référencement et les performances.",
        role: "Développeur Fullstack & UI/UX Designer",
        stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "React"],
        images: [
            "/images/portfolio-1.png",
            "/images/portfolio-2.png",
            "/images/portfolio-3.png"
        ],
        github: "https://github.com/Walson-A/portfolio",
        link: "https://walson.dev",
        contributors: [
            { name: "Walson René", github: "https://github.com/Walson-A" }
        ],
        date: "2025",
        duration: "En continu",
        status: "En cours",
        featured: true,
        technicalDetails: "L'architecture est basée sur Next.js App Router pour tirer parti du rendu serveur (RSC) et optimiser le First Contentful Paint. L'utilisation intensive de Framer Motion permet des transitions fluides entre les pages et des micro-interactions engageantes sans compromettre les performances (Core Web Vitals).",
    }
]
