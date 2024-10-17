<script setup lang="ts">
import { useUserStore } from "~/store/user";
import type { ZooType } from "~/types/zoo";

type ZooPaginationRes = {
  zoos: ZooType[];
  pages: number;
};

const zooList = ref<ZooType[]>([]);
const page = ref<number>(0);
const size = 1;
const maxLimitReached = ref(false);

const fetchZoos = async () => {
  if (maxLimitReached.value) {
    return;
  } else {
    useCustomFetch("/zoo/list", {
      method: "GET",
      query: {
        page: page.value,
        size: size,
      },
    })
      .then((res) => {
        if (res != null) {
          page.value = page.value + 1;
          const data = res as ZooPaginationRes;
          zooList.value = [...zooList.value, ...data.zoos];
          if (page.value == data.pages) maxLimitReached.value = true;
        } else {
          maxLimitReached.value = true;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

onMounted(() => {
  fetchZoos();
});
</script>

<template v-if="!userState?.isLoading && userState?.user.role != ''">
  <div class="text-off-white font-serif">
    <div class="flex flex-col bg-primary-forest items-center gap-4 py-16">
      <h3 class="text-4xl text-center">
        Explore your favorite zoos and track your registered animals.
      </h3>
    </div>
  </div>
  <section class="my-8 flex flex-col gap-4 p-4">
    <h1 class="text-4xl font-serif text-center font-bold my-6">Zoo Explorer</h1>
    <div class="grid grid-cols-12 gap-6">
      <Card
        class="col-span-8 col-start-3"
        v-for="(zoo, index) in zooList"
        :key="index"
        :zoo-name="zoo.name"
        :location="zoo.location"
        :inaugration="zoo.inaugration"
        :area="zoo.area"
        :description="zoo.description"
      />
    </div>
    <button
      v-if="!maxLimitReached"
      class="bg-deep-orange w-28 text-off-white mx-auto px-4 py-2"
      @click="fetchZoos"
    >
      See More
    </button>
  </section>
</template>
