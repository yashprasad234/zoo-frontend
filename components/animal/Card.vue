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
  dob: String,
});

const emits = defineEmits(["openConfirmation", "openTransfer"]);

const calculateAge = (dateString: string) => {
  const birthDate = new Date(dateString as string);
  const today = new Date();

  // Calculate the difference in years
  let age = today.getFullYear() - birthDate.getFullYear();

  // Adjust if the birth date hasn't occurred yet this year
  const monthDifference = today.getMonth() - birthDate.getMonth();
  const dayDifference = today.getDate() - birthDate.getDate();

  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--;
  }

  // Return the age as a string
  return age === 1 ? `${age} year` : `${age} years`;
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
      <div class="font-sans">
        <div class="flex flex-col">
          <p class="text-lg md:text-md">Gender : {{ gender }}</p>
          <p class="text-lg md:text-md">Habitat : {{ habitat }}</p>
          <p class="text-lg md:text-md">Age : {{ calculateAge(`${dob}`) }}</p>
        </div>
      </div>
      <div class="flex text-xs gap-4 justify-around">
        <IconView :is-visible="true" :href="`/animal/${dataId}`" />
        <IconTransfer
          :is-visible="userState?.user?.role == 'SUPERADMIN'"
          @open-transfer="emits('openTransfer')"
        />
        <IconDelete
          :is-visible="userState?.user?.role == `SUPERADMIN`"
          @open-delete-popup="emits('openConfirmation')"
        />
      </div>
    </div>
  </div>
</template>
