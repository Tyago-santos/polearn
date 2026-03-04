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
          <img className="size-35" src="/logo.png" alt="logo" />

          <button className="border-2 border-red-500 hover:bg-red-500 hover:text-white cursor-pointer px-4 py-2 font-bold text-red-500 rounded-full">
            Desistir
          </button>
        </nav>
      </header>

      {params.game === "question" && <GameQuestion />}
    </main>
  );
}
