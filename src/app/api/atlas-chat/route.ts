import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

import { rateLimit } from '@/lib/rate-limit';
import { getEmbedding } from '@/lib/embeddings';

const VECTOR_STORE_PATH = path.join(process.cwd(), 'src', 'data', 'vector-store.json');

// Define types for vector store items
interface VectorItem {
    id: string;
    content: string;
    embedding: number[];
    score?: number;
}

// Persist instances across hot reloads in development using globalThis
declare global {
    var __vectorStore: VectorItem[] | null;
}

function getVectorStore(): VectorItem[] {
    if (!globalThis.__vectorStore) {
        if (!fs.existsSync(VECTOR_STORE_PATH)) return [];
        console.log('--- [CACHE MISS] Loading vector store from disk...');
        globalThis.__vectorStore = JSON.parse(fs.readFileSync(VECTOR_STORE_PATH, 'utf-8'));
    }
    return globalThis.__vectorStore || [];
}


function cosineSimilarity(a: number[], b: number[]) {
    // Optimization: avoid re-calculating magnitude for 'a' if it's persistent, 
    // but here query changes every time.
    const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
    const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
    const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (magnitudeA * magnitudeB);
}

export async function POST(req: Request) {
    try {
        // 0. Rate Limiting
        const ip = req.headers.get('x-forwarded-for') || 'anonymous';
        const limiter = rateLimit(ip, 12, 60 * 1000, 'chatbot'); // 12 messages / min

        if (!limiter.success) {
            return NextResponse.json({
                role: 'assistant',
                content: "Vous envoyez des messages trop rapidement. Pausez une petite minute !",
                timestamp: new Date()
            }, { status: 429 });
        }

        const { messages } = await req.json();
        const lastMessage = messages[messages.length - 1];
        const userQuery = lastMessage.content;

        // 1. Load Vector Store
        const vectorStore = getVectorStore();
        if (vectorStore.length === 0) {
            return NextResponse.json({
                role: 'assistant',
                content: "Désolé, ma base de connaissances est en cours de maintenance (fichier vectoriel introuvable).",
                timestamp: new Date()
            });
        }

        // 2. Embed User Query
        const queryEmbedding = await getEmbedding(userQuery);

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

        // 4. Call OpenRouter with retries
        let aiContent = "";
        let lastError: Error | null = null;
        const maxRetries = 3;

        for (let i = 0; i < maxRetries; i++) {
            try {
                const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                        "Content-Type": "application/json",
                        "HTTP-Referer": "https://walsondev.com",
                        "X-Title": "Walson Portfolio",
                    },
                    body: JSON.stringify({
                        "model": process.env.OPENROUTER_MODEL || "xiaomi/mimo-v2-flash:free",
                        "messages": openRouterMessages,
                        "temperature": 0.7,
                        "max_tokens": 500
                    })
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`OpenRouter API Error: ${response.status} - ${errorText}`);
                }

                const data = await response.json();

                if (data.choices && data.choices[0] && data.choices[0].message) {
                    aiContent = data.choices[0].message.content;
                    break; // Success!
                } else {
                    throw new Error(`Unexpected OpenRouter response format: ${JSON.stringify(data)}`);
                }
            } catch (error) {
                console.error(`Attempt ${i + 1} failed for OpenRouter Chat:`, error);
                lastError = error as Error;
                if (i < maxRetries - 1) {
                    await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
                }
            }
        }

        if (!aiContent) {
            throw lastError || new Error("Failed to get response from OpenRouter after retries.");
        }


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
