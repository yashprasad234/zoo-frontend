<script setup>
import { useUserStore } from "~/store/user";
import Form from "../Form.vue";
const userState = useUserStore();
const props = defineProps({
  modelValue: Boolean,
  count: Number,
});
const emit = defineEmits(["update:modelValue", "update:count"]);
const onClick = () => {
  console.log(props.count);
  emit("update:modelValue", !props.modelValue);
  emit("update:count", props.count + 1);
  console.log(props.count);
};
window.addEventListener("keydown", (e) => {
  if (props.modelValue && e.key === "Escape") {
    onClick();
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

const handler = async (e) => {
  e.preventDefault();
  await useCustomFetch("/animal/create", {
    method: "POST",
    body: JSON.stringify({
      zooId: route.params.id,
      name: formInputs.value.var0,
      gender: formInputs.value.var1,
      species: formInputs.value.var2,
      habitat: formInputs.value.var3,
      animalImg: formInputs.value.var4,
      userId: userState?.user?.id,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("user-token")}`,
    },
  });
  formInputs.value = {
    var0: "",
    var1: "",
    var2: "",
    var3: "",
    var4: "",
  };
  onClick();
};
</script>

<template>
  <div class="flex flex-col gap-2">
    <button
      class="outline outline-2 outline-slate-800 px-2 w-max self-end text-sm"
      @click="onClick"
    >
      X
    </button>
    <Form
      :handler="handler"
      :inputs="inputs"
      formName="Add Animal"
      submitBtnText="Submit"
      v-model="formInputs"
      class="flex flex-col gap-8 w-full"
    />
  </div>
</template>
