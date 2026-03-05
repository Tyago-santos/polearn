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
  //const [openModal, setOpenModal] = useState(false);
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
    <div>
      <div className="max-w-2xl relative flex items-center justify-center m-auto h-10  rounded-lg  bg-text-secondary p-4 ">
        <span className="z-99 text-white">
          {" "}
          {answerActive}/{answerCount}
        </span>
        <div
          style={{ width: `${calcAnswer}%` }}
          className="flex transition-width duration-1000 absolute right-0 bottom-0 top-0 left-0 bg-green-500 items-center justify-center rounded-lg "
        ></div>
      </div>

      <div className="max-w-2xl m-auto my-4">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="questions" type="list" direction="horizontal">
            {(provided) => (
              <article
                className="flex overflow-x-hidden flex-wrap gap-4 overflow-x-auto pb-2"
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
                        className="block shrink-0 border-3 border-green-400 px-5 py-2 rounded-lg font-bold text-sm text-green-400 hover:bg-green-400 hover:text-white cursor-pointer"
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
    </div>
  );
}
