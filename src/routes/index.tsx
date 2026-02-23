import { createFileRoute } from "@tanstack/react-router";
import { Header } from "../components/Header";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <main className="bg-background h-screen">
      <Header />
    </main>
  );
}
