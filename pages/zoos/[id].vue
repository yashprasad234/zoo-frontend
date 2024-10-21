<script setup lang="ts">
import { useUserStore } from "~/store/user";
import type { AnimalType } from "~/types/animal";
import type { ZooType } from "~/types/zoo";
import { formatDateFromTimestamp } from "~/utils/util";

const zoo = ref<ZooType>();
const animals = ref<AnimalType[]>([]);
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
  useCustomFetch(`/animal/id/${selectedAnimal.value?.id}`, {
    method: "DELETE",
  })
    .then((res) => {
      console.log(res);
      fetchAnimals();
    })
    .catch((err) => {
      console.log(err);
    });
};

const handleTransfer = async (zooId: number) => {
  if (zooId == 0) return;
  else {
    useCustomFetch(`/animal/id/${selectedAnimal.value?.id}?zooId=${zooId}`, {
      method: "PUT",
    })
      .then((res) => {
        console.log(res);
        transferPopup.value = false;
        fetchAnimals();
      })
      .catch((err) => {
        console.log(err.response._data.message);
      });
  }
};

const fetchAnimals = async () => {
  useCustomFetch(`/animal/zoo/${route.params.id}`, {
    method: "GET",
  })
    .then((res) => {
      animals.value = res as AnimalType[];
    })
    .catch((err) => {
      animals.value = [];
      console.log(err);
    });
};

const fetchZoo = async () => {
  useCustomFetch(`/zoo/id/${route.params.id}`, {
    method: "GET",
  })
    .then((res) => {
      zoo.value = res as ZooType;
    })
    .catch((err) => {
      console.log(err);
    });
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
        @delete="handleDelete"
        @close="() => (confimationPopup = false)"
      />
    </div>
    <div
      v-if="transferPopup"
      class="bg-white z-30 w-3/4 md:w-1/2 lg:w-1/3 shadow-2xl px-4 py-2 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
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
      class="bg-white z-50 w-max shadow-xl px-4 py-2 fixed top-1/2 md:top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:-translate-y-2/3 border border-2"
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
        @fetch="fetchAnimals"
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
        <!-- <div class="flex-col md:flex-none"> -->
        <img
          src="/assets/zoo/delhi-zoo.jpg"
          alt="zoo-img"
          class="brightness-50 h-96 w-full object-cover"
        />
        <div
          class="flex flex-col gap-4 justify-center md:text-white relative md:absolute md:top-1/2 md:left-20 z-50"
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
        <!-- </div> -->
      </div>
      <div v-if="loadingAnimalData">Loading...</div>
      <div v-if="!loadingAnimalData">
        <div
          v-if="animals.length != 0"
          class="flex flex-col gap-8 font-serif my-12 relative"
        >
          <div class="flex flex-col justify-center gap-4 md:gap-0">
            <h3 class="text-4xl font-bold text-center">Our animals</h3>
            <button
              v-if="
                userState?.user?.role == 'ADMIN' ||
                userState?.user?.role == 'SUPERADMIN'
              "
              class="bg-primary-forest text-off-white px-4 w-max py-2 mr-4 self-center md:self-end"
              @click="
                () => {
                  isOpen = true;
                }
              "
            >
              Add New Animal
            </button>
          </div>
          <div class="grid grid-cols-12 grid-rows-12 gap-8 my-8 px-4">
            <div
              v-for="(animal, ind) in animals"
              :key="ind"
              class="col-span-12 md:col-span-6 lg:col-span-4 row-span-3 md"
            >
              <AnimalCard
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
              />
            </div>
          </div>
        </div>
        <div v-if="animals.length == 0">
          <h1 class="text-4xl my-8 font-serif text-center">
            <span
              class="text-primary-forest underline cursor-pointer"
              @click="
                () => {
                  isOpen = true;
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
