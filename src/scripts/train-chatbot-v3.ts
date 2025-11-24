
import fs from 'fs';
import path from 'path';

const questions = [
    // --- IDENTITÉ & PERSONA (5) ---
    "Qui es-tu ?",
    "Quel est ton nom ?",
    "Es-tu Walson ?",
    "Qui suis-je ?", // Test: Visitor vs Walson
    "Au revoir.", // Test: "Au revoir Walson" forbidden

    // --- FORMATION & DATES (5) ---
    "Quand commence son stage ?",
    "Cherche-t-il une alternance ?",
    "Quelle date pour l'alternance ?",
    "Peut-il commencer en Janvier 2026 ?",
    "A-t-il fini ses études ?",

    // --- HORS-SUJET & SCOPE (10) ---
    "Tu aimes les pizzas ?", // Test: Refusal
    "Raconte une blague.", // Test: Refusal
    "Tu préfères le thé ou le café ?", // Test: Refusal
    "Peux-tu coder à ma place ?", // Test: Refusal
    "Aide-moi à débugger mon code.", // Test: Refusal
    "Quelle est la capitale de la France ?", // Test: Refusal
    "C'est quoi le sens de la vie ?", // Test: Refusal
    "Es-tu intelligent ?",
    "Qui t'a créé ?",
    "Es-tu humain ?",

    // --- PROJETS & COMPÉTENCES (10) ---
    "Quels sont ses projets ?",
    "Parle-moi de StickHunt.",
    "Qui a fait la musique de StickHunt ?",
    "C'est quoi le projet Atlas ?",
    "A-t-il fait du mobile ?", // Test: Negative
    "Connaît-il Rust ?", // Test: Negative
    "Maitrise-t-il Java ?", // Test: Negative
    "Sait-il utiliser Docker ?",
    "Est-ce qu'il fait du design ?",
    "Combien de projets a-t-il ?",

    // --- DISPONIBILITÉ & CONTACT (10) ---
    "Comment le contacter ?",
    "Quel est son numéro ?",
    "Est-il disponible pour un stage ?",
    "Cherche-t-il un CDI ?", // Test: Negative
    "Cherche-t-il un CDD ?", // Test: Negative
    "Peut-il commencer demain ?",
    "A-t-il un LinkedIn ?",
    "Où habite-t-il ?",
    "Est-il prêt à déménager ?",
    "Cherche-t-il une alternance ?",

    // --- TESTS DE CONCISENESS (10) ---
    "C'est quoi EPITA ?",
    "Il est en quelle année ?",
    "C'est quoi OCR Word Search ?",
    "Utilise-t-il Tailwind ?",
    "Connaît-il Next.js ?",
    "Sait-il faire de la 3D ?",
    "Est-ce qu'il a fait un jeu vidéo ?",
    "Quel est son nom complet ?",
    "Es-tu le projet Atlas ?",
    "Bonjour."
];

async function runTests() {
    console.log("🚀 Starting AtlasBot FINAL V3 Training Session...");
    const results = [];

    for (const [index, question] of questions.entries()) {
        console.log(`\n[${index + 1}/${questions.length}] Q: ${question}`);

        try {
            const response = await fetch('http://localhost:3001/api/atlas-chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [{ role: 'user', content: question }]
                })
            });

            if (!response.ok) {
                console.error(`❌ Error: ${response.statusText}`);
                results.push(`Q: ${question}\nERROR: ${response.statusText}\n---\n`);
                continue;
            }

            const data = await response.json();
            console.log(`🤖 A: ${data.content}`);
            results.push(`Q: ${question}\nA: ${data.content}\n---\n`);

        } catch (error) {
            console.error(`❌ Network Error: ${error}`);
            results.push(`Q: ${question}\nNETWORK ERROR\n---\n`);
        }

        // Small delay to be nice to the API
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    const logPath = path.join(process.cwd(), 'chatbot_training_log_v3.txt');
    fs.writeFileSync(logPath, results.join('\n'));
    console.log(`\n✅ Training complete. Log saved to ${logPath}`);
}

runTests();
