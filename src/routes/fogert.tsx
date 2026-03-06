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
    <main className="relative min-h-screen overflow-hidden bg-background px-5 py-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.2),transparent_48%),radial-gradient(circle_at_bottom,_rgba(99,102,241,0.16),transparent_42%)]" />
      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl items-center justify-center">
        <form
          className="w-full max-w-md rounded-2xl border border-border/70 bg-card/85 p-7 shadow-2xl backdrop-blur-sm sm:p-8"
          onSubmit={handleSubmit(handleSubmitClick)}
        >
          <div className="space-y-5">
            <div className="space-y-2">
              <ImageSource alt="logo" />
              <TitleSection title="Esqueceu sua senha" />
              <p className="text-center text-sm text-muted-foreground">
                Redefina sua senha para recuperar o acesso
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

            <Button className="h-11 w-full font-semibold shadow-md">
              Redefinir
            </Button>

            <div className="border-t border-border/70 pt-1">
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
