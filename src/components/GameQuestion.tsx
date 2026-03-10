import { useEffect, useMemo, useState } from "react";

// import ModalAlert from "@/components/ModalAlert";
import { run } from "@/utils/gemini/ia";
import userStore from "@/utils/zustand/userStore";
import { userSavePoints } from "@/utils/firebase/firebase.db";
import { useNavigate } from "@tanstack/react-router";

type ResponseType = {
  options: string;
  isCorrect: boolean;
};

type QuestionType = {
  id: number;
  question: string;
  response?: ResponseType[];
  explanation: string;
};

export default function GameQuestion() {
  const [dataResponse, setDataResponse] = useState<QuestionType[]>([]);
  const {
    setPointCorrect,
    setPointError,
    pointCorrect,
    pointError,
    resetPoints,
    userId,
  } = userStore();
  const [explanationState, setExplanationState] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getResponse = async () => {
      try {
        setLoading(true);
        setError(null);
        const responseIa = await run("question");
        setDataResponse(Array.isArray(responseIa) ? responseIa : []);
        setCurrentIndex(0);
      } catch (err) {
        setError("Nao foi possivel carregar as perguntas.");
        setDataResponse([]);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getResponse();
  }, []);

  const answerCount = dataResponse.length;
  const currentQuestion = dataResponse[currentIndex];

  const safeResponses = useMemo(
    () =>
      Array.isArray(currentQuestion?.response) ? currentQuestion.response : [],
    [currentQuestion],
  );

  const calcAnswer =
    answerCount > 0 ? ((currentIndex + 1) / answerCount) * 100 : 0;

  const handleClickCorrectResponse = (value: ResponseType) => {
    if (value.isCorrect) {
      setPointCorrect(1);
      setExplanationState(false);
      setCurrentIndex((prev) => prev + 1);
    } else {
      setExplanationState(true);
      setPointError(1);
    }
  };

  const handleNextAnswer = () => {
    setExplanationState(false);
    setCurrentIndex((prev) => prev + 1);
  };

  const hadleCickSavePoint = async () => {
    await userSavePoints(userId);
    resetPoints();
    navigate({
      to: "/",
      replace: true,
    });
  };

  if (loading) {
    return (
      <section className="max-w-4xl mx-auto mt-6 rounded-3xl border border-blue-200 bg-white/90 p-5 shadow-xl shadow-slate-200/70 md:p-8">
        <p className="text-sm font-bold text-blue-600">Carregando frases...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="max-w-4xl mx-auto mt-6 rounded-3xl border border-red-200 bg-white/90 p-5 shadow-xl shadow-slate-200/70 md:p-8">
        <p className="text-sm font-bold text-red-600">{error}</p>
      </section>
    );
  }

  if (!currentQuestion) {
    return (
      <section className="max-w-4xl mx-auto mt-6 rounded-3xl flex items-center justify-center border border-blue-200 bg-white/90 p-5 shadow-xl shadow-slate-200/70 md:p-8">
        <div className="flex items-center justify-center">
          <div className="flex gap-5">
            <article>
              <h4 className="text-green-500 text-center font-extrabold my-2">
                Acertos
              </h4>
              <span className="border-3 border-green-500 text-green-500 flex justify-center items-center rounded-full size-20">
                {pointCorrect}
              </span>
            </article>
            <article>
              <h4 className="text-red-500 font-extrabold text-center my-2">
                Erradas
              </h4>
              <span className="border-3 border-red-500 text-red-500 flex justify-center items-center rounded-full size-20">
                {pointError}
              </span>
            </article>
          </div>
        </div>

        <div className="text-right">
          <button
            onClick={hadleCickSavePoint}
            className="cursor-pointer rounded-full border-2 border-blue-500 px-3 py-2 text-[10px] font-bold text-blue-600 transition-colors hover:bg-blue-500 hover:text-white md:px-5 md:text-base"
          >
            Finalizar
          </button>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="max-w-4xl mx-auto mt-6 rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-xl shadow-slate-200/70 md:p-8">
        <div className="mb-5 flex items-center justify-between text-sm font-bold text-blue-600">
          <span>Pergunta</span>
          <span>
            {currentIndex + 1}/{answerCount}
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

          {!explanationState && (
            <div className="space-y-3">
              {safeResponses.map((item, i) => (
                <div onClick={() => handleClickCorrectResponse(item)} key={i}>
                  <span className="flex cursor-pointer items-center rounded-2xl border-2 border-blue-200 bg-white px-4 py-4 text-lg font-semibold text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-400 hover:bg-blue-500 hover:text-white">
                    {item.options}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {explanationState && (
        <section className="max-w-4xl mx-auto mt-6 rounded-3xl  border border-red-200 p-5 shadow-xl shadow-slate-200/70 md:p-8 text-red-300">
          <p className="text-red-500">{currentQuestion.explanation}</p>

          <div className="text-right">
            <button
              onClick={handleNextAnswer}
              className="cursor-pointer rounded-full border-2 border-red-500 px-3 py-2 text-[10px] font-bold text-red-600 transition-colors hover:bg-red-500 hover:text-white md:px-5 md:text-base"
            >
              ir para proxima pergunta
            </button>
          </div>
        </section>
      )}
    </>
  );
}
