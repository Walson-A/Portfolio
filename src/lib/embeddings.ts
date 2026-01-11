
/**
 * Generates an embedding for a given text using the OpenRouter API.
 * Uses the openai/text-embedding-3-small model (1536 dimensions).
 */
export async function getEmbedding(text: string): Promise<number[]> {
    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

    if (!OPENROUTER_API_KEY) {
        throw new Error("OPENROUTER_API_KEY is not defined in environment variables.");
    }

    const apiUrl = "https://openrouter.ai/api/v1/embeddings";

    let lastError: Error | null = null;
    const maxRetries = 3;

    for (let i = 0; i < maxRetries; i++) {
        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: process.env.EMBEDDING_MODEL || "openai/text-embedding-3-small",
                    input: text.replace(/\n/g, " "),
                }),
            });

            if (!response.ok) {
                const error = await response.text();
                throw new Error(`OpenRouter Embedding Error: ${response.statusText} - ${error}`);
            }

            const data = await response.json();

            if (!data.data || !data.data[0] || !data.data[0].embedding) {
                throw new Error(`Invalid response format from OpenRouter: ${JSON.stringify(data)}`);
            }

            return data.data[0].embedding;
        } catch (error) {
            console.warn(`Attempt ${i + 1} failed for embedding:`, error);
            lastError = error as Error;
            // Wait a bit before retrying (exponential backoff or simple delay)
            if (i < maxRetries - 1) {
                await new Promise(resolve => setTimeout(resolve, 500 * (i + 1)));
            }
        }
    }

    throw lastError || new Error("Failed to generate embedding after multiple attempts.");

}
