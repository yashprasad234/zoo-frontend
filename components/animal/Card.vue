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
      <div class="font-sans">
        <div class="flex flex-col">
          <p class="text-lg md:text-md">Gender : {{ gender }}</p>
          <p class="text-lg md:text-md">Habitat : {{ habitat }}</p>
          <p class="text-lg md:text-md">
            Age : {{ calculateAge(dob as Date) }}
          </p>
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
