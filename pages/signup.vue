<script setup="ts">
import { ref } from "vue";
import { useCustomFetch } from "~/composables/useCustomFetch";
import Form from "~/components/Form.vue";

const inputs = [
  {
    type: "formInputs",
    placeholder: "Enter your email",
    required: true,
  },
  {
    type: "password",
    placeholder: "Enter your password",
    required: true,
  },
  {
    type: "password",
    placeholder: "Confirm your password",
    required: true,
  },
];

const formInputs = ref({
  var0: "",
  var1: "",
  var2: "",
});
const toast = useToast();
const message = ref("");

async function fetchData() {
  if (formInputs.value.var1 != formInputs.value.var2) {
    message.value = "Password and Confirm Password Don't match";
  } else {
    try {
      const res = useCustomFetch("/signup", {
        method: "POST",
        body: JSON.stringify({
          username: formInputs.value.var0,
          password: formInputs.value.var1,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res);
      message.value = "User created successfully";
      navigateTo(`/login`);
    } catch (err) {
      console.log(err.response);
      message.value = err.value.data.message;
    }
  }
}

async function handler(e) {
  e.preventDefault();
  await fetchData();
  formInputs.value.var0 = "";
  formInputs.value.var1 = "";
  formInputs.value.var2 = "";
  toast.add({ title: message.value });
}
</script>

<template>
  <div class="bg-primary-earth h-screen flex justify-center font-serif">
    <div
      class="flex flex-col justify-center items-center w-1/3 gap-8 h-max bg-white w-max py-12 px-12 rounded-xl mt-8"
    >
      <Form
        :handler="handler"
        :inputs="inputs"
        formName="Signup"
        submitBtnText="Signup"
        v-model="formInputs"
        class="flex flex-col gap-8 w-full"
        :noBorder="true"
      />
      <p class="text-xl text-slate-800">
        Already have an account?
        <span
          @click="navigateTo('/login')"
          class="text-primary-forest hover:underline cursor-pointer"
          >Login</span
        >
      </p>
    </div>
  </div>
</template>
