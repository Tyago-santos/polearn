import GameDrag from "@/components/GameDrag";
import GameQuestion from "@/components/GameQuestion";
import { createFileRoute, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/$game")({
  component: Game,
});

function Game() {
  const params = useParams({ from: "/$game" });

  return (
    <main className="px-4">
      <header>
        <nav className="max-w-2xl m-auto flex items-center justify-between">
          <img className="size-20 lg:size-35" src="/logo.png" alt="logo" />

          <div className="flex gap-4">
            <button className="border-2 border-red-500 hover:bg-red-500 hover:text-white cursor-pointer  font-bold p-2 text-red-500 rounded-full text-[10px] lg:text-xl lg:px-4 lg:py-2 ">
              Desistir
            </button>

            <button className="border-2 border-green-500 hover:bg-green-500 hover:text-white cursor-pointer text-sm  text-[10px] p-2 lg:text-xl lg:px-4 lg:py-2  text-sm font-bold text-green-500 rounded-full">
              Verificar a ordem
            </button>
          </div>
        </nav>
      </header>

      {params.game === "question" && <GameQuestion />}
      {params.game === "drag" && <GameDrag />}
    </main>
  );
}
