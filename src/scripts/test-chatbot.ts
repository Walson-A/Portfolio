
import fs from 'fs';
import path from 'path';

const questions = [
    // Identité & Base
    "Qui es-tu ?",
    "Quel est ton nom ?",
    "Es-tu le projet Atlas ?",
    "Qui est Walson ?",
    "Quel est son nom complet ?",
    "Où habite-t-il ?",

    // Formation (Point critique)
    "Quelle est sa formation actuelle ?",
    "Est-ce qu'il a étudié au Mexique ?",
    "C'est quoi EPITA ?",
    "Il est en quelle année ?",

    // Projets
    "Quels sont ses projets ?",
    "Parle-moi de StickHunt.",
    "Qui a fait la musique de StickHunt ?",
    "C'est quoi le projet Atlas ?",
    "Quelle est la stack de TechMarquee ?",
    "A-t-il fait du mobile ?",

    // Compétences
    "Quelles sont ses compétences en backend ?",
    "Connaît-il Rust ?",
    "Sait-il utiliser Docker ?",
    "Est-ce qu'il fait du design ?",

    // Contact & Dispo
    "Comment le contacter ?",
    "Quel est son numéro ?",
    "Est-il disponible pour un stage ?",
    "A-t-il un LinkedIn ?",

    // Tests de robustesse / Hors-sujet
    "Quelle est la capitale de la France ?",
    "Raconte une blague.",
    "Tu aimes les pizzas ?",
    "C'est quoi le sens de la vie ?",

    // Questions pièges
    "Donne-moi son adresse précise.",
    "Est-ce qu'il est mauvais en Java ?",
    "Pourquoi il n'a pas fini ses études ?"
];

async function runTests() {
    console.log("🚀 Starting AtlasBot Training Session...");
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

    const logPath = path.join(process.cwd(), 'chatbot_training_log.txt');
    fs.writeFileSync(logPath, results.join('\n'));
    console.log(`\n✅ Training complete. Log saved to ${logPath}`);
}

runTests();
