<script setup>
import { useUserStore } from "~/store/user";
import Form from "../Form.vue";
const userState = useUserStore();
const props = defineProps({
  modelValue: Boolean,
});
const emit = defineEmits(["update:modelValue"]);
const onClick = (e) => {
  console.log(props.modelValue);
  emit("update:modelValue", !props.modelValue);
};
const route = useRoute();
console.log(route.params.id);
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
];

const formInputs = ref({
  var0: "",
  var1: "",
  var2: "",
  var3: "",
});

const handler = async (e) => {
  e.preventDefault();
  console.log("Date : " + formInputs.value.var7);
  await useCustomFetch("/animal/create", {
    method: "POST",
    body: JSON.stringify({
      zooId: route.params.id,
      name: formInputs.value.var0,
      gender: formInputs.value.var1,
      species: formInputs.value.var2,
      habitat: formInputs.value.var3,
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
  };
  onClick();
};
</script>

<template>
  <div class="flex flex-col">
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
    />
  </div>
</template>
