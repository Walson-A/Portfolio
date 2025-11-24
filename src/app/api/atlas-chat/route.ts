
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

// We need to use the same embedding model as build-knowledge.ts
// Since we are in Next.js server runtime, we can use @xenova/transformers
import { pipeline } from '@xenova/transformers';

const VECTOR_STORE_PATH = path.join(process.cwd(), 'src', 'data', 'vector-store.json');

// Define types for vector store items
interface VectorItem {
    id: string;
    content: string;
    embedding: number[];
    score?: number;
}

// Singleton for the extractor to avoid reloading model on every request
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let extractor: any = null;

async function getExtractor() {
    if (!extractor) {
        console.log('Loading embedding model...');
        extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
    }
    return extractor;
}

function cosineSimilarity(a: number[], b: number[]) {
    const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
    const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
    const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (magnitudeA * magnitudeB);
}

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();
        const lastMessage = messages[messages.length - 1];
        const userQuery = lastMessage.content;

        // 1. Load Vector Store
        if (!fs.existsSync(VECTOR_STORE_PATH)) {
            return NextResponse.json({
                role: 'assistant',
                content: "Désolé, ma base de connaissances est en cours de maintenance (fichier vectoriel introuvable).",
                timestamp: new Date()
            });
        }
        const vectorStore: VectorItem[] = JSON.parse(fs.readFileSync(VECTOR_STORE_PATH, 'utf-8'));

        // 2. Embed User Query
        const embedder = await getExtractor();
        const output = await embedder(userQuery, { pooling: 'mean', normalize: true });
        const queryEmbedding = Array.from(output.data) as number[];

        // 3. Search for Context
        // Always include the Global Summary (Source of Truth)
        const globalSummaryItem = vectorStore.find((item) => item.id === 'global-summary');
        const globalSummaryContent = globalSummaryItem ? globalSummaryItem.content : "";

        const scoredItems = vectorStore
            .filter((item) => item.id !== 'global-summary') // Exclude summary from search to avoid dupes
            .map((item) => ({
                ...item,
                score: cosineSimilarity(queryEmbedding, item.embedding)
            }));

        // Sort by score desc and take top 3 relevant chunks
        const topContexts = scoredItems
            .sort((a, b) => (b.score || 0) - (a.score || 0))
            .slice(0, 3)
            .filter((item) => (item.score || 0) > 0.25); // Minimum relevance threshold

        // Combine Summary + Retrieved Context
        const contextText = [
            "--- RÉSUMÉ GLOBAL (SOURCE DE VÉRITÉ) ---",
            globalSummaryContent,
            "--- DÉTAILS PERTINENTS ---",
            ...topContexts.map((c) => c.content)
        ].join('\n\n');

        // 4. Call OpenRouter
        const systemPrompt = `
Tu es AtlasBot, l'assistant IA du portfolio de Walson.
Tu es actuellement intégré sur le site web portfolio de Walson. L'utilisateur est un VISITEUR (recruteur, dev, etc.).

CONTEXTE (Informations trouvées dans la base de connaissances) :
${contextText || "Aucune information spécifique trouvée dans la base de connaissances pour cette question."}

RÈGLES STRICTES :
1. **Identité** : Tu t'appelles "AtlasBot". Tu es un guide pour ce portfolio, PAS un assistant de code généraliste.
2. **Utilisateur** : L'utilisateur N'EST PAS Walson. Appelle-le "vous". Ne dis jamais "Au revoir Walson".
3. **Format** : SOIS EXTRÊMEMENT CONCIS. Réponds à la question et ARRÊTE-TOI. Ne pose pas de question en retour ("Voulez-vous...") sauf si c'est VRAIMENT pertinent pour explorer un projet.
4. **Contenu (CRITIQUE)** : 
   - Base-toi UNIQUEMENT sur le CONTEXTE. 
   - Si une compétence (ex: Rust, Mobile) n'est pas explicitement mentionnée, DIS QUE TU NE SAIS PAS.
   - Disponibilité : STAGE (Janv 2026) ou ALTERNANCE (Sept 2026) uniquement.
5. **Hors-Sujet (Pizza, Café, Blague, Code)** : 
   - REFUSE poliment mais fermement. 
   - Dis : "Je suis ici pour parler du portfolio de Walson." 
   - Ne donne PAS ton avis, ne fais PAS de blague, ne propose PAS d'aide pour choisir un café.

Exemple de bonne réponse :
"Walson cherche un stage à partir de Janvier 2026. Il ne fait pas de mobile."

HISTORIQUE DE CONVERSATION :
(Inclus dans les messages suivants)
        `.trim();

        const openRouterMessages = [
            { role: 'system', content: systemPrompt },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ...messages.map((m: any) => ({ role: m.role, content: m.content }))
        ];

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "https://walson.dev", // Site URL
                "X-Title": "Walson Portfolio", // Site Title
            },
            body: JSON.stringify({
                "model": process.env.OPENROUTER_MODEL || "google/gemini-2.0-flash-001", // Fallback if env var missing
                "messages": openRouterMessages,
                "temperature": 0.7,
                "max_tokens": 500
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("OpenRouter Error:", errorText);
            throw new Error(`OpenRouter API Error: ${response.statusText}`);
        }

        const data = await response.json();
        const aiContent = data.choices[0].message.content;

        return NextResponse.json({
            role: 'assistant',
            content: aiContent,
            timestamp: new Date()
        });

    } catch (error) {
        console.error('Error in Atlas Chat API:', error);
        return NextResponse.json(
            { role: 'assistant', content: "Désolé, j'ai rencontré une erreur technique en traitant votre demande.", timestamp: new Date() },
            { status: 500 }
        );
    }
}
