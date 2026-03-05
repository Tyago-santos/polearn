import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Header } from "../components/Header";
import { TableComponet } from "../components/Table";
import { CardComponent } from "@/components/Card";
import TitleSection from "@/components/TitleSection";
import Footer from "@/components/Footer";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const navigate = useNavigate();
  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-emerald-50">
      <Header />

      <section className="mx-auto max-w-5xl px-4 py-6 md:py-10">
        <div className="rounded-3xl border border-slate-200 bg-white/85 p-4 shadow-lg shadow-slate-200/60 backdrop-blur-sm md:p-6">
          <TitleSection title="Ranking dos melhores" />
          <div className="mt-5 overflow-hidden rounded-2xl border border-slate-100 bg-white">
            <TableComponet />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-6 md:pb-10">
        <div className="rounded-3xl border border-slate-200 bg-white/85 p-4 shadow-lg shadow-slate-200/60 backdrop-blur-sm md:p-6">
          <TitleSection title="Modo de Aprendizagem" />
          <div className="my-8 flex flex-col gap-4 md:flex-row">
            <CardComponent
              color="blue"
              descriptionGame="Arraste para encontrar a resposta correta"
              titleGame="Arraste e solte"
            />
            <CardComponent
              color="green"
              descriptionGame="Encontre a resposta correta em meio a várias opções"
              titleGame="Encontre a resposta correta"
              onClick={() =>
                navigate({
                  to: "/$game",
                  params: { game: "question" },
                  replace: true,
                })
              }
            />
            <CardComponent
              color="red"
              onClick={() =>
                navigate({
                  to: "/$game",
                  params: { game: "drag" },
                  replace: true,
                })
              }
              descriptionGame="Encontre a ordem correta das palavras, arrastando as palavras na ordem correta"
              titleGame="Ordem correta"
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
