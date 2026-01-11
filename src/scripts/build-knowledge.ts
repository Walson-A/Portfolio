

import fs from 'fs';
import path from 'path';
import { projects } from '../data/projects';
import { timelineEvents } from '../data/timeline';

import { getEmbedding } from '../lib/embeddings';

const KNOWLEDGE_DIR = path.join(process.cwd(), 'src', 'data', 'knowledge');
const VECTOR_STORE_PATH = path.join(process.cwd(), 'src', 'data', 'vector-store.json');

// Ensure directory exists
if (!fs.existsSync(KNOWLEDGE_DIR)) {
    fs.mkdirSync(KNOWLEDGE_DIR, { recursive: true });
}

interface VectorItem {
    id: string;
    content: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    metadata: any;
    embedding: number[];
}

async function generateVectorStore() {
    console.log('Using OpenRouter API (text-embedding-3-small) for embeddings...');

    const vectorStore: VectorItem[] = [];

    // Helper to embed text
    const embedText = async (text: string) => {
        return await getEmbedding(text);
    };



    // 1. Generate Projects Knowledge & Embeddings
    console.log('Processing projects...');
    for (const project of projects) {
        const content = `
# Projet: ${project.title} (${project.slug})

## Description Courte
${project.shortDescription}

## Description Détaillée
${project.longDescription}

## Rôle
${project.role}

## Stack Technique
${project.stack.join(', ')}

## Détails Techniques
${project.technicalDetails || 'Non spécifié'}

## Statut
${project.status} (${project.date}) - Durée: ${project.duration}

${project.contributors ? `## Contributeurs\n${project.contributors.map(c => `- ${c.name} (${c.github})`).join('\n')}` : ''}

${project.github ? `## GitHub\n${project.github}` : ''}
${project.link ? `## Lien\n${project.link}` : ''}
        `.trim();

        // Save MD file
        fs.writeFileSync(path.join(KNOWLEDGE_DIR, `project-${project.slug}.md`), content);

        // Create chunks (simplified: by section)
        const sections = content.split('\n## ');
        for (const section of sections) {
            const cleanSection = section.startsWith('## ') ? section : `## ${section}`;
            const embedding = await embedText(cleanSection);

            vectorStore.push({
                id: `project-${project.slug}-${vectorStore.length}`,
                content: cleanSection,
                metadata: { type: 'project', slug: project.slug, title: project.title },
                embedding
            });
        }
    }

    // 2. Generate Timeline/Profile Knowledge & Embeddings
    console.log('Processing timeline...');
    const timelineContent = `
# Parcours et Expériences de Walson

${timelineEvents.map(event => `
## ${event.year} - ${event.label} (${event.type})
- **Lieu**: ${event.location || 'Non spécifié'}
- **Description**: ${event.description}
- **Tags**: ${event.tags?.join(', ') || 'Aucun'}
`).join('\n')}
    `.trim();

    fs.writeFileSync(path.join(KNOWLEDGE_DIR, 'profile-timeline.md'), timelineContent);

    // Chunk timeline (by event)
    const timelineChunks = timelineContent.split('\n## ');
    for (const chunk of timelineChunks) {
        if (!chunk.trim()) continue;
        const cleanChunk = chunk.startsWith('## ') ? chunk : `## ${chunk}`;
        const embedding = await embedText(cleanChunk);

        vectorStore.push({
            id: `timeline-${vectorStore.length}`,
            content: cleanChunk,
            metadata: { type: 'timeline' },
            embedding
        });
    }

    // 3. Generate Global Summary (Source of Truth)
    console.log('Processing global summary...');
    const globalSummary = `
# Résumé Global du Portfolio de Walson (Source de Vérité)

## Identité & Contact
- **Nom complet**: Walson Argan RENE (Tu peux le donner si on te le demande explicitement)
- **Nom préféré**: Walson
- **Rôle**: Développeur Fullstack & Ingénieur Logiciel
- **Formation**: Étudiant en 2ème année (Bac+2) à l'EPITA (École d'Ingénieurs en Informatique).
- **Localisation**: Île-de-France, France
- **Email**: walson.a.rene@gmail.com
- **Téléphone**: +33 7 68 35 66 42
- **LinkedIn**: https://linkedin.com/in/walson-rené
- **GitHub**: https://github.com/walson-a
- **Disponibilité**:
    - **STAGE**: À partir de **Janvier 2026**.
    - **ALTERNANCE**: À partir de **Septembre 2026**.
    - (Pas de CDD ni CDI pour le moment).

## À Propos
Walson est un étudiant ingénieur à l'EPITA, passionné par le développement et la création numérique. Il conçoit des projets autour du développement logiciel, de l'IA et des outils du quotidien. Il aime comprendre, concevoir et donner vie à des projets à travers le code, transformer des idées en produits concrets, utiles et agréables à utiliser.

Walson cherche à renforcer ses compétences en développement au sein d'une entreprise, afin de gagner en expérience concrète et de participer à des projets réels.

## Compétences Techniques (Tech Stack)
- **Langages**: Python, C, C#, TypeScript.
- **Frontend**: React, Next.js (App Router), Tailwind CSS, Framer Motion.
- **Backend**: Node.js, Python, C (Système/Bas niveau).
- **Jeux**: Unity.
- **Outils**: Git, Docker, Linux, Makefile.
- **Design**: UI/UX, Glassmorphism, Responsive Design.
- **Domaines**: Développement logiciel, IA, Création d'outils.
- **Mobile**: React Native.

## Vue d'ensemble des Projets (${projects.length} projets principaux)
${projects.map(p => `- **${p.title}** (${p.date}): ${p.shortDescription}. [Stack: ${p.stack.join(', ')}]. Rôle: ${p.role}. Statut: ${p.status}.`).join('\n')}

## Parcours (Timeline)
${timelineEvents.map(e => `- **${e.year}**: ${e.label} (${e.type}) - ${e.description}`).join('\n')}
    `.trim();

    fs.writeFileSync(path.join(KNOWLEDGE_DIR, 'global-summary.md'), globalSummary);

    // Embed the summary as a single high-priority chunk
    const summaryEmbedding = await embedText(globalSummary);
    vectorStore.push({
        id: 'global-summary',
        content: globalSummary,
        metadata: { type: 'summary', priority: 'critical' },
        embedding: summaryEmbedding
    });

    // Save Vector Store
    console.log(`Saving vector store with ${vectorStore.length} items...`);
    fs.writeFileSync(VECTOR_STORE_PATH, JSON.stringify(vectorStore, null, 2));
    console.log('Vector store generated successfully!');
}

generateVectorStore().catch(console.error);

