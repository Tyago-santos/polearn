import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";
export const Header = () => {
  return (
    <header className="bg-background  shadow-lg">
      <nav className="m-auto max-w-4xl flex items-center justify-between ">
        <Link to="/">
          <img className="size-25" src="/logo.png" alt="logo" />
        </Link>
        <ul className="flex h-5 items-center gap-4 text-sm">
          <li className="text-xl text-black/50">Tiago</li>
          <Separator orientation="vertical" />
          <li className="text-xl  text-black/30">Inglês</li>
        </ul>
      </nav>
    </header>
  );
};
