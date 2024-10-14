<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import Appbar from "./components/Appbar.vue";
import { useUserStore } from "./store/user";

const userStore = useUserStore();
const route = useRoute();

const checkLocalStorage = () => {
  const token = localStorage.getItem("user-token");
  const openRoutes = [
    "/signup",
    "/forgotPassword",
    "/forgotPassword/change",
    "/",
  ];
  if (!token && !openRoutes.includes(route.path)) {
    userStore.notFound();
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
