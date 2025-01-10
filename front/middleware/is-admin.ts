import { ROLE_ADMIN } from "~/constants/user";
import { useAuthStore } from "~/store/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore();
  const user = auth.user;

  if (user == null) {
    return navigateTo("/auth/login");
  }

  if (auth.isAuthenticated && user.activeRole !== ROLE_ADMIN) {
    return abortNavigation("403: Unauthorized.");
  }
});
