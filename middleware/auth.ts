export default defineNuxtRouteMiddleware((to, from) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return navigateTo("/login"); // Redirect to login if no token
  }
});
