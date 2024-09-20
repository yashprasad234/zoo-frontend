<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import Appbar from "./components/Appbar.vue";
import { useUserStore } from "./store/user";

const userStore = useUserStore();

const checkLocalStorage = () => {
  const token = localStorage.getItem("user-token");
  if (!token) {
    // If token is missing, trigger a logout
    userStore.notFound();
    navigateTo("/login");
  }
};

onMounted(() => {
  window.addEventListener("storage", checkLocalStorage);
  checkLocalStorage(); // Perform the check when the component is mounted
});

onBeforeUnmount(() => {
  window.removeEventListener("storage", checkLocalStorage);
});
</script>

<template>
  <div>
    <NuxtLayout>
      <Appbar />
      <NuxtPage />
    </NuxtLayout>
    <UNotifications />
  </div>
</template>
