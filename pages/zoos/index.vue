<script setup>
import Card from "~/components/Card.vue";
import AddZooPopup from "~/components/zoo/ZooPopup.vue";
import { useCustomFetch } from "~/composables/useCustomFetch";
import { useUserStore } from "~/store/user";

const userState = useUserStore();
const zooData = ref(null);
const isOpen = ref(false);

const handlePopup = () => {
  isOpen.value = !isOpen.value;
};

const fetchZoos = async () => {
  try {
    const res = await useCustomFetch("/zoo/list", {
      method: "GET",
    });
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
  <div
    v-if="isOpen"
    class="bg-white z-30 w-max shadow-2xl px-4 py-2 fixed top-20 left-1/2 transform -translate-x-1/2"
  >
    <AddZooPopup v-if="isOpen" v-model="isOpen" />
  </div>
  <div :class="isOpen ? `relative blur-sm` : `relative`">
    <h1 class="text-5xl font-serif text-center tracking-widest">OUR ZOOS</h1>
    <button
      class="bg-primary-forest text-off-white px-4 w-max py-2 absolute right-32 top-8"
      @click="handlePopup"
      v-if="userState?.user?.role == 'SUPERADMIN'"
    >
      Add New Zoo
    </button>
    <div class="grid grid-cols-12 gap-8 my-8 px-4">
      <Card
        v-for="(data, ind) in zooData"
        :data-id="data.id"
        :key="ind"
        class="col-span-4"
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
