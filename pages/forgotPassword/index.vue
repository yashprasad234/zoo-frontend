<script setup="ts">
import CustomInput from "~/components/CustomInput.vue";
import { ref } from "vue";

const email = ref("");

const fetchForgetPassword = async () => {
  try {
    const response = await fetch("http://localhost:8080/user/forgotpassword", {
      method: "GET",
      body: null,
      headers: {
        "Content-Type": "Application/JSON",
        "X-Email": email.value,
      },
    });
    const resData = await response.text();
    console.log(resData);
  } catch (error) {
    console.error(error);
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();
  await fetchForgetPassword();
};
</script>

<template>
  <div class="bg-sky-300 h-screen flex justify-center">
    <div
      class="flex flex-col justify-center items-center w-1/3 gap-12 h-max bg-white py-20 px-6 rounded-xl mt-8"
    >
      <div class="flex flex-col gap-4 w-4/5">
        <h1 class="text-3xl text-slate-800 self-start">Forgot Password</h1>
        <p class="text-lg self-start">
          Please enter your email address to search for your account.
        </p>
      </div>
      <form class="flex flex-col gap-12 w-3/4 -mb-4" @submit="handleSubmit">
        <CustomInput
          type="email"
          placeholder="Enter your email"
          :required="true"
          v-model="email"
        />
        <button
          type="submit"
          class="outline outline-2 px-4 py-2 text-xl text-white bg-sky-300"
        >
          Search
        </button>
      </form>
    </div>
  </div>
</template>
