<script setup>
import { useUserStore } from "~/store/user";
import Form from "../Form.vue";
const userState = useUserStore();
const props = defineProps({
  modelValue: Boolean,
});
const emit = defineEmits(["update:modelValue"]);
const onClick = () => {
  emit("update:modelValue", !props.modelValue);
};
window.addEventListener("keydown", (e) => {
  if (props.modelValue && e.key === "Escape") {
    onClick();
  }
});
const inputs = [
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

const formInputs = ref({
  var0: "",
  var1: "",
  var2: "",
  var3: "",
});

const handler = async (e) => {
  e.preventDefault();
  await useCustomFetch("/zoo/create", {
    method: "POST",
    body: JSON.stringify({
      name: formInputs.value.var0,
      location: formInputs.value.var1,
      area: +formInputs.value.var2,
      description: formInputs.value.var3,
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
  <div class="flex flex-col gap-2">
    <button
      class="outline outline-2 outline-slate-800 px-2 w-max self-end text-sm"
      @click="onClick"
    >
      X
    </button>
    <div class="flex justify-center">
      <Form
        :handler="handler"
        :inputs="inputs"
        formName="Add Zoo"
        submitBtnText="Submit"
        v-model="formInputs"
        class="flex flex-col gap-8 w-full"
      />
    </div>
  </div>
</template>
