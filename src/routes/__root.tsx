import { createRootRoute, Outlet, redirect } from "@tanstack/react-router";
import { getCurrentUser } from "@/utils/firebase/firebase.auth";
// import { hasCompletedProfile } from "@/utils/..."; // exemplo

const guestOnly = ["/login", "/register"];

export const Route = createRootRoute({
  component: RootLayout,

  beforeLoad: async ({ location }) => {
    const path = location.pathname;
    const user = await getCurrentUser();

    // 1) Usuário NÃO logado: só pode login/register
    if (!user) {
      const isGuestRoute = guestOnly.includes(path);
      if (!isGuestRoute) {
        throw redirect({ to: "/login", replace: true });
      }
      return;
    }

    // 2) Usuário logado: não pode voltar para login/register
    if (guestOnly.includes(path)) {
      throw redirect({ to: "/", replace: true });
    }

    // 3) Exemplo onboarding:
    // const completed = await hasCompletedProfile(user.uid);

    // 3a) se NÃO completou perfil, força /nivel_person
    // if (!completed && path !== "/nivel_person") {
    //   throw redirect({ to: "/nivel_person", replace: true });
    // }

    // 3b) se já completou, bloqueia /nivel_person
    // if (completed && onboardingOnly.includes(path)) {
    //   throw redirect({ to: "/", replace: true });
    // }
  },
});

function RootLayout() {
  return <Outlet />;
}
