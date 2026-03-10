// import data from "@/apiDrop";
import { userSavePoints } from "@/utils/firebase/firebase.db";
import { run } from "@/utils/gemini/ia";
import userStore from "@/utils/zustand/userStore";
import {
  DragDropContext,
  Draggable,
  Droppable,
  type DropResult,
} from "@hello-pangea/dnd";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

type DraggableWord = {
  id: string;
  value: string;
};

type QuestionType = {
  id: number;
  question: string;
  options: string[];
  correct: string[];
  explanation: string;
};

export default function GameDropResponse() {
  const [dataResponse, setDataResponse] = useState<QuestionType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getResponse = async () => {
      try {
        setLoading(true);
        setError(null);
        const responseIa = await run("drag");
        const normalized = Array.isArray(responseIa)
          ? responseIa
          : responseIa && typeof responseIa === "object"
            ? [responseIa]
            : [];
        setDataResponse(normalized as QuestionType[]);
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

  const answerCount = dataResponse.length;
  const [answerActive, setAnswerActive] = useState(0);
  const question = dataResponse[answerActive];
  const [optionBank, setOptionBank] = useState<DraggableWord[]>([]);
  const [slots, setSlots] = useState<(DraggableWord | null)[]>([null]);
  const [explanationState, setExplanationState] = useState(false);
  const {
    pointError,
    pointCorrect,
    setPointCorrect,
    setPointError,
    userId,
    resetPoints,
  } = userStore();

  const mountedSentence = useMemo(() => {
    if (!question) {
      return "Carregando frase...";
    }
    const selectedWord = slots[0]?.value ?? "___";
    const sentence =
      typeof question.question === "string" ? question.question : "___";
    return sentence.replace("___", selectedWord);
  }, [question, slots]);

  useEffect(() => {
    if (!question) return;
    const safeOptions = Array.isArray(question.options) ? question.options : [];
    setSlots([null]);
    setOptionBank(
      safeOptions.map((option, index) => ({
        id: `${question.id}-${option}-${index}`,
        value: option,
      })),
    );
  }, [question]);
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    const sourceId = source.droppableId;
    const destinationId = destination.droppableId;

    if (sourceId === destinationId && source.index === destination.index) {
      return;
    }

    if (sourceId === "OPTION_BANK" && destinationId.startsWith("SLOT_")) {
      const slotIndex = Number(destinationId.split("_")[1]);

      if (slots[slotIndex]) {
        return;
      }

      const nextOptions = [...optionBank];
      const [movedWord] = nextOptions.splice(source.index, 1);
      const nextSlots = [...slots];
      nextSlots[slotIndex] = movedWord;

      setOptionBank(nextOptions);
      setSlots(nextSlots);
      return;
    }

    if (sourceId.startsWith("SLOT_") && destinationId === "OPTION_BANK") {
      const slotIndex = Number(sourceId.split("_")[1]);
      const movedWord = slots[slotIndex];

      if (!movedWord) {
        return;
      }

      const nextSlots = [...slots];
      nextSlots[slotIndex] = null;

      const nextOptions = [...optionBank];
      nextOptions.splice(destination.index, 0, movedWord);

      setSlots(nextSlots);
      setOptionBank(nextOptions);
    }
  };

  const handleClickQuestion = () => {
    if (!question) return;

    setSlots([null]);
    const newSlots = slots.map((slo) => slo?.value).join("");
    const safeCorrect = Array.isArray(question.correct)
      ? question.correct
      : typeof question.correct === "string"
        ? [question.correct]
        : [];
    const newQuestion = safeCorrect.join("");

    if (newQuestion === newSlots) {
      setAnswerActive((prev) => prev + 1);
      setPointCorrect(1);
      setExplanationState(false);
    } else {
      setExplanationState(true);
      setPointError(1);
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
  const calcAnswer = answerCount > 0 ? (answerActive / answerCount) * 100 : 0;

  if (loading) {
    return (
      <section className="mx-auto mt-6 max-w-4xl rounded-3xl border border-blue-200 bg-white/90 p-5 shadow-xl shadow-slate-200/70 md:p-8">
        <p className="text-sm font-bold text-blue-600">Carregando frases...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mx-auto mt-6 max-w-4xl rounded-3xl border border-red-200 bg-white/90 p-5 shadow-xl shadow-slate-200/70 md:p-8">
        <p className="text-sm font-bold text-red-600">{error}</p>
      </section>
    );
  }

  if (!question) {
    return (
      <section className="mx-auto mt-6 max-w-4xl rounded-3xl border border-blue-200 bg-white/90 p-5 shadow-xl shadow-slate-200/70 md:p-8">
        <div className="flex items-center justify-center">
          <div className="gap-5">
            <article>
              <h4 className="my-2 text-center font-extrabold text-green-500">
                Acertos
              </h4>
              <span className="flex size-20 items-center justify-center rounded-full border-3 border-green-500 text-green-500">
                {pointCorrect}
              </span>
            </article>
            <article>
              <h4 className="my-2 text-center font-extrabold text-red-500">
                Erradas
              </h4>
              <span className="flex size-20 items-center justify-center rounded-full border-3 border-red-500 text-red-500">
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
      <section className="mx-auto mt-6 max-w-4xl rounded-3xl border border-blue-200 bg-white/90 p-5 shadow-xl shadow-slate-200/70 md:p-8">
        <div className="mb-5 flex items-center justify-between text-sm font-bold text-blue-600">
          <span>Complete a frase</span>
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
          <p className="mb-4 text-xl font-extrabold text-slate-800 md:text-2xl">
            {mountedSentence}
          </p>

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="SLOT_0" type="list" direction="horizontal">
              {(provided) => (
                <article
                  className="mb-5 flex min-h-16 items-center rounded-xl border-2 border-dashed border-blue-300 bg-white p-3"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {slots[0] ? (
                    <Draggable
                      key={slots[0].id}
                      draggableId={slots[0].id}
                      index={0}
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
                          className="block shrink-0 rounded-xl border-2 border-blue-500 bg-white px-4 py-2 text-sm font-extrabold text-blue-600 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
                          data-dragging={snapshot.isDragging}
                        >
                          {slots[0]?.value}
                        </button>
                      )}
                    </Draggable>
                  ) : (
                    <span className="text-sm font-bold text-slate-500">
                      Arraste a palavra correta para cá
                    </span>
                  )}

                  {provided.placeholder}
                </article>
              )}
            </Droppable>

            <Droppable
              droppableId="OPTION_BANK"
              type="list"
              direction="horizontal"
            >
              {(provided) => (
                <article
                  className="flex flex-wrap gap-3 overflow-x-hidden pb-2"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {optionBank.map((word, index) => (
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
                          className="block shrink-0 rounded-xl border-2 border-blue-500 bg-white px-4 py-2 text-sm font-extrabold text-blue-600 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
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
                onClick={handleClickQuestion}
                className="cursor-pointer rounded-full border-2 border-blue-500 px-3 py-2 text-[10px] font-bold text-blue-600 transition-colors hover:bg-blue-500 hover:text-white md:px-5 md:text-base"
              >
                Verificar a ordem
              </button>
            </div>
          )}
        </div>
      </section>

      {explanationState && (
        <section className="max-w-4xl mx-auto mt-6 rounded-3xl  border border-red-200 p-5 shadow-xl  md:p-8 text-red-300">
          <p className="text-red-500">{question.explanation}</p>

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
