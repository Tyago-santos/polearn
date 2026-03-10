import { createFileRoute, useParams } from "@tanstack/react-router";
import { lazy, Suspense, useState } from "react";

const GameQuestion = lazy(() => import("@/components/GameQuestion"));
const GameDrag = lazy(() => import("@/components/GameDrag"));
const GameDropResponse = lazy(() => import("@/components/gameDropResponse"));
const ModalAlert = lazy(() => import("@/components/ModalAlert"));

export const Route = createFileRoute("/$game")({
  component: Game,
});

function Game() {
  const params = useParams({ from: "/$game" });
  const [openModal, setOpenModal] = useState(false);

  const fallback = (
    <section className="mx-auto mt-6 max-w-4xl rounded-3xl border border-blue-200 bg-white/90 p-5 shadow-xl shadow-slate-200/70 md:p-8">
      <p className="text-sm font-bold text-blue-600">Carregando jogo...</p>
    </section>
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-emerald-50 px-4 py-6 md:py-10">
      <header className="max-w-4xl m-auto rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-lg shadow-slate-200/60 backdrop-blur-sm md:p-5">
        <nav className="flex items-center justify-between gap-4">
          <img className="size-16 md:size-20" src="/logo.png" alt="logo" />

          <div className="flex gap-3">
            <button
              onClick={() => setOpenModal(true)}
              className="cursor-pointer rounded-full border-2 border-red-500 px-3 py-2 text-[10px] font-bold text-red-500 transition-colors hover:bg-red-500 hover:text-white md:px-5 md:text-base"
            >
              Desistir
            </button>
          </div>
        </nav>
      </header>

      <Suspense fallback={fallback}>
        {params.game === "question" && <GameQuestion />}
        {params.game === "drag" && <GameDrag />}
        {params.game === "drop" && <GameDropResponse />}
        {openModal && <ModalAlert onClose={() => setOpenModal(false)} />}
      </Suspense>
    </main>
  );
}
