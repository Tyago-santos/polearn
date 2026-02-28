import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";

import { InputField } from "@/components/InputField";
import { Button } from "@/components/ui/button";
import TitleSection from "@/components/TitleSection";
import LinkNavigation from "@/components/LinkNavigation";

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

  const handleSubmitClick = (data: FormData) => {
    if (data.email && data.name && data.password) {
      navigate({
        to: "/",
      });
    }
  };

  return (
    <main className="h-screen bg-background flex items-center justify-center px-4">
      <form
        className="w-[300px] overflow-y-scroll lg:overflow-y-hidden py-5"
        onSubmit={handleSubmit(handleSubmitClick)}
      >
        <img src="/logo.png" alt="" />
        <TitleSection title="Faça cadastro  " />
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
          placeholder="fulnao"
          registerType="name"
          label="Nome"
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

        <Button>Cadastrar</Button>

        <LinkNavigation
          describeNavigate="Já possui uma conta? | Faça login"
          navigate="/register"
        />
      </form>
    </main>
  );
}
