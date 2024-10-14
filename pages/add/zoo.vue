<script setup>
import { useUserStore } from "~/store/user";
const userState = useUserStore();

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
    placeholder: `Enter the are of the Zoo in Km sq.`,
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
  console.log("Date : " + formInputs.value.var7);
  await useCustomFetch("/super/zoo/create", {
    method: "POST",
    body: JSON.stringify({
      name: formInputs.value.var0,
      location: formInputs.value.var1,
      area: formInputs.value.var2,
      description: formInputs.value.var3,
      userId: userState?.user?.id,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("user-token")}`,
    },
  });
};
</script>

<template>
  <div class="p-4 flex justify-center bg-primary-earth">
    <Form
      :handler="handler"
      :inputs="inputs"
      formName="Add Zoo"
      submitBtnText="Whatup"
      v-model="formInputs"
    />
  </div>
</template>
