import { openRoutes } from "~/data/routes";

export default defineNuxtRouteMiddleware((to, from) => {
  const token = localStorage.getItem("user-token");
  if (!token && openRoutes.includes(to.path)) {
    return;
  }
  if (!token && !openRoutes.includes(to.path)) {
    return navigateTo("/login");
  }
  if (token && openRoutes.includes(to.path)) {
    return navigateTo("/dashboard");
  }
});
