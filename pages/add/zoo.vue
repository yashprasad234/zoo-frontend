<script setup>
import { useUserStore } from "~/store/user";
const userState = useUserStore();
const inputs = [
  {
    type: "text",
    placeholder: "Enter the city in which the Zoo is located",
    required: true,
  },
  {
    type: "text",
    placeholder: "Enter the state in which the Zoo is located",
    required: true,
  },
  {
    type: "text",
    placeholder: "Enter the country in which the Zoo is located",
    required: true,
  },
  {
    type: "number",
    placeholder: "Enter the capacity of the zoo",
    required: true,
  },
  {
    type: "number",
    placeholder: "Enter the number of animals currently living in the zoo",
    required: true,
  },
  {
    type: "number",
    placeholder: "Enter the number of species in the zoo",
    required: true,
  },
  {
    type: "number",
    placeholder: "Enter the number of endangered species in the zoo",
    required: false,
  },
  {
    type: "date",
    placeholder: "When was the zoo inaugrated",
    required: true,
  },
];

const formInputs = ref({
  var0: "",
  var1: "",
  var2: "",
  var3: null,
  var4: null,
  var5: null,
  var6: null,
  var7: null,
});

// String city, String state, String country, int capacity, int numberOfAnimals, int species,
// 				int endageredSpecies, Date inaugration)

const handler = (e) => {
  e.preventDefault();
  // console.log("TimeStamp : " + Date.parse(formInputs.value.var7));
  console.log("Date : " + formInputs.value.var7);
  useCustomFetch("/super/zoo/create", {
    method: "POST",
    body: JSON.stringify({
      city: formInputs.value.var0,
      state: formInputs.value.var1,
      country: formInputs.value.var2,
      capacity: formInputs.value.var3,
      species: formInputs.value.var4,
      endageredSpecies: formInputs.value.var5,
      inaugration: Date.parse(formInputs.value.var6),
      userId: userState.user.id,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("user-token")}`,
    },
  });
};
</script>

<template>
  <div class="p-4 flex justify-center bg-sky-300">
    <Form
      :handler="handler"
      :inputs="inputs"
      formName="Add Zoo"
      submitBtnText="Whatup"
      v-model="formInputs"
    />
  </div>
</template>
