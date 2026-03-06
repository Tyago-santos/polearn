import apiQuestionDrop from "@/apiDrop";
import {
  DragDropContext,
  Draggable,
  Droppable,
  type DropResult,
} from "@hello-pangea/dnd";
import { useMemo, useState } from "react";

type DraggableWord = {
  id: string;
  value: string;
};

const QUESTION_INDEX = 0;

export default function GameDropResponse() {
  const [answerCount] = useState(apiQuestionDrop.length);
  const [answerActive] = useState(QUESTION_INDEX + 1);
  const question = apiQuestionDrop[QUESTION_INDEX];
  const [optionBank, setOptionBank] = useState<DraggableWord[]>(
    question.options.map((option, index) => ({
      id: `${question.id}-${option}-${index}`,
      value: option,
    })),
  );
  const [slots, setSlots] = useState<(DraggableWord | null)[]>([null]);

  const mountedSentence = useMemo(() => {
    const selectedWord = slots[0]?.value ?? "___";
    return question.question.replace("___", selectedWord);
  }, [question.question, slots]);

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

  const calcAnswer = (answerActive / answerCount) * 100;

  return (
    <section className="max-w-4xl mx-auto mt-6 rounded-3xl border border-blue-200 bg-white/90 p-5 shadow-xl shadow-slate-200/70 md:p-8">
      <div className="mb-5 flex items-center justify-between text-sm font-bold text-blue-600">
        <span>Complete a frase</span>
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
        <div className="text-right">
          <button className="cursor-pointer rounded-full border-2 border-blue-500 px-3 py-2 text-[10px] font-bold text-blue-600 transition-colors hover:bg-blue-500 hover:text-white md:px-5 md:text-base">
            Verificar a ordem
          </button>
        </div>
      </div>
    </section>
  );
}
