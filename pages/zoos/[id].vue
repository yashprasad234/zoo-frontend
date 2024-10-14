<script setup>
import AnimalPopup from "~/components/animal/AnimalPopup.vue";
import AnimalCard from "~/components/animal/AnimalCard.vue";
import ConfirmationPopup from "~/components/ConfirmationPopup.vue";
import { useCustomFetch } from "~/composables/useCustomFetch";
import { useUserStore } from "~/store/user";

const zoo = ref(null);
const animals = ref(null);
const isOpen = ref(false);
const confimationPopup = ref(false);
const selectedAnimalId = ref(null);
const userState = useUserStore();
const route = useRoute();
const count = useState("count", () => 0);

function formatDateFromTimestamp(timestamp) {
  const date = new Date(timestamp);
  const day = date.getDate();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  const ordinalSuffix = (day) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${day}${ordinalSuffix(day)} ${month}, ${year}`;
}

const handlePopup = () => {
  isOpen.value = !isOpen.value;
  count.value += 1;
};

const handleConfirmation = (id) => {
  selectedAnimalId.value = id;
  confimationPopup.value = true;
};

const handleDelete = async (id) => {
  try {
    const res = await useCustomFetch(`/animal/id/${id}`, {
      method: "DELETE",
    });
    count.value += 1;
  } catch (err) {
    console.log(err);
  }
};

function handler() {
  handleDelete(selectedAnimalId.value);
}

const fetchAnimals = async () => {
  try {
    const res = await useCustomFetch(`/animal/zoo/${route.params.id}`, {
      method: "GET",
    });
    animals.value = res;
  } catch (err) {
    console.log(err);
  }
};

const fetchZoo = async () => {
  try {
    const res = await useCustomFetch(`/zoo/id/${route.params.id}`, {
      method: "GET",
    });
    zoo.value = res;
  } catch (err) {
    console.log(err);
  }
};

watch(count, () => {
  fetchAnimals();
});

onBeforeMount(() => {
  fetchZoo();
  fetchAnimals();
});
</script>

<template>
  <div class="relative">
    <div
      v-if="confimationPopup"
      class="bg-white z-30 w-max shadow-2xl px-4 py-2 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      <ConfirmationPopup v-model="confimationPopup" :handler="handler" />
    </div>
    <div
      v-if="isOpen"
      class="bg-white z-30 w-max shadow-2xl px-4 py-2 absolute top-0 left-1/2 transform -translate-x-1/2"
    >
      <AnimalPopup v-if="isOpen" v-model="isOpen" v-model:count="count" />
    </div>
    <div :class="isOpen || confimationPopup ? `relative blur-sm` : `relative`">
      <div class="font-serif relative">
        <img
          src="/assets/zoo/delhi-zoo.jpg"
          alt="zoo-img"
          class="brightness-50 h-96 w-full object-cover"
        />
        <div
          class="flex flex-col gap-4 justify-center w-max text-white absolute top-1/2 left-20 z-50"
        >
          <h2 class="text-5xl font-black text-center">
            {{ zoo?.name }}
          </h2>
          <p class="text-lg font-mono">
            {{ zoo?.description }}
          </p>
          <div class="flex justify-between">
            <p class="text-xl font-semibold">
              Inaugrated on: {{ formatDateFromTimestamp(zoo?.inaugration) }}
            </p>
            <p class="text-xl font-semibold">Area: {{ zoo?.area }} Acres</p>
          </div>
        </div>
      </div>
      <div
        v-if="animals != null"
        class="flex flex-col gap-8 font-serif my-12 relative"
      >
        <h3 class="text-4xl font-bold text-center">Our animals</h3>
        <button
          v-if="
            userState?.user?.role == 'ADMIN' ||
            userState?.user?.role == 'SUPERADMIN'
          "
          class="bg-primary-forest text-off-white px-4 w-max py-2 absolute right-4 top-12"
          @click="handlePopup"
        >
          Add New Animal
        </button>
        <div class="grid grid-cols-12 grid-rows-12 gap-8 my-8 px-4">
          <AnimalCard
            v-for="(animal, ind) in animals"
            :key="ind"
            :animalName="animal.name"
            :gender="animal.gender"
            :img="animal.animalImg"
            :species="animal.species"
            :habitat="animal.habitat"
            :dob="animal.dob"
            :dataId="animal.id"
            :handleConfirmation="handleConfirmation"
            class="col-span-4 row-span-3"
          />
        </div>
      </div>
      <div v-else>
        <h1 class="text-4xl my-8 font-serif text-center">
          <span
            class="text-primary-forest underline cursor-pointer"
            @click="handlePopup"
            >Add Animals</span
          >
          to See the List Here
        </h1>
      </div>
    </div>
  </div>
</template>
