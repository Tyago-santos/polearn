import OpenAI from "openai";
import { userStore } from "../zustand/userStore";

// Substitua pela sua chave real

function getOpenAIClient() {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  return new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true,
  });
}

function getOpenAIModel() {
  return import.meta.env.VITE_OPENAI_MODEL || "gpt-4o";
}

function sanitizeJsonText(text: string) {
  return text
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/i, "")
    .trim();
}

function extractJsonCandidate(text: string) {
  const arrayStart = text.indexOf("[");
  const arrayEnd = text.lastIndexOf("]");
  if (arrayStart !== -1 && arrayEnd > arrayStart) {
    return text.slice(arrayStart, arrayEnd + 1);
  }

  const objectStart = text.indexOf("{");
  const objectEnd = text.lastIndexOf("}");
  if (objectStart !== -1 && objectEnd > objectStart) {
    return text.slice(objectStart, objectEnd + 1);
  }

  return text;
}

function parseJsonResponse(text: string) {
  const sanitized = sanitizeJsonText(text);

  try {
    return JSON.parse(sanitized);
  } catch {
    const extracted = extractJsonCandidate(sanitized);
    return JSON.parse(extracted);
  }
}

export async function run(typeGame: string) {
  const { nivel, language } = userStore.getState();
  const openai = getOpenAIClient();

  let prompt = "";

  switch (typeGame) {
    case "question":
      prompt = `Retorne apenas JSON valido no formato de array com 10 frases de ${language} no nivel ${nivel} e  tambem com explicação da perguntas:
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
      prompt = `Retorne apenas JSON valido no formato de array com 10 frases no idioma ${language} no nivle ${nivel} e  tambem com explicação da perguntas:
[
  {
    "id": 1,
    "question": "They ___ soccer on Sunday.",
    "options": ["play", "plays", "played", "playing"],
    "correct": ["play"],
    "explanation": ""
  }
]`;
      break;

    case "drop":
      prompt = `Retorne apenas JSON valido no formato de array com 10 frases no ${language} no nivel ${nivel} tambem faca uma explicação em português no campo de explanaation tambem crie frase sem pontuação:
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

  const response = await openai.responses.create({
    model: getOpenAIModel(),
    input: prompt,
  });

  const outputText = response.output_text?.trim();
  if (!outputText) {
    throw new Error("Resposta vazia da OpenAI.");
  }

  const dadosRecuperados = parseJsonResponse(outputText);
  return dadosRecuperados;
}
