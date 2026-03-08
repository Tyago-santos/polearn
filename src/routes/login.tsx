import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useForm } from "react-hook-form";

import { InputField } from "@/components/InputField";
import { Button } from "@/components/ui/button";
import TitleSection from "@/components/TitleSection";
import LinkNavigation from "@/components/LinkNavigation";
import ImageSource from "@/components/ImageSource";
import { userLogin } from "@/utils/firebase/firebase.auth";
import { useState } from "react";
import Loading from "@/components/Loading";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

type FormData = {
  name: string;
  email: string;
  password: string;
};

function RouteComponent() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>();

  const [loadingState, setLoadingState] = useState(false);

  const handleSubmitClick = async (data: FormData) => {
    if (data.email && data.password) {
      const user = await userLogin(data.email, data.password);
      setLoadingState(true);
      if (user) {
        setLoadingState(false);

        throw redirect({
          to: "/",
          replace: true,
        });
      }
    }
  };

  if (loadingState) return <Loading />;

  return (
    <main className="relative min-h-screen overflow-hidden bg-background px-5 py-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),transparent_48%),radial-gradient(circle_at_bottom,_rgba(16,185,129,0.14),transparent_40%)]" />
      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl items-center justify-center">
        <form
          className="w-full max-w-md rounded-2xl border border-border/70 bg-card/85 p-7 shadow-2xl backdrop-blur-sm sm:p-8"
          onSubmit={handleSubmit(handleSubmitClick)}
        >
          <div className="space-y-5">
            <div className="space-y-2">
              <ImageSource alt="logo" />
              <TitleSection title="Faça login" />
              <p className="text-center text-sm text-muted-foreground">
                Entre para continuar sua jornada de estudos
              </p>
            </div>
            <InputField
              type="email"
              placeholder="exemplo@gmail.com"
              registerType="email"
              label="E-mail"
              register={register}
              rules={{
                required: "E-mail é obrigatório",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Digite um e-mail válido",
                },
              }}
              errorValidate={errors.email}
              passwodShow={false}
            />

            <div className="flex justify-end">
              <Link
                className="text-sm font-medium text-text-secondary transition-opacity hover:opacity-80"
                to="/fogert"
              >
                Esqueceu a senha
              </Link>
            </div>

            <InputField
              type="password"
              placeholder="123456"
              registerType="password"
              label="Senha"
              register={register}
              rules={{
                required: "Senha é obrigatória",
                minLength: {
                  value: 6,
                  message: "A senha precisa ter no mínimo 6 caracteres",
                },
                maxLength: {
                  value: 10,
                  message: "o username só pode no maximo 10 caracteres",
                },
              }}
              errorValidate={errors.password}
              passwodShow={true}
            />

            <Button className="h-11 w-full font-semibold shadow-md">
              Logar
            </Button>

            <div className="border-t border-border/70 pt-1 text-center">
              <LinkNavigation
                describeNavigate="Não possui uma conta? | Faça  cadastro"
                navigate="/register"
              />
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
