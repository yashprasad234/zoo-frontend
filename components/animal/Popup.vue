<script setup lang="ts">
import { useUserStore } from "~/store/user";
const userState = useUserStore();
const props = defineProps({
  modelValue: Boolean,
  count: Number,
});
const emit = defineEmits(["updateIsOpen", "updateProps", "fetch"]);

window.addEventListener("keydown", (e) => {
  if (props.modelValue && e.key === "Escape") {
    emit("updateIsOpen");
  }
});
const route = useRoute();
const inputs = [
  {
    type: "text",
    placeholder: "Enter the name of the Animal",
    required: true,
  },
  {
    type: "text",
    placeholder: "Enter the gender of the Animal",
    required: true,
  },
  {
    type: "text",
    placeholder: `Enter the species of the Animal`,
    required: true,
  },
  {
    type: "text",
    placeholder: "Enter the type of habitat in which this animal usually live",
    required: true,
  },
  {
    type: "text",
    placeholder: `Enter animal's photo`,
    required: true,
  },
];

const formInputs = ref({
  var0: "",
  var1: "",
  var2: "",
  var3: "",
  var4: "",
});

const handler = async (e: Event) => {
  e.preventDefault();
  await useCustomFetch("/animal/create", {
    method: "POST",
    body: {
      zooId: route.params.id,
      name: formInputs.value.var0,
      gender: formInputs.value.var1,
      species: formInputs.value.var2,
      habitat: formInputs.value.var3,
      animalImg: formInputs.value.var4,
      userId: userState?.user?.id,
    },
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(() => {
      formInputs.value = {
        var0: "",
        var1: "",
        var2: "",
        var3: "",
        var4: "",
      };
      emit("fetch");
    })
    .catch(() => {
      emit("updateIsOpen");
    });

  emit("updateProps");
};
</script>

<template>
  <div class="flex flex-col gap-2">
    <button
      class="outline outline-2 outline-slate-800 px-2 w-max self-end text-sm"
      @click="emit('updateProps')"
    >
      X
    </button>
    <Form
      @submitForm="handler"
      :inputs="inputs"
      formName="Add Animal"
      submitBtnText="Submit"
      v-model="formInputs"
      gap="gap-4"
      :no-border="true"
    />
  </div>
</template>
