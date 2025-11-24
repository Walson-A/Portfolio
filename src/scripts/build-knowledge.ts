
import fs from 'fs';
import path from 'path';
import { projects } from '../data/projects';
import { timelineEvents } from '../data/timeline';

// Import Xenova Transformers dynamically to avoid build issues if not available immediately
// We will use standard require for the script
const { pipeline } = require('@xenova/transformers');

const KNOWLEDGE_DIR = path.join(process.cwd(), 'src', 'data', 'knowledge');
const VECTOR_STORE_PATH = path.join(process.cwd(), 'src', 'data', 'vector-store.json');

// Ensure directory exists
if (!fs.existsSync(KNOWLEDGE_DIR)) {
    fs.mkdirSync(KNOWLEDGE_DIR, { recursive: true });
}

interface VectorItem {
    id: string;
    content: string;
    metadata: any;
    embedding: number[];
}

async function generateVectorStore() {
    console.log('Initializing embedding model (all-MiniLM-L6-v2)...');
    const extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');

    const vectorStore: VectorItem[] = [];

    // Helper to embed text
    const embedText = async (text: string) => {
        const output = await extractor(text, { pooling: 'mean', normalize: true });
        return Array.from(output.data) as number[];
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
Walson est un étudiant ingénieur à l'EPITA, passionné par le développement web moderne et l'ingénierie logicielle. Il aime créer des expériences utilisateurs fluides et immersives. Il a une approche "Fullstack", capable de gérer aussi bien le frontend (design, animations) que le backend (API, bases de données, systèmes).

## Compétences Techniques (Tech Stack)
- **Frontend**: React, Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, Three.js (notions).
- **Backend**: Node.js, Python (FastAPI/Flask), C (Système/Bas niveau).
- **Mobile**: AUCUNE expérience en mobile (Pas de React Native).
- **Outils**: Git, Docker, Linux, Makefile.
- **Design**: UI/UX, Glassmorphism, Responsive Design.

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
