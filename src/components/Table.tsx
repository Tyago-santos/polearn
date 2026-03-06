import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const getRandomNivel = () => {
  const niveis = ["iniciante", "intermediario", "avancado"];
  return niveis[Math.floor(Math.random() * niveis.length)];
};

const nivelStyleMap: Record<string, string> = {
  iniciante: "bg-emerald-500/10 text-emerald-700 border border-emerald-500/30",
  intermediario: "bg-amber-500/10 text-amber-700 border border-amber-500/30",
  avancado: "bg-sky-500/10 text-sky-700 border border-sky-500/30",
};

const scoreStyleMap: Record<string, string> = {
  Paid: "bg-emerald-500/10 text-emerald-700 border border-emerald-500/30",
  Pending: "bg-amber-500/10 text-amber-700 border border-amber-500/30",
  Unpaid: "bg-rose-500/10 text-rose-700 border border-rose-500/30",
};

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    nivel: getRandomNivel(),
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    nivel: getRandomNivel(),
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    nivel: getRandomNivel(),
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    nivel: getRandomNivel(),
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    nivel: getRandomNivel(),
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    nivel: getRandomNivel(),
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    nivel: getRandomNivel(),
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    nivel: getRandomNivel(),
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    nivel: getRandomNivel(),
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    nivel: getRandomNivel(),
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    nivel: getRandomNivel(),
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    nivel: getRandomNivel(),
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    nivel: getRandomNivel(),
  },
];

export function TableComponet() {
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
            <TableHead className="lg:w-[45z%]  g:w-[50]  py-4 g:text-base text-[10px]  font-semibold text-foreground sm:text-lg">
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
          {invoices.slice(0, 9).map((invoice) => (
            <TableRow
              className="cursor-pointer border-border/60 transition-colors hover:bg-muted/40"
              key={invoice.invoice}
            >
              <TableCell className="py-4 font-medium text-[10px] text-foreground/95">
                {invoice.invoice}
              </TableCell>
              <TableCell className="py-4">
                <span
                  className={`inline-flex rounded-full  px-3 py-1 text-xs font-semibold capitalize ${nivelStyleMap[invoice.nivel]}`}
                >
                  {invoice.nivel}
                </span>
              </TableCell>
              <TableCell className="py-4 text-right">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${scoreStyleMap[invoice.paymentStatus]}`}
                >
                  {invoice.paymentStatus}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
