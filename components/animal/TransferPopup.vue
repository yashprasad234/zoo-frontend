<script setup lang="ts">
import type { PropType } from "vue";
import Zoo from "~/pages/add/zoo.vue";
import type { AnimalType } from "~/types/animal";
import type { ZooType } from "~/types/zoo";

const props = defineProps({
  modelValue: Boolean,
  animalInfo: Object as PropType<AnimalType>,
});

const allZoos = ref<ZooType[]>();
const isFetchingZoos = ref(false);
const selectedZooId = ref(0);

const emit = defineEmits(["transferAnimal", "closePopup"]);

const fetchAllZoos = async () => {
  try {
    const res = await useCustomFetch("/zoo/all", {
      method: "GET",
    });
    allZoos.value = (res as ZooType[]).filter((zoo) => {
      if (zoo.id != props.animalInfo?.zoo?.id) return zoo;
    });
  } catch (err) {
    console.log(err);
  }
};

onMounted(() => {
  fetchAllZoos();
});
</script>
<template>
  <div class="flex flex-col gap-4 font-serif p-4">
    <button
      class="outline outline-2 outline-slate-800 px-2 w-max text-sm self-end"
      @click="emit('closePopup')"
    >
      X
    </button>
    <div class="flex items-center gap-4">
      <img
        :src="animalInfo?.animalImg"
        alt="animal-image"
        class="w-20 h-20 rounded-full"
      />
      <div class="flex flex-col">
        <h3 class="text-2xl font-bold">{{ animalInfo?.name }}</h3>
        <h3 class="text-lg">{{ animalInfo?.species }}</h3>
      </div>
    </div>
    <div v-if="!isFetchingZoos" class="flex flex-col gap-2">
      <select
        name="zoo"
        id="zoo"
        class="w-full bg-inherit p-2 text-lg border border-black outline-none rounded-sm"
        @change="(e: Event) => {
          selectedZooId = +(e.target as HTMLOptionElement).value;
        }"
      >
        <option value="0" class="bg-inherit text-lg p-2">Select a zoo</option>
        <option
          v-for="zoo in allZoos"
          :value="zoo.id"
          class="bg-inherit text-lg p-2"
        >
          {{ zoo.name }}
        </option>
      </select>
    </div>
    <button
      type="submit"
      class="bg-primary-forest text-white py-2 self-center px-4 rounded-sm"
      :data-id="selectedZooId"
      @click="emit('transferAnimal', selectedZooId)"
    >
      Transfer
    </button>
  </div>
</template>
