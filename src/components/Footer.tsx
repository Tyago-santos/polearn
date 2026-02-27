import { Link } from "@tanstack/react-router";

const Footer = () => {
  return (
    <footer>
      <nav className=" flex flex-col pb-2 md:flex-row justify-between m-auto max-w-4xl items-center">
        <Link to="/">
          <img className="md:size-25 size-15" src="/logo.png" alt="" />
        </Link>
        <span className="text-sm md: text-normal text-center">
          Todos os direitos reservados &copy;Tiago Santos -
          xlzthyago@gmail.com{" "}
        </span>
      </nav>
    </footer>
  );
};

export default Footer;
