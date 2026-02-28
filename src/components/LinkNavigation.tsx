import { Link } from "@tanstack/react-router";

type PropsType = {
  navigate: string;
  describeNavigate: string;
};

export default function LinkNavigation({
  navigate,
  describeNavigate,
}: PropsType) {
  const describe = describeNavigate.split("|");
  return (
    <Link className="block underline my-3" to={navigate}>
      {describe[0]}
      <span className="font-bold">{describe[1]}</span>{" "}
    </Link>
  );
}
