<script setup lang="ts">
import { useUserStore } from "~/store/user";
const userState = useUserStore();

const props = defineProps({
  zooName: String,
  location: String,
  inaugration: Number,
  area: Number,
  description: String,
  dataId: Number,
  showButtons: Boolean,
});

const emit = defineEmits(["openDeletePopup"]);
</script>
<template>
  <div
    class="bg-white flex flex-col gap-2 shadow-lg border-2 border-charcoal-black-500 text-charcoal-black font-serif"
  >
    <img src="/assets/zoo/delhi-zoo.jpg" alt="zoo" class="object-cover h-max" />
    <div class="flex flex-col gap-4 p-4">
      <div class="flex flex-col">
        <h3 class="md:text-lg lg:text-xl xl:text-2xl font-serif font-black">
          {{ zooName || "Zoo Name" }}
        </h3>
        <p class="text-md font-serif overflow-y-scroll h-16">
          {{
            description +
              "" +
              description +
              description +
              description +
              description +
              description +
              description +
              description +
              description +
              description +
              description ||
            `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
        animi aut officia porro nesciunt obcaecati qui eaque exercitationem
        pariatur et voluptate, magnam quasi vero veniam iste ipsa, est,
        similique doloribus at aliquam praesentium dicta! Eius voluptatem autem
        quasi natus laborum.`
          }}
        </p>
        <div class="flex text-xs gap-4 justify-around mt-2" v-if="showButtons">
          <IconView
            :is-visible="userState?.user?.role != ''"
            :href="`/zoos/${dataId}`"
          />
          <IconDelete
            :is-visible="userState?.user?.role == `SUPERADMIN`"
            @open-delete-popup="emit('openDeletePopup', dataId)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
