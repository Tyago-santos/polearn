import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";

import { InputField } from "@/components/InputField";
import { Button } from "@/components/ui/button";
import TitleSection from "@/components/TitleSection";
import LinkNavigation from "@/components/LinkNavigation";
import ImageSource from "@/components/ImageSource";

import userStore from "@/utils/zustand/userStore";
import { userRegister } from "@/utils/firebase/firebase.auth";
import Loading from "@/components/Loading";
import { useState } from "react";

export const Route = createFileRoute("/register")({
  component: Register,
});

type FormData = {
  name: string;
  email: string;
  password: string;
};

function Register() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>();

  const navigate = useNavigate();

  const { setName, setEmail, setUserId } = userStore();
  const [loadingState, setLoadingState] = useState(false);

  const handleSubmitClick = async (data: FormData) => {
    if (data.email && data.name && data.password) {
      setLoadingState(true);
      const user = await userRegister(data.email, data.password);
      if (user) {
        setEmail(data.email);
        setName(data.name);
        setUserId(user.uid);

        setLoadingState(false);

        navigate({
          to: "/nivel_person",
        });
      }
    }
  };

  if (loadingState) return <Loading />;

  return (
    <main className="relative min-h-screen overflow-hidden bg-background px-4 py-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),transparent_48%),radial-gradient(circle_at_bottom,_rgba(34,197,94,0.16),transparent_42%)]" />
      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl items-center justify-center">
        <form
          className="w-full max-w-md rounded-2xl border border-border/70 bg-card/85 p-7 shadow-2xl backdrop-blur-sm sm:p-8"
          onSubmit={handleSubmit(handleSubmitClick)}
        >
          <div className="space-y-5">
            <div className="space-y-2">
              <ImageSource alt="logo" />
              <TitleSection title="Faça cadastro  " />
              <p className="text-center text-sm text-muted-foreground">
                Crie sua conta para começar agora
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
              }}
              errorValidate={errors.password}
              passwodShow={true}
            />

            <InputField
              type="text"
              placeholder="exemplo:fulnao1223"
              registerType="name"
              label="username"
              register={register}
              rules={{
                required: "Nome é obrigatório",
                minLength: {
                  value: 2,
                  message: "O Nome precisa ter no mínimo 2 caracteres",
                },
              }}
              errorValidate={errors.name}
              passwodShow={false}
            />

            <Button className="h-11 w-full font-semibold shadow-md">
              Cadastrar
            </Button>

            <div className="border-t border-border/70 pt-1">
              <LinkNavigation
                describeNavigate="Já possui uma conta? | Faça login"
                navigate="/login"
              />
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
