export async function getInforIa() {
  // 1. Pega o dado que veio do formulário

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyBKsVu08lBPg9ykbzIBX7BerBVsXIEZGiA`;

  const requestBody = {
    contents: [
      {
        parts: [
          {
            // 2. Insere o dado no prompt dinamicamente
            text: `Gere 10  perguntas estruturada ingles para iniciante 
 [
  {
    id: 1,
    question: "",
    tema: "",
    response: [
      { options: "", isCorrect: Boolean },
      { options: "", isCorrect: Boolean },
      { options: "", isCorrect: Boolean },
      { options: "", isCorrect: Boolean }
    ]
  }] `,
          },
        ],
      },
    ],
    generationConfig: {
      response_mime_type: "application/json",
      // response_schema: schemaString
    },
  };

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  });

  const data = await response.json();
  const aiText = JSON.parse(data.candidates[0].content.parts[0].text);

  return aiText;
}
