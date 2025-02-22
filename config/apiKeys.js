import dotenv from "dotenv";
dotenv.config();

export const API_KEYS = {
  GEMINI: process.env.GEMINI_API_KEY,
  GROQ: process.env.GROQ_API_KEY
};