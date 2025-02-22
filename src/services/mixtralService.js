import { Groq } from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function getMixtralResponse(prompt) {
  try {
    const response = await groq.chat.completions.create({
      model: "mixtral-8x7b-32768",
      messages: [{ role: "user", content: prompt }],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Erro ao acessar o Mixtral:", error);
    return null;
  }
}