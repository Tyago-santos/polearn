import { userStore } from "../zustand/userStore";

async function getGeminiClient(apiKey: string) {
  if (!apiKey) {
    throw new Error("Defina VITE_GEMINI_API_KEY no arquivo .env.");
  }

  const { GoogleGenerativeAI } = await import("@google/generative-ai");
  return new GoogleGenerativeAI(apiKey);
}

function getGeminiModel() {
  return import.meta.env.VITE_GEMINI_MODEL;
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
  const { nivel, language, range } = userStore.getState();
  let prompt = "";

  switch (typeGame) {
    case "question":
      prompt = `Retorne apenas JSON valido no formato de array com ${range} frases de ${language} no nivel ${nivel} e  tambem com explicação da perguntas:
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
      prompt = `Retorne apenas JSON valido no formato de array com ${range} frases no idioma ${language} no nivle ${nivel} e  tambem com explicação da perguntas:
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
      prompt = `Retorne apenas JSON valido no formato de array com ${range} frases no ${language} no nivel ${nivel} tambem faca uma explicação em português no campo de explanaation tambem crie frase sem pontuação:
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

  const primaryApiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const fallbackApiKey = import.meta.env.VITE_GEMINI_API_KEY_2;
  const apiKeys = [primaryApiKey, fallbackApiKey].filter(
    (value, index, keys): value is string => Boolean(value) && keys.indexOf(value) === index,
  );

  if (apiKeys.length === 0) {
    throw new Error("Defina VITE_GEMINI_API_KEY no arquivo .env.");
  }

  let outputText = "";
  let lastError: unknown;

  for (const apiKey of apiKeys) {
    try {
      const gemini = await getGeminiClient(apiKey);
      const model = gemini.getGenerativeModel({
        model: getGeminiModel(),
        generationConfig: {
          responseMimeType: "application/json",
        },
      });
      const response = await model.generateContent(prompt);
      outputText = response.response.text()?.trim() ?? "";

      if (!outputText) {
        throw new Error("Resposta vazia da API Gemini.");
      }

      break;
    } catch (error) {
      lastError = error;
    }
  }

  if (!outputText) {
    throw lastError instanceof Error
      ? lastError
      : new Error("Falha ao consultar a API Gemini.");
  }

  const dadosRecuperados = parseJsonResponse(outputText);
  return dadosRecuperados;
}
