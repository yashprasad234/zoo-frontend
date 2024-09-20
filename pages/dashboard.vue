<script setup>
import { useUserStore } from "~/store/user";

const userState = useUserStore();
console.log(userState.user);
</script>

<template>
  <div>dashboard</div>
  <!-- <div
    v-if="!userState.isLoading && userState.user != null"
    class="flex justify-between px-12 py-8"
  >
    <h1>Dashboard for {{ userState.user?.username }}</h1>
  </div> -->
</template>
