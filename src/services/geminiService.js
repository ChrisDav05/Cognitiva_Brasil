import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY; 
const genAI = new GoogleGenerativeAI(apiKey);

export async function getGeminiResponse(prompt) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(prompt);
    const response = result.response;

    return response.text();
  } catch (error) {
    console.error("Erro ao chamar o Gemini:", error);
    return null;
  }
}

