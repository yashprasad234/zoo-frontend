<script setup lang="ts">
import { useUserStore } from "~/store/user";
import type { ZooType } from "~/types/zoo";

const userState = useUserStore();
const zooData = ref<ZooType[]>([]);
const loading = ref(false);
const isOpen = ref(false);

const handlePopup = () => {
  isOpen.value = !isOpen.value;
};

const fetchZoos = async () => {
  useCustomFetch("/zoo/all", {
    method: "GET",
  })
    .then((res) => {
      zooData.value = res as ZooType[];
      loading.value = false;
    })
    .catch((err) => {
      loading.value = false;
      console.log(err);
    });
};

watch(isOpen, () => {
  fetchZoos();
});

onMounted(() => {
  fetchZoos();
});
</script>
<template>
  <div v-if="loading">Loading...</div>
  <div v-else>
    <div
      v-if="isOpen"
      class="bg-white z-30 w-max shadow-2xl px-4 py-2 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      <ZooPopup
        @close="
          () => {
            isOpen = false;
          }
        "
      />
    </div>
    <div :class="isOpen ? `relative blur-sm my-8` : `relative my-8`">
      <h1 class="text-5xl font-serif text-center tracking-widest">OUR ZOOS</h1>
      <button
        :class="
          zooData.length != 0
            ? 'bg-primary-forest text-off-white px-4 w-max py-2 absolute right-32 top-8'
            : 'bg-primary-forest text-off-white px-4 w-max py-2 mx-auto'
        "
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
  </div>
</template>
