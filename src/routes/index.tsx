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
    <main className="bg-background ">
      <Header />

      <section className="py-5 m-auto max-w-[300px]  lg:max-w-4xl ">
        <TitleSection title="Ranking dos melhores" />
        <div className="mt-4 ">
          <TableComponet />
        </div>
      </section>
      <section className=" m-auto max-w-4xl  ">
        <TitleSection title="Modo de Aprendizagem" />
        <div className="md:flex flex-col px-4 md: px-0 gap-4 md:flex-row my-10">
          <CardComponent
            descriptionGame="Arraste para encontrar a resposta correta"
            titleGame="Arraste e solte"
          />
          <CardComponent
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
      </section>
      <Footer />
    </main>
  );
}
