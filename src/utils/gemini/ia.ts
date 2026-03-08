import { GoogleGenerativeAI } from "@google/generative-ai";

// Substitua pela sua chave real
const genAI = new GoogleGenerativeAI("AIzaSyAG_xb1EH1J2Z9RSSCCnp5oVgmGCDXGK9o");

function parseJsonResponse(text: string) {
  const sanitized = text
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/i, "")
    .trim();

  return JSON.parse(sanitized);
}

export async function run(typeGame: string) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
    },
  });

  let prompt = "";

  switch (typeGame) {
    case "question":
      prompt = `Retorne apenas JSON valido no formato de array com 10 perguntas de ingles iniciante:
[
  {
    "id": 1,
    "question": "",
    "tema": "",
    "response": [
      { "options": "", "isCorrect": false },
      { "options": "", "isCorrect": false },
      { "options": "", "isCorrect": false },
      { "options": "", "isCorrect": true }
    ],
    "explanation": ""
  }
]`;
      break;

    case "drag":
      prompt = `Retorne apenas JSON valido no formato de array com 10 frases de ingles iniciante e e taambem com explicação da perguntas:
[
  {
    "id": 1,
    "question": "They ___ soccer on Sunday.",
    "options": ["play", "plays", "played", "playing"],
    "correct": "play",
    "explanation": ""
  }
]`;
      break;

    case "drop":
      prompt = `Retorne apenas JSON valido no formato de array com 10 frases de ingles iniciante:
[
  {
    "wordsShuffled": ["watching", "are", "movie", "we", "a"],
    "wordsCorrect": ["We", "are", "watching", "a", "movie"],
    "correctSentence": "We are watching a movie.",
    "explanation": ""
  }
]`;
      break;

    default:
      throw new Error(`Tipo de jogo invalido: ${typeGame}`);
  }

  const result = await model.generateContent(prompt);
  const response = await result.response;

  const dadosRecuperados = parseJsonResponse(response.text());
  return dadosRecuperados;
}
