<script setup>
import AnimalPopup from "~/components/animal/AnimalPopup.vue";
import AnimalCard from "~/components/animal/AnimalCard.vue";
import { useCustomFetch } from "~/composables/useCustomFetch";
const zoo = ref(null);
const animals = ref(null);
const isOpen = ref(false);
const route = useRoute();
const count = useState("count", () => 0);

const handlePopup = () => {
  isOpen.value = !isOpen.value;
  count++;
};

const fetchAnimals = async () => {
  try {
    const res = await useCustomFetch(`/animal/zoo/${route.params.id}`, {
      method: "GET",
    });
    console.log(res);
    animals.value = res;
  } catch (err) {
    console.log(err);
  }
};

const fetchZoo = async () => {
  try {
    const res = await useCustomFetch(`/zoo/id/${route.params.id}`, {
      method: "GET",
    });
    console.log(res);
    zoo.value = res;
  } catch (err) {
    console.log(err);
  }
};

watch(isOpen, () => {
  fetchAnimals();
});

onBeforeMount(() => {
  fetchZoo();
  fetchAnimals();
});
</script>

<template>
  {{ console.log(isOpen) }}
  <AnimalPopup v-if="isOpen" v-model="isOpen" />
  <div :class="isOpen ? `relative blur-sm` : `relative`">
    <div class="flex w-full gap-4 font-serif">
      <img
        src="/assets/zoo/delhi-zoo.jpg"
        alt=""
        srcset=""
        class="object-cover w-3/5"
      />
      <div class="flex flex-col gap-4 justify-center">
        <h2 class="text-5xl font-bold text-center">
          {{ zoo?.name }}
        </h2>
        <p class="text-lg font-mono">
          {{ zoo?.description }}
        </p>
        <div class="flex justify-around">
          <p class="text-xl font-semibold">
            Inaugrated on: {{ zoo?.inaugration }}
          </p>
          <p class="text-xl font-semibold">Area: {{ zoo?.area }} Acres</p>
        </div>
      </div>
    </div>
    <div
      v-if="animals != null"
      class="flex flex-col gap-8 font-serif my-12 relative"
    >
      <h3 class="text-4xl font-bold text-center">Our animals</h3>
      <button
        class="bg-primary-forest text-off-white px-4 w-max py-2 absolute right-4 top-12"
        @click="handlePopup"
      >
        Add New Animal
      </button>
      <div class="grid grid-cols-12 gap-8 my-8 px-4">
        <AnimalCard
          v-for="(animal, ind) in animals"
          :key="ind"
          class="col-span-4"
          :animalName="animal.name"
          :gender="animal.gender"
          :species="animal.species"
          :habitat="animal.habitat"
          :dob="animal.dob"
          :dataId="animal.id"
        />
      </div>
    </div>
    <div v-else>
      <h1 class="text-4xl my-8 font-serif text-center">
        <span
          class="text-primary-forest underline cursor-pointer"
          @click="handlePopup"
          >Add Animals</span
        >
        to See the List Here
      </h1>
    </div>
  </div>
</template>
