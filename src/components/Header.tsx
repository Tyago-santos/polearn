import { Link } from "@tanstack/react-router";
export const Header = () => {
  return (
    <header className="bg-background  shadow-lg">
      <nav className="m-auto max-w-4xl flex items-center justify-between ">
        <Link to="/">
          <img className="size-25" src="/logo.png" alt="logo" />
        </Link>
        <ul>
          <li className="text-3xl">Tiago</li>
        </ul>
      </nav>
    </header>
  );
};
