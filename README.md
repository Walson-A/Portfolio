# ⚡ Walson's Portfolio

![Portfolio Banner](/public/images/portfolio-hero.png)

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-Latest-black?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)

**Le code source de mon portfolio personnel. Une vitrine interactive de mes compétences en ingénierie logicielle, design UI/UX et intelligence artificielle.**

[Voir le site en ligne](https://github.com/Walson-A/Portfolio)

</div>

---

## ✨ À propos de ce projet

Ce repository héberge le code source de mon portfolio professionnel. Plus qu'une simple vitrine, ce projet a été conçu comme une démonstration technique de mes capacités à concevoir des applications web modernes, performantes et intelligentes.

Il ne s'agit pas d'un template destiné à être cloné, mais d'une **pièce unique** reflétant mon identité visuelle et technique.

---

## 💎 Fonctionnalités Clés

### 🧠 AtlasBot (Assistant IA Personnel)
Au cœur du portfolio réside **AtlasBot**, un agent conversationnel capable de répondre aux questions sur mon parcours.
- **Architecture RAG (Retrieval-Augmented Generation)** : AtlasBot ne se contente pas de "répondre". Il interroge une base de connaissances vectorielle générée à partir de mes fichiers de données (projets, timeline).
- **Stack IA** : Utilise **OpenRouter** pour l'inférence LLM et **@xenova/transformers** pour la génération d'embeddings en local.
- **Conscience du Contexte** : Il "sait" quels projets sont affichés et peut fournir des détails techniques précis.

### 🎨 Expérience Utilisateur (UX/UI)
- **Design System "Dark Premium"** : Une esthétique sombre et élégante, ponctuée par la couleur signature `#4FD1C5` (Teal).
- **Timeline Cinématique** : Une réinvention de la présentation de CV classique, offrant une navigation fluide à travers les années.
- **Micro-interactions** : Chaque bouton, carte et transition a été soigné avec **Framer Motion** pour une sensation de fluidité absolue.

### 🛠️ Excellence Technique
- **Next.js 14 App Router** : Utilisation des dernières fonctionnalités de React (Server Components) pour une performance optimale.
- **Type Safety** : Codebase 100% TypeScript pour une robustesse et une maintenabilité accrues.
- **Optimisation** : Scores Lighthouse élevés, chargement différé des assets lourds et gestion optimisée des polices.

---

## 📂 Architecture du Code

Le projet suit une structure modulaire et claire, facilitant la maintenance et l'évolution.

```bash
src/
├── app/                 # Architecture Next.js App Router
│   ├── api/            # Routes API Serverless (Chatbot, Contact)
│   └── ...             # Pages (Home, Projects, etc.)
├── components/          # Bibliothèque de composants React
│   ├── ui/             # Composants atomiques (Design System)
│   └── ...             # Composants métiers (Timeline, Chat...)
├── data/               # Source de vérité (Single Source of Truth)
│   ├── knowledge/      # Base de connaissances Markdown pour l'IA
│   ├── projects.ts     # Données structurées des projets
│   └── vector-store.json # Index vectoriel pré-calculé
├── lib/                # Logique métier et utilitaires
└── scripts/            # Scripts d'automatisation (Génération RAG)
```

---

## � Licence

Ce code est la propriété intellectuelle de **Walson Argan RENE**.
Bien que le code soit public pour démonstration technique, le design, les textes et les assets personnels ne sont pas libres de droits pour une réutilisation commerciale ou personnelle sans accord explicite.

---

<div align="center">
Fait avec ❤️ et beaucoup de ☕ par <a href="https://github.com/walson-a">Walson</a>
</div>
