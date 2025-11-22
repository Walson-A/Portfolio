export interface Project {
    slug: string
    title: string
    shortDescription: string
    longDescription: string
    role: string
    stack: string[]
    images: string[]
    github?: string
    link?: string
}

export const projects: Project[] = [
    {
        slug: "joinsparks",
        title: "JoinSparks",
        shortDescription: "Plateforme web de prise de rendez-vous pour studios.",
        longDescription: "JoinSparks est une plateforme innovante conçue pour simplifier la gestion et la réservation de studios d'enregistrement. Le projet visait à offrir une expérience utilisateur fluide pour les artistes et les propriétaires de studios, en intégrant un calendrier dynamique, un système de paiement sécurisé et une messagerie instantanée. J'ai travaillé sur l'architecture front-end, en m'assurant que l'interface soit réactive et intuitive.",
        role: "Développeur front-end",
        stack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
        images: ["/images/joinsparks-1.png"],
        github: "https://github.com/Walson-A/joinsparks",
        link: "https://joinsparks.com"
    },
    {
        slug: "stickhunt",
        title: "StickHunt",
        shortDescription: "Jeu multijoueur en temps réel sur navigateur.",
        longDescription: "StickHunt est un jeu de cache-cache multijoueur en 2D où les joueurs incarnent des objets ou des chasseurs. Le défi technique principal était la synchronisation en temps réel des mouvements et des actions des joueurs. Nous avons utilisé WebSockets pour assurer une latence minimale et une expérience de jeu fluide. Mon rôle s'est concentré sur la logique de jeu côté client et l'optimisation des performances de rendu.",
        role: "Développeur Fullstack",
        stack: ["React", "Node.js", "Socket.io", "Canvas API"],
        images: ["/images/stickhunt-1.png"],
        github: "https://github.com/Walson-A/stickhunt"
    },
    {
        slug: "atlas",
        title: "Atlas",
        shortDescription: "Assistant vocal intelligent modulaire.",
        longDescription: "Atlas est un assistant vocal conçu pour être modulaire et extensible. Il intègre la reconnaissance vocale, le traitement du langage naturel via des LLM locaux, et la synthèse vocale. L'architecture permet d'ajouter facilement de nouvelles 'compétences' ou modules. J'ai conçu le noyau du système et l'intégration des différents modules d'IA, en mettant l'accent sur la confidentialité des données et la performance locale.",
        role: "Architecte Logiciel & Développeur Python",
        stack: ["Python", "OpenAI API", "Whisper", "TTS"],
        images: ["/images/atlas-1.png"],
        github: "https://github.com/Walson-A/atlas"
    },
    {
        slug: "synk",
        title: "Synk",
        shortDescription: "Outil de synchronisation de fichiers peer-to-peer.",
        longDescription: "Synk est un utilitaire en ligne de commande permettant la synchronisation de dossiers entre plusieurs machines sans passer par un serveur central. Il utilise des protocoles P2P pour le transfert de données, garantissant rapidité et confidentialité. J'ai travaillé sur l'implémentation du protocole de découverte des pairs et la gestion des conflits de fichiers.",
        role: "Développeur Backend",
        stack: ["Rust", "Tokio", "libp2p"],
        images: ["/images/synk-1.png"],
        github: "https://github.com/Walson-A/synk"
    },
    {
        slug: "po",
        title: "Pö",
        shortDescription: "Application de suivi de productivité minimaliste.",
        longDescription: "Pö est une application de productivité qui se concentre sur l'essentiel : aider les utilisateurs à rester concentrés sans distractions. Elle propose un minuteur Pomodoro, une liste de tâches simple et des statistiques d'activité. L'interface est volontairement épurée. J'ai développé l'application mobile avec React Native pour offrir une expérience native fluide sur iOS et Android.",
        role: "Développeur Mobile",
        stack: ["React Native", "Expo", "Redux"],
        images: ["/images/po-1.png"],
        github: "https://github.com/Walson-A/po"
    }
]
