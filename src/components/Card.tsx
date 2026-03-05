import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type PropsType = {
  titleGame: string;
  descriptionGame: string;
  onClick?: () => void;
  color: "blue" | "green" | "red";
};

const colorStyles = {
  blue: {
    card: "border-blue-300 hover:border-blue-400 hover:bg-blue-50/70",
    title: "text-blue-700",
    badge: "bg-blue-100 text-blue-700",
    button:
      "border-blue-500 text-blue-600 hover:border-blue-600 hover:bg-blue-500",
  },
  green: {
    card: "border-emerald-300 hover:border-emerald-400 hover:bg-emerald-50/70",
    title: "text-emerald-700",
    badge: "bg-emerald-100 text-emerald-700",
    button:
      "border-emerald-500 text-emerald-600 hover:border-emerald-600 hover:bg-emerald-500",
  },
  red: {
    card: "border-rose-300 hover:border-rose-400 hover:bg-rose-50/70",
    title: "text-rose-700",
    badge: "bg-rose-100 text-rose-700",
    button:
      "border-rose-500 text-rose-600 hover:border-rose-600 hover:bg-rose-500",
  },
};

export function CardComponent({
  titleGame,
  descriptionGame,
  onClick,
  color,
}: PropsType) {
  const styles = colorStyles[color];

  return (
    <Card
      className={`my-3 flex w-full max-w-sm flex-1 cursor-pointer flex-col rounded-3xl border-2 bg-white/90 shadow-lg shadow-slate-200/70 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl ${styles.card}`}
    >
      <CardHeader className="pb-2">
        <span
          className={`mb-3 w-fit rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider ${styles.badge}`}
        >
          Modo
        </span>
        <CardTitle className={`text-xl font-extrabold ${styles.title}`}>
          {titleGame}
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-5">
        <p className="block min-h-20 text-sm leading-relaxed font-semibold text-slate-600 md:text-base">
          {descriptionGame}
        </p>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button
          onClick={onClick}
          variant="outline"
          size="sm"
          className={`w-full cursor-pointer rounded-xl border-2 text-base font-extrabold transition-colors hover:text-white ${styles.button}`}
        >
          Jogar
        </Button>
      </CardFooter>
    </Card>
  );
}
