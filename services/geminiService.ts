
import { GoogleGenAI } from "@google/genai";
import { Transaction } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateTractorDescription = async (details: string): Promise<string> => {
  try {
    const prompt = `Generate a compelling, professional sales description for a tractor with these details: ${details}. Focus on durability, performance, and value for a farmer or contractor. Keep it to 2-3 concise sentences.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error generating tractor description:", error);
    return "Failed to generate description. Please try again.";
  }
};

export const generateYearlySummary = async (transactions: Transaction[]): Promise<string> => {
    if (transactions.length === 0) {
        return "No transactions available to generate a summary.";
    }
    
    try {
        const simplifiedTransactions = transactions.map(t => ({
            tractorName: t.tractor.name,
            salePrice: t.salePrice,
            purchasePrice: t.tractor.purchasePrice,
            profit: t.salePrice - t.tractor.purchasePrice,
            date: t.date
        }));

        const prompt = `Analyze the following JSON data of tractor sales for the year. Provide a concise, insightful summary of the business performance in markdown format. 
        Mention:
        1. Total revenue (sum of salePrice).
        2. Total profit (sum of profit).
        3. Number of units sold.
        4. The most profitable tractor model.
        5. Any noticeable trends (e.g., sales peaks in certain months).

        Data:
        ${JSON.stringify(simplifiedTransactions, null, 2)}
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: prompt,
        });

        return response.text;
    } catch (error) {
        console.error("Error generating yearly summary:", error);
        return "Failed to generate yearly summary. The AI model might be unavailable.";
    }
};
