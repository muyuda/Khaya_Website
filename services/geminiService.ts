import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || ''; 

let client: GoogleGenAI | null = null;

if (apiKey) {
    client = new GoogleGenAI({ apiKey });
}

export const generateResponse = async (prompt: string): Promise<string> => {
    if (!client) {
        return "I'm sorry, my brain is not connected right now (API Key missing).";
    }

    try {
        const response = await client.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                systemInstruction: "You are 'Aura', a helpful, Gen Z friendly AI assistant for 'Khaya Landmark'. You help users find properties in Indonesia (Jabodetabek) and understand KPR (mortgages). Keep answers concise, helpful, and slightly witty/modern. Use emojis occasionally.",
            }
        });

        return response.text || "I couldn't generate a response.";
    } catch (error) {
        console.error("Gemini Error:", error);
        return "Oops! I encountered a glitch. Please try again later.";
    }
};