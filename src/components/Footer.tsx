import { Link } from "@tanstack/react-router";

const Footer = () => {
  return (
    <footer className="mt-10 border-t border-slate-200 bg-white/70">
      <nav className="m-auto flex max-w-4xl flex-col items-center justify-between gap-3 px-4 py-4 md:flex-row">
        <Link to="/">
          <img className="size-14 md:size-16" src="/logo.png" alt="Logo" />
        </Link>
        <span className="text-center text-sm text-slate-600">
          Todos os direitos reservados &copy;Tiago Santos - xlzthyago@gmail.com
        </span>
      </nav>
    </footer>
  );
};

export default Footer;
