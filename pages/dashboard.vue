<script setup>
import { ref, onMounted } from "vue";
import { userState } from "~/store/store";
</script>

<template>
  <div class="flex justify-between px-12 py-8">
    <h1>Dashboard for {{ userState.user?.username }}</h1>
  </div>
</template>
