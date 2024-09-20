<script setup>
import { useUserStore } from "~/store/user";

const userState = useUserStore();
console.log(userState.user);
</script>

<template>
  <div class="p-4">
    <h1 class="text-5xl">ABOUT</h1>
  </div>
</template>
