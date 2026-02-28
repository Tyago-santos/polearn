import ImageSource from "@/components/ImageSource";
import { InputField } from "@/components/InputField";
import LinkNavigation from "@/components/LinkNavigation";
import TitleSection from "@/components/TitleSection";
import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";

export const Route = createFileRoute("/fogert")({
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

  const handleSubmitClick = (data: FormData) => {
    console.log(data.email);
    console.log(data.name);
    console.log(data.password);
  };

  return (
    <main className="h-screen bg-background flex items-center justify-center px-5">
      <form
        className="w-[300px] overflow-y-scroll lg:overflow-y-hidden py-3"
        onSubmit={handleSubmit(handleSubmitClick)}
      >
        <ImageSource alt="logo" />
        <TitleSection title="Esqueceu sua senha" />
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

        <Button>Redefinir</Button>

        <LinkNavigation
          describeNavigate="Não possui uma conta? | Faça  cadastro"
          navigate="/register"
        />
      </form>
    </main>
  );
}
