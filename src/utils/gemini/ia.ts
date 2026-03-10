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
      prompt = `
Retorne apenas JSON válido. Não escreva nenhum texto antes ou depois do JSON.

Gere exatamente ${range} frases.

Configurações:
- Idioma das frases: ${language}
- Nível do estudante: ${nivel}

A resposta deve ser um array JSON.

Estrutura obrigatória de cada objeto:
- id: número sequencial começando em 0
- question: frase em inglês com uma lacuna "___"
- options: array com exatamente 4 alternativas que completam a frase
- correct: array contendo somente a alternativa correta
- explanation: explicação curta em português explicando por que a resposta está correta

Regras:
- Use frases simples apropriadas para o nível ${nivel}
- Não repita frases
- Apenas uma alternativa deve estar correta
- As alternativas devem fazer sentido gramaticalmente

Formato de exemplo:

[
  {
    "id": 1,
    "question": "They ___ soccer on Sunday.",
    "options": ["play", "plays", "played", "playing"],
    "correct": ["play"],
    "explanation": "Usamos 'play' porque o sujeito 'They' exige o verbo no plural no presente simples."
  }
]
`;
      break;

    case "drag":
      prompt = `
Retorne apenas JSON válido.

Crie exatamente ${range} frases  para estudo no nível ${nivel}.
O idioma das frases deve ser totalmente em ${language}.

Formato de resposta: um array JSON.

Cada objeto deve conter:
- id
- question (frase incompleta)
- options (4 alternativas que completam a frase)
- correct (array contendo apenas a alternativa correta)
- explanation (explicação curta do motivo da resposta correta)

Exemplo do formato esperado:

[
  {
    "id": 1,
    "question": "They ___ soccer on Sunday.",
    "options": ["play", "plays", "played", "playing"],
    "correct": ["play"],
    "explanation": "Usamos 'play' porque o sujeito 'They' exige o verbo no plural no presente simples."
  }
]
`;
      break;

    case "drop":
      prompt = `
Retorne apenas JSON válido. Não escreva nenhum texto fora do JSON.

Gere exatamente ${range} frases para exercícios.

Configurações:
- Idioma: ${language}
- Nível do estudante: ${nivel}

Formato da resposta: um array JSON.

Cada objeto deve conter:

- id: número sequencial começando em 0
- wordsShuffled: palavras da frase em ordem embaralhada (todas minúsculas e sem pontuação)
- wordsCorrect: palavras na ordem correta (primeira palavra com letra maiúscula)
- correctSentence: frase correta completa com pontuação final
- explanation: explicação curta em português explicando a estrutura da frase

Regras:
- As frases devem ser simples para o nível ${nivel}
- Não repetir frases
- wordsShuffled deve conter exatamente as mesmas palavras de wordsCorrect, mas em ordem diferente
- wordsShuffled não deve ter pontuação
- correctSentence deve terminar com ponto final

Exemplo do formato esperado:

[
  {
    "id": 1,
    "wordsShuffled": ["watching", "are", "movie", "we", "a"],
    "wordsCorrect": ["We", "are", "watching", "a", "movie"],
    "correctSentence": "We are watching a movie.",
    "explanation": "A frase está no presente contínuo (are + verbo com ing) indicando uma ação acontecendo agora."
  }
]
`;
      break;

    default:
      throw new Error(`Tipo de jogo invalido: ${typeGame}`);
  }

  const primaryApiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const fallbackApiKey = import.meta.env.VITE_GEMINI_API_KEY_2;
  const apiKeys = [primaryApiKey, fallbackApiKey].filter(
    (value, index, keys): value is string =>
      Boolean(value) && keys.indexOf(value) === index,
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
