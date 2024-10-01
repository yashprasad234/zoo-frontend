<script setup>
import Card from "~/components/Card.vue";
const arr = [1, 2, 3, 4, 5, 6, 7, 8];
</script>
<template>
  <h1 class="text-5xl font-serif text-center tracking-widest">OUR ANIMALS</h1>
  <div class="grid grid-cols-12 grid-rows-12 gap-8 my-8">
    <Card v-for="n in arr" :key="n" class="col-start-3 col-span-8 row-span-4" />
  </div>
</template>
