import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import TitleSection from "@/components/TitleSection";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ImageSource from "@/components/ImageSource";

export const Route = createFileRoute("/nivel_person")({
  component: RouteComponent,
});

type TypeLanguage =
  | "Inglês"
  | "Espanhol"
  | "Mandarim"
  | "Francês"
  | "Japonês"
  | "Árabe";

type typeNivel = "iniciante" | "intermediário" | "avançado";

type FormData = {
  nivel: typeNivel;
  Language: TypeLanguage;
};

function RouteComponent() {
  const {
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<FormData>();

  const handleSubmitClick = (data: FormData) => {
    console.log(data.Language);
    console.log(data.nivel);

    if (!data.Language)
      setError("Language", {
        message: "Campo obrigatório",
      });
    if (!data.nivel) {
      setError("nivel", {
        message: "Campo obrigatório",
      });
    }
  };

  const handleChooseLangauge = (value: TypeLanguage) => {
    setValue("Language", value);

    setError("Language", { message: "" });
  };

  const handleChooseNivel = (value: typeNivel) => {
    setValue("nivel", value);

    setError("nivel", { message: "" });
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-background px-5 py-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.2),transparent_48%),radial-gradient(circle_at_bottom,_rgba(34,197,94,0.14),transparent_42%)]" />
      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl items-center justify-center">
        <form
          className="w-full max-w-md rounded-2xl border border-border/70 bg-card/85 p-7 shadow-2xl backdrop-blur-sm sm:p-8"
          onSubmit={handleSubmit(handleSubmitClick)}
        >
          <div className="space-y-5">
            <div className="space-y-2">
              <ImageSource alt="logo" />
              <TitleSection title="Escolha sua forma de aprender e idioma" />
              <p className="text-center text-sm text-muted-foreground">
                Personalize seu plano para estudar do seu jeito
              </p>
            </div>

            <div className="space-y-2">
              <Select onValueChange={handleChooseLangauge}>
                <SelectTrigger className="h-11 w-full rounded-md border-border/80">
                  <SelectValue placeholder="Qual idioma você deseja aprender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Qual idioma você deseja aprender</SelectLabel>
                    <SelectItem value="Inglês">Inglês</SelectItem>
                    <SelectItem value="Espanhol">Espanhol</SelectItem>
                    <SelectItem value="Mandarim">Mandarim (Chinês)</SelectItem>
                    <SelectItem value="Francês">Francês</SelectItem>
                    <SelectItem value="Japonês">Japonês</SelectItem>
                    <SelectItem value="Alemão">Alemão</SelectItem>
                    <SelectItem value="Árabe">Árabe</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.Language && (
                <p className="text-sm text-red-500">{errors.Language.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Select onValueChange={handleChooseNivel}>
                <SelectTrigger className="h-11 w-full rounded-md border-border/80">
                  <SelectValue placeholder="Qual seu nível nesse idioma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Qual seu nível nesse idioma</SelectLabel>
                    <SelectItem value="beginner">Iniciante</SelectItem>
                    <SelectItem value="intermediate">Intermediário</SelectItem>
                    <SelectItem value="advanced">Avançado</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              {errors.nivel && (
                <p className="text-sm text-red-500">{errors.nivel.message}</p>
              )}
            </div>

            <Button className="h-11 w-full cursor-pointer font-semibold shadow-md">
              Finalizar
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
