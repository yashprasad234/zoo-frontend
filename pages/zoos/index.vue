<script setup lang="ts">
import { useUserStore } from "~/store/user";
import type { ZooType } from "~/types/zoo";

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

// add zoo

const zooInputs = [
  {
    type: "text",
    placeholder: "Enter the name of the Zoo",
    required: true,
  },
  {
    type: "text",
    placeholder: "Enter the lacation of the Zoo",
    required: true,
  },
  {
    type: "text",
    placeholder: `Enter the are of the Zoo in Acres`,
    required: true,
  },
  {
    type: "text",
    placeholder: "Enter the description for the Zoo",
    required: true,
  },
];

const zooFormInputs = ref({
  var0: "",
  var1: "",
  var2: "",
  var3: "",
});

const addZoo = async (e: Event) => {
  e.preventDefault();
  await useCustomFetch("/zoo/create", {
    method: "POST",
    body: {
      name: zooFormInputs.value.var0,
      location: zooFormInputs.value.var1,
      area: +zooFormInputs.value.var2,
      description: zooFormInputs.value.var3,
      userId: userState?.user?.id,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("user-token")}`,
    },
  }).then(() => {
    fetchZoos();
    zooFormInputs.value = {
      var0: "",
      var1: "",
      var2: "",
      var3: "",
    };
    isZooPopupOpen.value = false;
  });
};

//
</script>
<template>
  <div v-if="loading">Loading...</div>
  <div v-else>
    <div
      v-if="isZooPopupOpen"
      class="bg-white z-30 w-max shadow-2xl px-4 py-2 fixed top-1/2 md:top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/3"
    >
      <Form
        type="popup"
        @close="
          () => {
            isZooPopupOpen = false;
          }
        "
        @submitForm="addZoo"
        :zooInputs="zooInputs"
        formName="Add Zoo"
        submitBtnText="Submit"
        v-model="zooFormInputs"
        gap="gap-4"
        :noBorder="true"
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
      <div class="flex flex-col justify-center gap-4 md:gap-0">
        <h1 class="text-5xl font-serif text-center tracking-widest">
          OUR ZOOS
        </h1>
        <button
          class="bg-primary-forest text-off-white px-4 w-max py-2 mr-4 self-center md:self-end"
          @click="handlePopup"
          v-if="userState?.user?.role == 'SUPERADMIN'"
        >
          Add New Zoo
        </button>
      </div>
      <div class="grid grid-cols-12 gap-8 my-8 px-4">
        <div
          v-for="(data, ind) in zooData"
          :key="ind"
          class="col-span-12 md:col-span-6 lg:col-span-4"
        >
          <Card
            :zooName="data.name"
            :data-id="data.id"
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
  </div>
</template>
