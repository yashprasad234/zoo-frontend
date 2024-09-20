<script setup>
import { useUserStore } from "~/store/user";

const userState = useUserStore();
console.log(userState.user);
</script>

<template>
  <!-- <div
    v-if="userState.isLoading"
    class="flex flex-col justify-center items-center gap-8"
  >
    <h1 class="text-3xl text-center">Welcome to the Zoo</h1>
    <span class="text-xl text-center"
      >If you are not registered already please
      <a class="underline text-sky-300 mx-2" href="/signup">Signup</a> else
      <a class="underline text-sky-300 mx-2" href="/login">Login</a>
    </span>
  </div>
  <div
    v-if="!userState.isLoading"
    class="flex flex-col justify-center items-center"
  >
    <h1 class="text-3xl text-center">
      Welcome back {{ userState.user.username }}
    </h1>
  </div> -->
  <div>home</div>
</template>
