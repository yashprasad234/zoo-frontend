<script setup>
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
</script>
<template>
  <div
    class="flex flex-col gap-2 shadow-lg border-2 border-charcoal-black-500 text-charcoal-black font-serif"
  >
    <img src="/assets/zoo/delhi-zoo.jpg" alt="zoo" class="object-cover h-max" />
    <div class="flex flex-col gap-4 p-2">
      <div class="flex flex-col">
        <h3 class="md:text-lg lg:text-xl xl:text-2xl font-serif font-black">
          {{ props.zooName || "Zoo Name" }}
        </h3>
        <p class="text-md font-serif">
          {{
            props.description ||
            `Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
        animi aut officia porro nesciunt obcaecati qui eaque exercitationem
        pariatur et voluptate, magnam quasi vero veniam iste ipsa, est,
        similique doloribus at aliquam praesentium dicta! Eius voluptatem autem
        quasi natus laborum.`
          }}
        </p>
        <div
          class="flex text-xs gap-4 justify-around mt-2"
          :data-id="dataId"
          v-if="showButtons"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            v-if="userState?.user?.role"
            @click="
              (e) => {
                const el = e.currentTarget;
                console.log(el.parentElement.dataset.id);
                navigateTo(`/zoos/${el.parentElement.dataset.id}`);
              }
            "
            class="size-10 rounded-full px-2 hover:scale-125 cursor-pointer border-2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
          <svg
            v-if="userState?.user?.role == `SUPERADMIN`"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-10 rounded-full px-2 hover:scale-125 cursor-pointer border-2"
            @click="
              (e) => {
                const el = e.currentTarget;
                console.log(el.parentElement.dataset.id);
                navigateTo(`/zoos/${el.parentElement.dataset.id}`);
              }
            "
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>
