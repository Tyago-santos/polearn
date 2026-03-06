import { getCurrentUser } from "@/utils/firebase/firebase.auth";
import { Outlet, createRootRoute, redirect } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
    </>
  ),

  beforeLoad: async ({ location }) => {
    const publicPaths = ["/login", "/register"];
    if (publicPaths.includes(location.pathname)) {
      return;
    }

    const user = await getCurrentUser();
    if (!user) {
      throw redirect({
        to: "/login",
        replace: true,
      });
    }
  },
});
