import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type PropsType = {
  titleGame: string;
  descriptionGame: string;
  onClick?: () => void;
};
export function CardComponent({
  titleGame,
  descriptionGame,
  onClick,
}: PropsType) {
  return (
    <Card className="mx-autorw-full flex-1 my-4 md:my-0 max-w-sm border-black/30 hover:border-black/80 cursor-pointer shadow-xl ">
      <CardHeader>
        <CardTitle>{titleGame}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-wrap block min-h-20">{descriptionGame}</p>
      </CardContent>
      <CardFooter>
        <Button
          onClick={onClick}
          variant="outline"
          size="sm"
          className="w-full cursor-pointer border border-text-secondary/50 hover:bg-black hover:text-white"
        >
          Jogar
        </Button>
      </CardFooter>
    </Card>
  );
}
