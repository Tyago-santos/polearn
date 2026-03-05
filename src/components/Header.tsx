import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";
export const Header = () => {
  return (
    <header className="bg-background shadow-lg">
      <nav className="m-auto flex max-w-4xl items-center justify-between px-4">
        <Link to="/">
          <img className="size-25" src="/logo.png" alt="logo" />
        </Link>

        <ul className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm md:px-4">
          <li className="text-sm font-bold tracking-wide text-slate-700 md:text-base">
            Tiago
          </li>
          <Separator orientation="vertical" className="h-5 bg-slate-300" />
          <li className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700 md:text-sm">
            Inglês
          </li>
        </ul>
      </nav>
    </header>
  );
};
