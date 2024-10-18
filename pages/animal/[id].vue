<script setup lang="ts">
import type { AnimalType } from "~/types/animal";
import type { AnimalHistoryType } from "~/types/animal";

const route = useRoute();
const loading = ref(false);
const animal = ref<AnimalType>();
const animalHistory = ref<AnimalHistoryType[]>();

const fetchAnimalHistory = async () => {
  useCustomFetch(`/animal/history/${route.params.id}`, {
    method: "GET",
  })
    .then((res) => {
      animalHistory.value = res as AnimalHistoryType[];
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

const fetchAnimal = async () => {
  useCustomFetch(`/animal/id/${route.params.id}`, {
    method: "GET",
  })
    .then((res) => {
      console.log(res);
      animal.value = res as AnimalType;
      fetchAnimalHistory();
    })
    .catch((err) => {
      console.log(err);
    });
};

onMounted(() => {
  fetchAnimal();
});
</script>
<template>
  <div v-if="loading">Loading...</div>
  <div class="flex flex-col justify-center items-center">
    <img :src="animal?.animalImg" alt="" />
    <p>{{ animal?.name }}</p>
    <p>{{ animal?.gender }}</p>
    <p>{{ animal?.species }}</p>
  </div>
  <div class="flex flex-col gap-4 items-center my-4">
    <div v-for="(animal, index) in animalHistory" :key="index">
      <h1 class="text-5xl text-center">{{ index + 1 }}.</h1>
      <p>Transferred On: {{ animal.transferredOn }}</p>
      <p>Transferred From: {{ animal.from_zoo.name }}</p>
      <p>Transferred To: {{ animal.to_zoo.name }}</p>
    </div>
  </div>
</template>
