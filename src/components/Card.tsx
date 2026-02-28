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
};
export function CardComponent({ titleGame, descriptionGame }: PropsType) {
  return (
    <Card className="mx-autorw-full flex-1 my-4 md:my-0 max-w-sm border-black/10 hover:border-black/50 cursor-pointer shadow-xl ">
      <CardHeader>
        <CardTitle>{titleGame}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-wrap block min-h-20">{descriptionGame}</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full cursor-pointer">
          Jogar
        </Button>
      </CardFooter>
    </Card>
  );
}
