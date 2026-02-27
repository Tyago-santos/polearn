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
    <Table className="m-auto w-full  ">
      <TableHeader>
        <TableRow className=" border-text-secondary">
          <TableHead className="text-xl w-[45%]">Nome</TableHead>
          <TableHead>Nivel</TableHead>
          <TableHead className="text-right text-xl">Pontuação</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.slice(0, 9).map((invoice) => (
          <TableRow
            className="cursor-pointer border-text-secondary/30"
            key={invoice.invoice}
          >
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.nivel}</TableCell>
            <TableCell className="text-right">
              {invoice.paymentStatus}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
