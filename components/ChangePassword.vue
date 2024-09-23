<script setup>
import { ref } from "vue";
import CustomInput from "./CustomInput.vue";

const route = useRoute();
const password = ref("");
const confirmPassword = ref("");

const updatePassword = async () => {
  try {
    if (password.value == confirmPassword.value) {
      const res = await fetch("http://localhost:8080/changePassword", {
        method: "PUT",
        body: JSON.stringify({
          password: password.value,
        }),
        headers: {
          "Content-Type": "Application/JSON",
          Authorization: `Bearer ${route.query.token}`,
        },
      });

      const resData = await res.text();
      console.log(resData);
      navigateTo("/login");
    } else {
      throw new Error("Password and confirm password don't match");
    }
  } catch (err) {
    console.error(err);
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();
  await updatePassword();
  password.value = "";
  confirmPassword.value = "";
};
</script>
<template>
  <div class="bg-sky-300 h-screen flex justify-center">
    <div
      class="flex flex-col justify-center items-center w-4/12 gap-12 h-max bg-white py-20 px-6 rounded-xl mt-8"
    >
      <div class="flex flex-col gap-4 w-4/5">
        <h1 class="text-3xl text-slate-800 self-start">Change Password</h1>
        <p class="text-lg self-start">
          Update your password and go to
          <span
            class="text-sky-300 hover:underline cursor-pointer"
            @click="navigateTo('/login')"
            >login</span
          >, to sign in with your new password.
        </p>
      </div>
      <form class="flex flex-col gap-12 w-3/4 -mb-4" @submit="handleSubmit">
        <CustomInput
          type="password"
          placeholder="Enter New Password"
          :required="true"
          v-model="password"
        />
        <CustomInput
          type="password"
          placeholder="Confirm New Password"
          :required="true"
          v-model="confirmPassword"
        />
        <button
          type="submit"
          class="outline outline-2 px-4 py-2 text-xl text-white bg-sky-300"
        >
          Change Password
        </button>
      </form>
    </div>
  </div>
</template>
