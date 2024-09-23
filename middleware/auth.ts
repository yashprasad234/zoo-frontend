export default defineNuxtRouteMiddleware((to, from) => {
  if (["/signup", "/forgetPassword/*"].includes(from.path)) return;
  const token = localStorage.getItem("token");
  if (!token) {
    return navigateTo("/login"); // Redirect to login if no token
  }
});
