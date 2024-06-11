import dotenv from "dotenv";
dotenv.config();
import express from "express";
import Groq from "groq-sdk"
import { getGroqChatCompletion } from "./groqai.js"

const app = express();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.get('/', (req, res) => {
  res.send('hello world')
})
app.post('/api/:quest', async (req, res) => {
  const quest = req.params.quest
  const chatCompletion = await getGroqChatCompletion(quest);
 const message = chatCompletion.choices[0]?.message?.content
  res.send(message)

})
const port = 3000
app.listen(port, () => {
  console.log('server running')
})