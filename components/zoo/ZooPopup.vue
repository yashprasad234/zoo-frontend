<script setup>
import { useUserStore } from "~/store/user";
import Form from "../Form.vue";
const userState = useUserStore();
const props = defineProps({
  modelValue: Boolean,
});
const emit = defineEmits(["update:modelValue"]);
const onClick = () => {
  console.log(props.modelValue);
  emit("update:modelValue", !props.modelValue);
};
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
  <div class="p-2 bg-white sticky z-50 w-2/3 top-12 left-60 shadow-2xl">
    <button
      class="outline outline-2 outline-slate-800 px-4 py-2 absolute right-8"
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
      />
    </div>
  </div>
</template>
