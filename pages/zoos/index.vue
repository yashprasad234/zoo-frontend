<script setup lang="ts">
import { useUserStore } from "~/store/user";
import type { ZooType } from "~/types/zoo";
import Id from "./[id].vue";

const userState = useUserStore();
const zooData = ref<ZooType[]>([]);
const loading = ref(false);
const isZooPopupOpen = ref(false);
const isDeletePopupOpen = ref(false);
const selectedZooId = ref(0);

const handlePopup = () => {
  isZooPopupOpen.value = !isZooPopupOpen.value;
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

const deleteZoo = async () => {
  if (selectedZooId.value == 0) return;
  else {
    useCustomFetch(`/zoo/${selectedZooId.value}`, {
      method: "DELETE",
    }).then((res) => {
      console.log(res);
      fetchZoos();
    });
  }
};

onMounted(() => {
  fetchZoos();
});
</script>
<template>
  <div v-if="loading">Loading...</div>
  <div v-else>
    <div
      v-if="isZooPopupOpen"
      class="bg-white z-30 w-max shadow-2xl px-4 py-2 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      <ZooPopup
        @close="
          () => {
            isZooPopupOpen = false;
          }
        "
        @fetch="fetchZoos"
      />
    </div>
    <div
      v-if="isDeletePopupOpen"
      class="bg-white z-30 w-max shadow-2xl px-4 py-2 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      <ConfirmationPopup
        @close="
          () => {
            isDeletePopupOpen = false;
          }
        "
        @delete="deleteZoo"
      />
    </div>
    <div :class="isZooPopupOpen ? `relative blur-sm my-8` : `relative my-8`">
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
          @open-delete-popup="
            (id: number) => {
              isDeletePopupOpen = true;
              selectedZooId = id;
            }
          "
        />
      </div>
    </div>
  </div>
</template>
