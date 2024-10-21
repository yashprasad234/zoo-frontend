import { openRoutes } from "~/data/routes";
import { useUserStore } from "~/store/user";
import { useMenuStore } from "~/store/menu";
import { useAvatarStore } from "~/store/avatar";

export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore();
  const menuStore = useMenuStore();
  const avatarStore = useAvatarStore();
  avatarStore.close();
  const userToken = useCookie("user-token");
  const token = userToken.value;
  if (!token && openRoutes.includes(to.path)) {
    return;
  }
  if (!token && !openRoutes.includes(to.path)) {
    userStore.notFound();
    menuStore.reset();
    return navigateTo("/login");
  }
  if (token && openRoutes.includes(to.path)) {
    return navigateTo("/dashboard");
  }
});
