import beginnerQuiz from "@/api";
import { useState } from "react";

import ModalAlert from "@/components/ModalAlert";

export default function GameQuestion() {
  const [answerCount] = useState(beginnerQuiz.length);
  const [answerActive] = useState(6);
  const [openModal, setOpenModal] = useState(false);

  const calcAnswer = (answerActive / answerCount) * 100;

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
          {beginnerQuiz[answerActive].question}
        </p>

        <div className="space-y-3">
          {beginnerQuiz[answerActive].options.map((option, i) => (
            <div key={i}>
              <span
                onClick={() => setOpenModal(true)}
                className="flex cursor-pointer items-center rounded-2xl border-2 border-blue-200 bg-white px-4 py-4 text-lg font-semibold text-slate-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-400 hover:bg-blue-500 hover:text-white"
              >
                {option}
              </span>
            </div>
          ))}
        </div>
      </div>

      {openModal && <ModalAlert onClose={setOpenModal} />}
    </section>
  );
}
