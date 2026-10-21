const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: 'C:\Users\Lenovo\OneDrive\Desktop\PHR\.env' }); // Ensure the correct path is provided

const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Initialize the Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

console.log(process.env.GEMINI_API_KEY); // This should print the API key

// Serve the index.html file at /chatbot
app.get('/chatbot', (req, res) => {
  res.sendFile(__dirname + '/chatbot.html');
});

// Chat endpoint
app.post('/chat', async (req, res) => {
  const prompt = req.body.prompt;
  console.log(`Received prompt: ${prompt}`);

  try {
    const result = await model.generateContent(prompt, {
      max_output_tokens: 150,
      temperature: 0.7,
    });

    let chatbotMessage = result.response.text().trim();
    chatbotMessage = removeUnwantedPhrasesAndFormatting(chatbotMessage);

    console.log(`Gemini response: ${chatbotMessage}`);
    res.json({ response: chatbotMessage });
  } catch (error) {
    console.error(`Unexpected error: ${error}`);
    res.status(500).json({ error: 'Internal server error' });
  }
});

function removeUnwantedPhrasesAndFormatting(response) {
  const unwantedPhrases = [
    "I'm an AI and can't provide medical advice.",
    "It's crucial you seek immediate medical attention.",
    "Do not attempt to self-treat or delay seeking professional help.",
    "Please prioritize your health and get the necessary medical care.",
    "I'm an AI and cannot provide medical advice.",
    "I am an AI and not a medical professional. I cannot provide medical advice.",
    "I am an AI and cannot provide medical advice. It's crucial to seek immediate medical attention if you're experiencing chest pain.",
    "I am an AI and cannot provide medical advice.",
    "I'm not a medical professional, and I can't provide medical advice.",
  ];
  unwantedPhrases.forEach(phrase => {
    response = response.replace(phrase, '');
  });
  response = response.replace(/\*\*/g, ''); // Remove all instances of '**'
  return response.trim();
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});