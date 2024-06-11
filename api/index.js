import dotenv from "dotenv";
dotenv.config();
import express from "express";
import Groq from "groq-sdk"
import { getGroqChatCompletion } from "./groqai.js"
import readline from "readline"
const app = express();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.use(express.static('public')); // Serve static files from the 'public' directory
app.use(express.json()); // To parse JSON bodies


app.post('/api/get-response', async (req, res) => {
  try {
    const { question } = req.body; // Get question from the request body
    const chatCompletion = await getGroqChatCompletion(question);
    const message = chatCompletion.choices[0]?.message?.content;
    res.send({ message });
  } catch (error) {
    res.status(500).send('Error occurred: ' + error.message);
  }
});
const port = 3000
app.listen(port, () => {
  console.log('server running')
})