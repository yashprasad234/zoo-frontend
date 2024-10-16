<script setup lang="ts">
import { useUserStore } from "~/store/user";
import type { AnimalType } from "~/types/animal";
import type { ZooType } from "~/types/zoo";
import { formatDateFromTimestamp } from "~/utils/util";

const zoo = ref<ZooType>();
const animals = ref<AnimalType[]>();
const isOpen = ref(false);
const confimationPopup = ref(false);
const transferPopup = ref(false);
const selectedAnimal = ref<AnimalType>();
const loadingZooData = ref(false);
const loadingAnimalData = ref(false);
const userState = useUserStore();
const route = useRoute();

const handleConfirmation = (animal: AnimalType) => {
  selectedAnimal.value = animal;
  confimationPopup.value = true;
};

const handleDelete = async () => {
  try {
    const res = await useCustomFetch(`/animal/id/${selectedAnimal.value?.id}`, {
      method: "DELETE",
    });
  } catch (err) {
    console.log(err);
  }
};

const handleTransfer = async (zooId: number) => {
  if (zooId == 0) return;
  else {
    try {
      const res = await useCustomFetch(
        `/animal/id/${selectedAnimal.value?.id}?zooId=${zooId}`,
        {
          method: "PUT",
        }
      );
      transferPopup.value = false;
      fetchAnimals();
    } catch (err) {
      console.log(err);
    }
  }
};

const fetchAnimals = async () => {
  try {
    const res = await useCustomFetch(`/animal/zoo/${route.params.id}`, {
      method: "GET",
    });
    animals.value = res as AnimalType[];
  } catch (err) {
    console.log(err);
  }
};

const fetchZoo = async () => {
  try {
    const res = await useCustomFetch(`/zoo/id/${route.params.id}`, {
      method: "GET",
    });
    zoo.value = res as ZooType;
  } catch (err) {
    console.log(err);
  }
};

onMounted(() => {
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
      <ConfirmationPopup
        v-model="confimationPopup"
        @delete-animal="handleDelete"
      />
    </div>
    <div
      v-if="transferPopup"
      class="bg-white z-30 w-1/4 shadow-2xl px-4 py-2 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      <AnimalTransferPopup
        v-model="transferPopup"
        :animal-info="selectedAnimal"
        @transfer-animal="handleTransfer"
        @close-popup="
          () => {
            transferPopup = false;
          }
        "
      />
    </div>
    <div
      v-if="isOpen"
      class="bg-white z-30 w-max shadow-2xl px-4 py-2 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      <AnimalPopup
        v-if="isOpen"
        v-model="isOpen"
        @updateIsOpen="
          () => {
            isOpen = false;
          }
        "
        @updateProps="
          () => {
            isOpen = !isOpen;
          }
        "
      />
    </div>
    <div
      :class="
        isOpen || confimationPopup || transferPopup
          ? `relative blur-sm `
          : `relative `
      "
    >
      <div v-if="loadingZooData">Loading...</div>
      <div v-if="!loadingZooData" class="font-serif relative">
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
              Inaugrated on:
              {{ formatDateFromTimestamp(zoo?.inaugration as number) }}
            </p>
            <p class="text-xl font-semibold">Area: {{ zoo?.area }} Acres</p>
          </div>
        </div>
      </div>
      <div v-if="loadingAnimalData">Loading...</div>
      <div v-if="!loadingAnimalData">
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
            @click="
              () => {
                isOpen = !isOpen;
              }
            "
          >
            Add New Animal
          </button>
          <div class="grid grid-cols-12 grid-rows-12 gap-8 my-8 px-4">
            <AnimalCard
              v-for="(animal, ind) in animals"
              :key="ind"
              :name="animal.name"
              :gender="animal.gender"
              :img="animal.animalImg"
              :species="animal.species"
              :habitat="animal.habitat"
              :dob="animal.dob"
              :dataId="animal.id"
              @openConfirmation="
                () => {
                  handleConfirmation(animal);
                }
              "
              @openTransfer="
                () => {
                  selectedAnimal = animal;
                  transferPopup = true;
                }
              "
              class="col-span-4 row-span-3"
            />
          </div>
        </div>
        <div v-if="animals == null">
          <h1 class="text-4xl my-8 font-serif text-center">
            <span
              class="text-primary-forest underline cursor-pointer"
              @click="
                () => {
                  isOpen != isOpen;
                }
              "
              >Add Animals</span
            >
            to See the List Here
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>
