<script>
import Appbar from "./components/Appbar.vue";
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
