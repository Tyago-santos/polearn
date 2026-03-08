import { cn } from "@/lib/utils";

type LoadingProps = {
  message?: string;
  className?: string;
};

export default function Loading({
  message = "Carregando...",
  className,
}: LoadingProps) {
  return (
    <div
      className={cn("flex flex-col items-center justify-center gap-3 py-8", className)}
      role="status"
      aria-live="polite"
    >
      <span className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
      <p className="text-sm font-medium text-slate-600">{message}</p>
    </div>
  );
}
