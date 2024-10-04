<script setup>
import Card from "~/components/Card.vue";
import AddZooPopup from "~/components/zoo/ZooPopup.vue";
import { useCustomFetch } from "~/composables/useCustomFetch";
import { useUserStore } from "~/store/user";

const userState = useUserStore();
const zooData = ref(null);
const isOpen = ref(false);

const handlePopup = () => {
  console.log(isOpen.value);
  isOpen.value = !isOpen.value;
  console.log(isOpen.value);
};

const fetchZoos = async () => {
  try {
    const res = await useCustomFetch("/zoo/list", {
      method: "GET",
    });
    console.log(res);
    zooData.value = res;
  } catch (err) {
    console.log(err);
  }
};

watch(isOpen, () => {
  fetchZoos();
});

onBeforeMount(() => {
  fetchZoos();
});
</script>
<template>
  {{ console.log(zooData) }}
  <AddZooPopup v-if="isOpen" v-model="isOpen" />
  <div :class="isOpen ? `relative blur-sm` : `relative`">
    <h1 class="text-5xl font-serif text-center tracking-widest">OUR ZOOS</h1>
    <button
      class="bg-primary-forest text-off-white px-4 w-max py-2 absolute right-32 top-8"
      @click="handlePopup"
      v-if="userState?.user?.role == 'SUPERADMIN'"
    >
      Add New Zoo
    </button>
    <div class="grid grid-cols-12 grid-rows-12 gap-8 my-8">
      <Card
        v-for="(data, ind) in zooData"
        :data-id="data.id"
        :key="ind"
        class="col-start-2 col-span-10 row-span-4"
        :zooName="data.name"
        :location="data.location"
        :inaugration="data.inaugration"
        :area="data.area"
        :description="data.description"
        :showButtons="true"
      />
    </div>
  </div>
</template>
