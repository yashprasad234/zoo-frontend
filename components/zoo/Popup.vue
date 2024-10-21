<script setup lang="ts">
import { useUserStore } from "~/store/user";
const userState = useUserStore();
const emit = defineEmits(["close", "fetch"]);
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    emit("close");
  }
});
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

const zooFormzooInputs = ref({
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
      name: zooFormzooInputs.value.var0,
      location: zooFormzooInputs.value.var1,
      area: +zooFormzooInputs.value.var2,
      description: zooFormzooInputs.value.var3,
      userId: userState?.user?.id,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("user-token")}`,
    },
  }).then(() => emit("fetch"));
  zooFormzooInputs.value = {
    var0: "",
    var1: "",
    var2: "",
    var3: "",
  };
  emit("close");
};
</script>

<template>
  <div class="flex flex-col gap-2">
    <button
      class="outline outline-2 outline-slate-800 px-2 w-max self-end text-sm"
      @click="emit('close')"
    >
      X
    </button>
    <div class="flex justify-center">
      <Form
        @submitForm="addZoo"
        :zooInputs="zooInputs"
        formName="Add Zoo"
        submitBtnText="Submit"
        v-model="zooFormzooInputs"
        gap="gap-4"
        :noBorder="true"
      />
    </div>
  </div>
</template>
