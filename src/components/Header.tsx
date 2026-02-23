import { Link } from "@tanstack/react-router";
export const Header = () => {
  return (
    <header className="bg-black">
      <nav className="m-auto max-w-4xl flex items-center justify-between ">
        <Link to="/">
          <img className="size-20" src="/logo.png" alt="logo" />
        </Link>
        <ul>
          <li>sobre</li>

          <li>contatoi</li>
        </ul>
      </nav>
    </header>
  );
};
