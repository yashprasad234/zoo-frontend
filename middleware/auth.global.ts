const openRoutes = [
  "/signup",
  "/forgotPassword",
  "/forgotPassword/change",
  "/",
  "/login",
];

export default defineNuxtRouteMiddleware((to, from) => {
  const token = localStorage.getItem("user-token");
  if (token && openRoutes.includes(to.path)) {
    return navigateTo("/dashboard");
  }
  if (!token && !openRoutes.includes(to.path)) {
    return navigateTo("/login");
  }
});
