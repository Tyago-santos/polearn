import { useEffect, useState } from "react";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";

type NivelPergunta = "iniciante" | "intermediaria" | "avancado";

type ModalQuestionConfigProps = {
  open: boolean;
  onClose: () => void;
  onConfirm?: (config: { questions: number; nivel: NivelPergunta }) => void;
  navigation: string;
};

export default function ModalQuestionConfig({
  open,
  onClose,
  onConfirm,
  navigation,
}: ModalQuestionConfigProps) {
  const [questions, setQuestions] = useState(10);
  const [nivel, setNivel] = useState<NivelPergunta>("iniciante");

  const navigate = useNavigate({ from: "/" });

  useEffect(() => {
    if (open) {
      setQuestions(10);
      setNivel("iniciante");
    }
  }, [open]);

  if (!open) return null;

  const handleConfirm = () => {
    onConfirm?.({ questions, nivel });
    navigate({
      to: "/$game",
      params: { game: navigation },
    });
    onClose();
  };
  const rangeFillPercent = ((questions - 10) / (100 - 10)) * 100;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="w-full max-w-md rounded-2xl border border-border/70 bg-card/95 p-6 shadow-2xl backdrop-blur-sm"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="question-modal-title"
      >
        <div className="mb-5 flex items-start justify-between gap-3">
          <div>
            <h2 id="question-modal-title" className="text-lg font-semibold">
              Configurar Perguntas
            </h2>
            <p className="text-sm text-muted-foreground">Escolha quantidade</p>
          </div>
          <button
            className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            onClick={onClose}
            type="button"
            aria-label="Fechar modal"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label
                htmlFor="question-range"
                className="text-sm font-medium text-foreground"
              >
                Quantidade de perguntas
              </label>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                {questions}
              </span>
            </div>
            <input
              id="question-range"
              className="h-2 w-full cursor-pointer appearance-none text-blue-500 rounded-lg"
              type="range"
              min={10}
              max={100}
              step={1}
              value={questions}
              onChange={(event) => setQuestions(Number(event.target.value))}
              style={{
                background: `linear-gradient(to right, #4481be 0%,  #00008b ${rangeFillPercent}%, var(--muted) ${rangeFillPercent}%, var(--muted) 100%)`,
              }}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>10</span>
              <span>100</span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose} type="button">
            Cancelar
          </Button>
          <Button
            className="cursor-pointer"
            onClick={handleConfirm}
            type="button"
          >
            Confirmar
          </Button>
        </div>
      </div>
    </div>
  );
}
