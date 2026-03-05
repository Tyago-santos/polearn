import GameDrag from "@/components/GameDrag";
import GameDropResponse from "@/components/gameDropResponse";
import GameQuestion from "@/components/GameQuestion";
import { createFileRoute, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/$game")({
  component: Game,
});

function Game() {
  const params = useParams({ from: "/$game" });

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-emerald-50 px-4 py-6 md:py-10">
      <header className="max-w-4xl m-auto rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-lg shadow-slate-200/60 backdrop-blur-sm md:p-5">
        <nav className="flex items-center justify-between gap-4">
          <img className="size-16 md:size-20" src="/logo.png" alt="logo" />

          <div className="flex gap-3">
            <button className="cursor-pointer rounded-full border-2 border-red-500 px-3 py-2 text-[10px] font-bold text-red-500 transition-colors hover:bg-red-500 hover:text-white md:px-5 md:text-base">
              Desistir
            </button>

            <button className="cursor-pointer rounded-full border-2 border-emerald-500 px-3 py-2 text-[10px] font-bold text-emerald-600 transition-colors hover:bg-emerald-500 hover:text-white md:px-5 md:text-base">
              Verificar a ordem
            </button>
          </div>
        </nav>
      </header>

      {params.game === "question" && <GameQuestion />}
      {params.game === "drag" && <GameDrag />}
      {params.game === "drop" && <GameDropResponse />}
    </main>
  );
}
