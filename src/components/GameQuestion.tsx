import { useEffect, useState } from "react";

import ModalAlert from "@/components/ModalAlert";
import { run } from "@/utils/gemini/ia";

type ResponseType = {
  options: string;
  isCorrect: boolean;
};

type QuestionType = {
  id: number;
  question: string;
  response: ResponseType[];
};

export default function GameQuestion() {
  const [dataResponse, setDataResponse] = useState<QuestionType[]>([]);

  useEffect(() => {
    const getResponse = async () => {
      const responseIa = await run("question");
      setDataResponse(responseIa);
    };

    getResponse();
  }, []);
  const [answerActive] = useState(8);
  const [openModal, setOpenModal] = useState(false);

  console.log(dataResponse);

  const answerCount = dataResponse.length;
  const currentQuestion = dataResponse[answerActive];
  const calcAnswer = answerCount > 0 ? (answerActive / answerCount) * 100 : 0;

  return (
    <section className="max-w-4xl mx-auto mt-6 rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-xl shadow-slate-200/70 md:p-8">
      <div className="mb-5 flex items-center justify-between text-sm font-bold text-blue-600">
        <span>Pergunta</span>
        <span>
          {answerActive}/{answerCount}
        </span>
      </div>

      <div className="relative h-3 w-full overflow-hidden rounded-full bg-blue-200">
        <div
          style={{ width: `${calcAnswer}%` }}
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-700"
        />
      </div>

      <div className="mt-8">
        <p className="mb-6 text-3xl font-extrabold leading-snug text-blue-800 md:text-3xl">
          {currentQuestion?.question ?? "Carregando pergunta..."}
        </p>

        <div className="space-y-3">
          {currentQuestion?.response.map(({ options }, i) => (
            <div key={i}>
              <span
                onClick={() => setOpenModal(true)}
                className="flex cursor-pointer items-center rounded-2xl border-2 border-blue-200 bg-white px-4 py-4 text-lg font-semibold text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-400 hover:bg-blue-500 hover:text-white"
              >
                {options}
              </span>
            </div>
          ))}
        </div>
      </div>

      {openModal && <ModalAlert onClose={setOpenModal} />}
    </section>
  );
}
