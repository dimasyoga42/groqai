import dotenv from "dotenv";
dotenv.config();
import Groq from "groq-sdk"
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
export async function getGroqChatCompletion(quest) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: quest,
      },
    ],
    model: "llama3-8b-8192",
  });
}