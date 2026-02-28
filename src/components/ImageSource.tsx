type PropsType = {
  alt: string;
};

export default function ImageSource({ alt }: PropsType) {
  return <img className="size-30 m-auto" src="/logo.png" alt={alt} />;
}
