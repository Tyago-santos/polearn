import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import userStore from "@/utils/zustand/userStore";
import { useNavigate } from "@tanstack/react-router";

import type { Dispatch, SetStateAction } from "react";

interface PropType {
  onClose: Dispatch<SetStateAction<boolean>>;
}
export default function AlertBasic({ onClose }: PropType) {
  const naigate = useNavigate({ from: "/$game" });
  const { resetPoints } = userStore();
  const handleQuitGame = () => {
    resetPoints();
    naigate({
      to: "/",
      replace: true,
    });
  };
  return (
    <div
      onClick={() => onClose(false)}
      className="h-screen w-screen px-4 bg-black/30 flex justify-center items-center fixed top-0 bottom-0 right-0 left-0"
    >
      <Alert className="max-w-md min-h-30 border-none">
        <AlertTitle>Sair do game</AlertTitle>
        <AlertDescription>Deseja realmente sair?</AlertDescription>
        <div className="text-right">
          <button
            onClick={handleQuitGame}
            className="bg-green-400 px-5 py-2 rounded-sm cursor-pointer hover:bg-green-500/70"
          >
            Ok
          </button>
        </div>
      </Alert>
    </div>
  );
}
