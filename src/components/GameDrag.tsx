import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "@hello-pangea/dnd";
import { run } from "@/utils/gemini/ia";
import userStore from "@/utils/zustand/userStore";
import { useNavigate } from "@tanstack/react-router";
import { userSavePoints } from "@/utils/firebase/firebase.db";

type DraggableWord = {
  id: string;
  value: string;
};

const toDraggableWords = (words: string[]): DraggableWord[] =>
  words.map((word, index) => ({
    id: `${word}-${index}`,
    value: word,
  }));

type QuestionType = {
  wordsShuffled: string[];
  wordsCorrect: string[];
  correctSentence: string;
  explanation: string;
};

export default function GameDrag() {
  const [dataResponse, setDataResponse] = useState<QuestionType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [explanationState, setExplanationState] = useState(false);

  const {
    setPointCorrect,
    setPointError,
    pointCorrect,
    pointError,
    resetPoints,
    userId,
  } = userStore();

  const navigate = useNavigate();

  const answerCount = dataResponse.length;
  const [answerActive, setAnswerActive] = useState(0);
  const currentSentence = dataResponse[answerActive];
  const [wordsByAnswer, setWordsByAnswer] = useState<
    Record<number, DraggableWord[]>
  >({});

  const words =
    wordsByAnswer[answerActive] ??
    toDraggableWords(currentSentence?.wordsShuffled ?? []);

  useEffect(() => {
    const getResponse = async () => {
      try {
        setLoading(true);
        setError(null);
        const responseIa = await run("drop");
        setDataResponse(Array.isArray(responseIa) ? responseIa : []);
      } catch (err) {
        setError("Nao foi possivel carregar as frases.");
        setDataResponse([]);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getResponse();
  }, []);

  useEffect(() => {
    if (!currentSentence) {
      return;
    }

    setWordsByAnswer((currentByAnswer) => {
      if (currentByAnswer[answerActive]) {
        return currentByAnswer;
      }

      return {
        ...currentByAnswer,
        [answerActive]: toDraggableWords(currentSentence.wordsShuffled),
      };
    });
  }, [answerActive, currentSentence]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.index === destination.index) {
      return;
    }

    setWordsByAnswer((currentByAnswer) => {
      const currentWords =
        currentByAnswer[answerActive] ??
        toDraggableWords(currentSentence?.wordsShuffled ?? []);
      const nextWords = Array.from(currentWords);
      const [movedWord] = nextWords.splice(source.index, 1);
      nextWords.splice(destination.index, 0, movedWord);
      return {
        ...currentByAnswer,
        [answerActive]: nextWords,
      };
    });
  };

  const calcAnswer = answerCount > 0 ? (answerActive / answerCount) * 100 : 0;

  const handleClickVerifyResponse = () => {
    const currentWords = wordsByAnswer[answerActive] ?? [];
    const userSentence = currentWords.map((w) => w.value).join(" ");
    const correctValue = currentSentence.wordsCorrect
      .map((res) => res)
      .join(" ");

    if (correctValue.toLocaleLowerCase() === userSentence) {
      setAnswerActive((prev) => prev + 1);

      setPointCorrect(1);
      setExplanationState(false);
    } else {
      setPointError(1);
      setExplanationState(true);
    }
  };

  const handleNextAnswer = () => {
    setExplanationState(false);
    setAnswerActive((prev) => prev + 1);
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

  if (!currentSentence) {
    return (
      <section className="max-w-4xl mx-auto mt-6 rounded-3xl border border-blue-200 bg-white/90 p-5 shadow-xl shadow-slate-200/70  md:p-8">
        <div className="flex items-center justify-center">
          <div className="flex gap-5">
            <article>
              <h4 className="text-green-500 font-extrabold">Acertos</h4>
              <span className="border-3 border-green-500 text-green-500 flex justify-center items-center rounded-full size-20">
                {pointCorrect}
              </span>
            </article>
            <article>
              <h4 className="text-red-500 font-extrabold">erradas</h4>
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
      <section className="max-w-4xl mx-auto mt-6 rounded-3xl border border-blue-200 bg-white/90 p-5 shadow-xl shadow-slate-200/70 md:p-8">
        <div className="mb-5 flex items-center justify-between text-sm font-bold text-blue-600">
          <span>Monte a frase na ordem correta</span>
          <span>
            {answerActive + 1}/{answerCount}
          </span>
        </div>

        <div className="relative h-3 w-full overflow-hidden rounded-full bg-blue-200">
          <div
            style={{ width: `${calcAnswer}%` }}
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-700"
          />
        </div>

        <div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-4 md:p-5">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable
              droppableId="questions"
              type="list"
              direction="horizontal"
            >
              {(provided) => (
                <article
                  className="flex flex-wrap gap-3 overflow-y-hidden pb-2"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {words.map((word, index) => (
                    <Draggable
                      key={word.id}
                      draggableId={word.id}
                      index={index}
                      disableInteractiveElementBlocking
                    >
                      {(provided, snapshot) => (
                        <button
                          type="button"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            touchAction: "none",
                          }}
                          className="block shrink-0 rounded-xl border-2 border-blue-500 bg-white px-4 py-2 text-sm font-extrabold text-blue-600 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                          data-dragging={snapshot.isDragging}
                        >
                          {word.value}
                        </button>
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}
                </article>
              )}
            </Droppable>
          </DragDropContext>
          {!explanationState && (
            <div className="text-right">
              <button
                onClick={handleClickVerifyResponse}
                className="cursor-pointer rounded-full border-2 border-blue-500 px-3 py-2 text-[10px] font-bold text-blue-600 transition-colors hover:bg-blue-500 hover:text-white md:px-5 md:text-base"
              >
                Verificar a ordem
              </button>
            </div>
          )}
        </div>
      </section>

      {explanationState && (
        <section className="max-w-4xl mx-auto mt-6 rounded-3xl  border border-red-200 p-5 shadow-xl shadow-slate-200/70 md:p-8 text-red-300">
          <p className="text-red-500">{currentSentence.explanation}</p>

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
