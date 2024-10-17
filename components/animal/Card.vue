<script setup lang="ts">
import { useUserStore } from "~/store/user";
const userState = useUserStore();

const props = defineProps({
  name: String,
  gender: String,
  img: String,
  species: String,
  habitat: String,
  dataId: Number,
  dob: Date,
});

const emits = defineEmits(["openConfirmation", "openTransfer"]);

const calculateAge = (dob: Date) => {
  const dateOfBirth = new Date(dob);
  const now = new Date();
  let years = now.getFullYear() - dateOfBirth.getFullYear();
  let months = now.getMonth() - dateOfBirth.getMonth();
  if (months < 0) {
    years--;
    months += 12;
  }
  let yearStr = years > 1 ? `${years} years` : `${years} year`;
  let monthStr = months > 1 ? `${months} months` : `${months} month`;
  return `${yearStr} ${months > 0 ? monthStr : ""}`.trim();
};
</script>

<template>
  <div
    class="flex flex-col gap-2 shadow-lg border-2 border-charcoal-black-500 text-charcoal-black font-serif"
  >
    <img
      :src="img != null ? `${img}` : '/_nuxt/assets/animals/AsiaticLion.webp'"
      alt="zoo"
      class="object-cover h-72"
    />
    <div class="flex flex-col gap-4 p-4">
      <p class="text-xl text-black font-black w-max">
        {{ name }} the {{ species }}
      </p>
      <div class="flex flex-col gap-4 font-sans">
        <div class="flex justify-between">
          <p class="text-lg md:text-md">Gender : {{ gender }}</p>
          <p class="text-lg md:text-md">Species : {{ species }}</p>
        </div>
        <div class="flex justify-between">
          <p class="text-lg md:text-md">Habitat : {{ habitat }}</p>
          <p class="text-lg md:text-md">
            Age : {{ calculateAge(dob as Date) }}
          </p>
        </div>
      </div>
      <div class="flex text-xs gap-4 justify-around" :data-id="dataId">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          v-if="userState?.user?.role == 'SUPERADMIN'"
          @click="emits('openTransfer')"
          class="size-10 rounded-full px-2 hover:scale-125 cursor-pointer border-2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
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
          @click="emits('openConfirmation')"
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
</template>
