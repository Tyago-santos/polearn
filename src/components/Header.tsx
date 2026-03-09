import { Separator } from "@/components/ui/separator";
import { userLogged } from "@/utils/firebase/firebase.auth";
import { getUserById } from "@/utils/firebase/firebase.db";
import userStore from "@/utils/zustand/userStore";
import { Link } from "@tanstack/react-router";
import { useEffect } from "react";
export const Header = () => {
  const {
    // userId,
    name,
    language,
    nivel,
    setLanguage,
    setNivel,
    setUserId,
    setEmail,
    setName,
  } = userStore();

  useEffect(() => {
    const unsubscribe = userLogged(async (user) => {
      if (!user) {
        setUserId("");
        setEmail("");
        setName("");
        setLanguage("");
        setNivel("");
        return;
      }

      setUserId(user.uid);

      const userData = await getUserById(user.uid);

      if (userData) {
        if (typeof userData.email === "string") setEmail(userData.email);
        if (typeof userData.name === "string") setName(userData.name);
        if (typeof userData.language === "string")
          setLanguage(userData.language);
        if (typeof userData.nivel === "string") setNivel(userData.nivel);
      }
    });

    return () => unsubscribe();
  }, [setEmail, setLanguage, setName, setNivel, setUserId]);

  return (
    <header className="bg-background shadow-lg">
      <nav className="m-auto flex max-w-4xl items-center justify-between px-4">
        <Link to="/">
          <img className="size-25" src="/logo.png" alt="logo" />
        </Link>

        <ul className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm md:px-4">
          <li className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700 text-[8px] md:text-sm">
            {name || "-"}
          </li>
          <Separator orientation="vertical" className="h-5 bg-slate-300" />

          <li className="text-sm font-bold text-[8px] tracking-wide text-slate-700 md:text-base">
            {language || "-"}
          </li>
          <Separator orientation="vertical" className="h-5 bg-slate-300" />
          <li className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-[8px] uppercase tracking-wider text-emerald-700 md:text-sm">
            {nivel || "-"}
          </li>
        </ul>
      </nav>
    </header>
  );
};
