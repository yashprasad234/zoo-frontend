<script setup="ts">
import { useUserStore } from "~/store/user.ts";

const arr = [1, 2, 3, 4, 5, 6];

const userState = useUserStore();
</script>

<template v-if="!userState.isLoading && userState.user != null">
  <div class="text-off-white font-serif">
    <div class="flex flex-col bg-primary-forest items-center gap-4 py-8">
      <h1 class="text-6xl">Welcome back, {{ userState.user?.username }}!</h1>
      <h3 class="text-2xl">
        Explore your favorite zoos and track your registered animals.
      </h3>
    </div>
  </div>
  <section class="my-8 flex flex-col gap-4 p-4">
    <h1 class="text-4xl font-serif text-center">Zoo Explorer</h1>
    <div class="grid grid-cols-12 gap-6">
      <Card class="col-span-8 col-start-3" />
      <Card class="col-span-8 col-start-3" />
    </div>
    <button
      class="bg-deep-orange w-28 text-off-white mx-auto px-4 py-2"
      @click="navigateTo(`/zoos`)"
    >
      See More
    </button>
  </section>
</template>
