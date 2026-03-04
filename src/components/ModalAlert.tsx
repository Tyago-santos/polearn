import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2Icon } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

interface PropType {
  onClose: Dispatch<SetStateAction<boolean>>;
}
export default function AlertBasic({ onClose }: PropType) {
  return (
    <div
      onClick={() => onClose(false)}
      className="h-screen w-screen bg-black/30 flex justify-center items-center fixed top-0 bottom-0 right-0 left-0"
    >
      <Alert className="max-w-md min-h-30">
        <CheckCircle2Icon color="#008000" />
        <AlertTitle>Encontar resposta correta</AlertTitle>
        <AlertDescription>Tem certeza que essa resposta?</AlertDescription>
        <div className="text-right">
          <button
            onClick={() => onClose((prev) => !prev)}
            className="bg-green-500 px-5 py-2 rounded-sm cursor-pointer hover:bg-green-500/70"
          >
            Ok
          </button>
        </div>
      </Alert>
    </div>
  );
}
