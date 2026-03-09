import { useEffect, useState } from "react";
import { getUsers, type RankingUser } from "@/utils/firebase/firebase.db";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const nivelStyleMap: Record<string, string> = {
  iniciante: "bg-emerald-500/10 text-emerald-700 border border-emerald-500/30",
  intermediario: "bg-amber-500/10 text-amber-700 border border-amber-500/30",
  avancado: "bg-sky-500/10 text-sky-700 border border-sky-500/30",
};

const normalizeNivel = (nivel: string) => {
  const value = nivel.toLowerCase();

  if (value.includes("inic")) return "iniciante";
  if (value.includes("inter")) return "intermediario";
  if (value.includes("avan")) return "avancado";

  return "iniciante";
};

export function TableComponet() {
  const [users, setUsers] = useState<RankingUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const allUsers = await getUsers();
        setUsers(allUsers);
      } catch (err) {
        setError("Nao foi possivel carregar o ranking.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  return (
    <div className="w-full rounded-2xl border border-border/70 bg-card/90 p-3 shadow-xl backdrop-blur-sm sm:p-5">
      <div className="flex gap-4">
        <button className="cursor-pointer bg-emerald-500/10 text-emerald-700 border border-emerald-500/30 rounded-full border-2 border-emerald-500 px-3 py-2 text-[10px] font-bold transition-colors hover:bg-emerald-500 hover:text-white md:px-5 md:text-base">
          Iniciante
        </button>
        <button className="cursor-pointer bg-amber-500/10 text-amber-700 border border-amber-500/30 hover:bg-amber-500 hover:text-white rounded-full border-2  px-3 py-2 text-[10px] font-bold transition-colors   md:px-5 md:text-base">
          Intermediário
        </button>

        <button
          className="cursor-pointer rounded-full bg-sky-500/10 text-sky-700 border border-sky-500/30
        hover:bg-sky-500 hover:text-white py-2 px-3 text-[10px] font-bold  transition-colors  text-sky-700  md:px-5 md:text-base"
        >
          Avançado
        </button>
      </div>
      <Table className="m-auto w-full">
        <TableHeader>
          <TableRow className="border-b border-border/80 hover:bg-transparent">
            <TableHead className="w-[45%]  g:w-[50]  py-4 g:text-base text-[10px]  font-semibold text-foreground sm:text-lg">
              Nome
            </TableHead>
            <TableHead className="py-4 lg:text-base text-[10px] font-semibold text-foreground sm:text-lg">
              Nivel
            </TableHead>
            <TableHead className="py-4 text-right g:text-base text-[10px]  font-semibold text-foreground sm:text-lg">
              Pontuação
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading && (
            <TableRow className="border-border/60">
              <TableCell className="py-4 text-sm" colSpan={3}>
                Carregando ranking...
              </TableCell>
            </TableRow>
          )}

          {error && (
            <TableRow className="border-border/60">
              <TableCell className="py-4 text-sm text-red-600" colSpan={3}>
                {error}
              </TableCell>
            </TableRow>
          )}

          {!loading &&
            !error &&
            users.slice(0, 9).map((user) => (
            <TableRow
              className="cursor-pointer border-border/60 transition-colors hover:bg-muted/40"
              key={user.id}
            >
              <TableCell className="py-4 font-medium text-[10px] text-foreground/95">
                {user.name}
              </TableCell>
              <TableCell className="py-4">
                <span
                  className={`inline-flex rounded-full  px-3 py-1 text-xs font-semibold capitalize ${nivelStyleMap[normalizeNivel(user.nivel)]}`}
                >
                  {user.nivel}
                </span>
              </TableCell>
              <TableCell className="py-4 text-right font-semibold text-foreground/95">
                {user.point}
              </TableCell>
            </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
