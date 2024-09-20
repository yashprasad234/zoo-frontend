<script setup="ts">
import { useUserStore } from "~/store/user.ts";
import { isTokenExpired } from "~/utils/jwt";

const userState = useUserStore();
</script>

<template>
  <div
    v-if="!userState.isLoading && userState.user != null"
    class="flex justify-between px-12 py-8"
  >
    <h1>Dashboard for {{ userState.user?.username }}</h1>
  </div>
</template>
