<script setup lang="ts">
import { onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import Appbar from "./components/Appbar.vue";
import { useUserStore } from "./store/user";
import { useMenuStore } from "./store/menu";

const userStore = useUserStore();
const menuStore = useMenuStore();
const route = useRoute();

const checkLocalStorage = () => {
  const token = localStorage.getItem("user-token");
  const openRoutes = [
    "/signup",
    "/forgotPassword",
    "/forgotPassword/change",
    "/login",
    "/",
  ];
  if (!token) {
    userStore.notFound();
    menuStore.reset();
  }
  if (!token && !openRoutes.includes(route.path)) {
    userStore.notFound();
    menuStore.reset();
    navigateTo("/login");
  }
};

onMounted(() => {
  window.addEventListener("storage", checkLocalStorage);
  checkLocalStorage();
});

onBeforeUnmount(() => {
  window.removeEventListener("storage", checkLocalStorage);
});
</script>

<template>
  <div>
    <Appbar />
    <NuxtPage />
  </div>
</template>
