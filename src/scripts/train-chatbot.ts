
import fs from 'fs';
import path from 'path';

const questions = [
    // --- IDENTITÉ & BASE (5) ---
    "Qui es-tu ?",
    "Quel est ton nom ?",
    "Es-tu le projet Atlas ?",
    "Qui est Walson ?",
    "Quel est son nom complet ?",

    // --- FORMATION (5) ---
    "Quelle est sa formation actuelle ?",
    "Est-ce qu'il a étudié au Mexique ?",
    "C'est quoi EPITA ?",
    "Il est en quelle année ?",
    "A-t-il fini ses études ?",

    // --- PROJETS (10) ---
    "Quels sont ses projets ?",
    "Parle-moi de StickHunt.",
    "Qui a fait la musique de StickHunt ?",
    "C'est quoi le projet Atlas ?",
    "Quelle est la stack de TechMarquee ?",
    "A-t-il fait du mobile ?", // TEST NEGATIF
    "A-t-il fait des applis Android ?", // TEST NEGATIF
    "C'est quoi OCR Word Search ?",
    "Combien de projets a-t-il ?",
    "Est-ce qu'il a fait un jeu vidéo ?",

    // --- COMPÉTENCES (10) ---
    "Quelles sont ses compétences en backend ?",
    "Connaît-il Rust ?", // TEST NEGATIF (ou notions seulement)
    "Est-il expert en Rust ?", // TEST NEGATIF
    "Sait-il utiliser Docker ?",
    "Est-ce qu'il fait du design ?",
    "Maitrise-t-il Java ?", // TEST NEGATIF
    "Sait-il faire du C++ ?", // TEST NEGATIF
    "Utilise-t-il Tailwind ?",
    "Connaît-il Next.js ?",
    "Sait-il faire de la 3D ?",

    // --- DISPONIBILITÉ & CONTACT (10) ---
    "Comment le contacter ?",
    "Quel est son numéro ?",
    "Est-il disponible pour un stage ?",
    "Cherche-t-il un CDI ?", // TEST NEGATIF
    "Cherche-t-il un CDD ?", // TEST NEGATIF
    "Peut-il commencer demain ?",
    "A-t-il un LinkedIn ?",
    "Où habite-t-il ?",
    "Est-il prêt à déménager ?",
    "Cherche-t-il une alternance ?",

    // --- PERSONNALITÉ & HORS-SUJET (10) ---
    "Tu aimes les pizzas ?", // TEST PERSONNALITÉ
    "Raconte une blague.",
    "Quelle est la capitale de la France ?",
    "C'est quoi le sens de la vie ?",
    "Es-tu humain ?",
    "Qui t'a créé ?",
    "Tu préfères le thé ou le café ?",
    "Es-tu intelligent ?",
    "Peux-tu coder à ma place ?",
    "Au revoir."
];

async function runTests() {
    console.log("🚀 Starting AtlasBot EXTENDED Training Session (50 Questions)...");
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

    const logPath = path.join(process.cwd(), 'chatbot_training_log_v2.txt');
    fs.writeFileSync(logPath, results.join('\n'));
    console.log(`\n✅ Training complete. Log saved to ${logPath}`);
}

runTests();
