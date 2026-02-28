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
    <main className="h-screen bg-background flex items-center justify-center px-5">
      <form
        className="w-[300px] overflow-y-scroll lg:overflow-y-hidden py-3 "
        onSubmit={handleSubmit(handleSubmitClick)}
      >
        <ImageSource alt="logo" />
        <TitleSection title="Escolha sua forma de aprender e idioma" />

        <Select onValueChange={handleChooseLangauge}>
          <SelectTrigger className="w-full max-w-70 my-4">
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
          <p className="text-red-500">{errors.Language.message}</p>
        )}

        <Select onValueChange={handleChooseNivel}>
          <SelectTrigger className="w-full max-w-70 my-4">
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

        {errors.nivel && <p className="text-red-500">{errors.nivel.message}</p>}

        <Button className="cursor-pointer">Finalizar</Button>
      </form>
    </main>
  );
}
