type PropsType = {
  title: string;
};
const TitleSection = ({ title }: PropsType) => {
  return <h2 className="text-text-secondary text-2xl text-center">{title}</h2>;
};
export default TitleSection;
