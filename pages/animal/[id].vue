<script setup lang="ts">
import type { AnimalType } from "~/types/animal";
import type { AnimalHistoryType } from "~/types/animal";
import { formatDateTime } from "~/utils/util";

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
    <img :src="animal?.animalImg" alt="" class="h-80 w-full object-cover" />
    <div class="flex justify-center gap-4 font-serif">
      <p class="text-3xl">
        Name: <span class="font-bold">{{ animal?.name }}</span>
      </p>
      <p class="text-3xl">
        Gender: <span class="font-bold">{{ animal?.gender }}</span>
      </p>
      <p class="text-3xl">
        Species: <span class="font-bold">{{ animal?.species }}</span>
      </p>
    </div>
  </div>
  <div class="p-4 flex flex-col mt-8 gap-8 items-center">
    <h1 class="text-4xl font-serif font-bold">Transfer History</h1>
    <table class="table-auto w-1/2 border-collapse font-serif">
      <thead>
        <tr>
          <th class="border border-1 border-slate-900 text-left p-4">
            Transferred On
          </th>
          <th class="border border-1 border-slate-900 text-left p-4">
            Transferred From
          </th>
          <th class="border border-1 border-slate-900 text-left p-4">
            Transferred To
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(animal, index) in animalHistory" :key="index">
          <td class="border border-1 border-slate-900 text-left p-4">
            {{ formatDateTime(animal.transferredOn + "") }}
          </td>
          <td class="border border-1 border-slate-900 text-left p-4">
            {{ animal.from_zoo.name }}
          </td>
          <td class="border border-1 border-slate-900 text-left p-4">
            {{ animal.to_zoo.name }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
