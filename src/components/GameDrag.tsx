import beginnerQuiz from "@/api";
import sentences from "@/apiSetences";
import { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "@hello-pangea/dnd";

type DraggableWord = {
  id: string;
  value: string;
};

const toDraggableWords = (words: string[]): DraggableWord[] =>
  words.map((word, index) => ({
    id: `${word}-${index}`,
    value: word,
  }));

export default function GameDrag() {
  const [answerCount] = useState(beginnerQuiz.length);
  const [answerActive] = useState(6);
  const currentSentence = sentences[answerActive];
  const [wordsByAnswer, setWordsByAnswer] = useState<
    Record<number, DraggableWord[]>
  >(() => ({
    [answerActive]: toDraggableWords(currentSentence?.wordsShuffled ?? []),
  }));
  const words =
    wordsByAnswer[answerActive] ??
    toDraggableWords(currentSentence?.wordsShuffled ?? []);

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

  const calcAnswer = (answerActive / answerCount) * 100;

  return (
    <section className="max-w-4xl mx-auto mt-6 rounded-3xl border border-blue-200 bg-white/90 p-5 shadow-xl shadow-slate-200/70 md:p-8">
      <div className="mb-5 flex items-center justify-between text-sm font-bold text-blue-600">
        <span>Monte a frase na ordem correta</span>
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
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="questions" type="list" direction="horizontal">
            {(provided) => (
              <article
                className="flex flex-wrap gap-3 overflow-x-hidden pb-2"
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
      </div>
    </section>
  );
}
