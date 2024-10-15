<script setup lang="ts">
import type { AnimalType } from "~/types/animal";
import type { ZooType } from "~/types/zoo";

const allZoos = ref<ZooType[]>([]);
const myAnimal = ref<AnimalType>();
const route = useRoute();

const handleTransfer = async (e: Event) => {
  try {
    const res = await useCustomFetch(
      `/animal/id/${route.params.id}?zooId=${e?.currentTarget?.parentElement?.dataset.id}`,
      {
        method: "PUT",
      }
    );
    navigateTo("/zoos");
  } catch (err) {
    console.log(err);
  }
};

const fetchAnimal = async () => {
  try {
    const res = await useCustomFetch(`/animal/id/${route.params.id}`, {
      method: "GET",
    });
    myAnimal.value = res as AnimalType;
    await fetchAllZoos();
  } catch (err) {
    console.log(err);
  }
};

const fetchAllZoos = async () => {
  try {
    const res = await useCustomFetch("/zoo/list", {
      method: "GET",
    });
    allZoos.value = (res as ZooType[]).filter((zoo) => {
      if (zoo.id != myAnimal?.value?.zoo.id) return zoo;
    });
  } catch (err) {
    console.log(err);
  }
};

onBeforeMount(() => {
  fetchAnimal();
  fetchAllZoos();
});
</script>
<template>
  <div class="p-4">
    <h1 class="text-4xl">Zoo List</h1>
    <div class="grid grid-cols-12 my-8 gap-8">
      <div
        v-for="zoo in allZoos"
        :key="zoo?.id"
        :data-id="zoo?.id"
        class="col-span-4 shadow-lg flex flex-col p-4 border border-2 rounded-lg"
      >
        <h3 class="text-2xl">{{ zoo?.name }}</h3>
        <p class="text-lg">{{ zoo?.id }}</p>
        <button
          class="bg-deep-orange text-off-white w-max px-4 py-2 mx-auto"
          @click="handleTransfer"
        >
          Transfer Here
        </button>
      </div>
    </div>
  </div>
</template>
