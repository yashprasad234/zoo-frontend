<script setup="ts">
import { ref } from "vue";
import CustomInput from "~/components/CustomInput.vue";
import { useUserStore } from "~/store/user.ts";
import { userMenu } from "~/data/menu";
import { useMenuStore } from "~/store/menu";
import { useCustomFetch } from "~/composables/useCustomFetch";

const toast = useToast();
const email = ref("");
const password = ref("");
const message = ref("");
const menuState = useMenuStore();

const userState = useUserStore();

async function fetchData() {
  try {
    const res = await useCustomFetch("/login", {
      method: "POST",
      body: JSON.stringify({
        username: email.value,
        password: password.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    localStorage.setItem("user-token", res.token);
    userState.$patch({ isLoading: false, user: res.userDetails });
    let menu = userMenu;
    menuState.$patch({ menu });
    message.value = "Logged in!";
    navigateTo(`/dashboard`);
  } catch (err) {
    console.log(err.response._data.message);
    message.value = err.response._data.message;
  }
}

async function handleLogin(e) {
  e.preventDefault();
  await fetchData();
  email.value = "";
  password.value = "";
  toast.add({ title: message.value });
}
</script>

<template>
  <div
    class="bg-primary-earth h-screen flex justify-center font-serif text-off-white"
    v-if="userState?.user == null"
  >
    <div
      class="flex flex-col justify-center items-center w-1/3 gap-12 h-max bg-white w-max py-20 px-12 rounded-xl mt-4"
    >
      <h1 class="text-3xl text-slate-800">Login</h1>

      <form @submit="handleLogin" class="flex flex-col gap-12 -mb-4">
        <CustomInput
          type="email"
          placeholder="Enter your email"
          :required="true"
          v-model="email"
        />
        <CustomInput
          type="password"
          placeholder="Enter your password"
          :required="true"
          v-model="password"
        />
        <button
          type="submit"
          class="outline outline-2 px-4 py-2 text-xl text-white bg-primary-forest"
        >
          Login
        </button>
      </form>
      <p class="text-xl text-slate-800">
        Don't have an account?
        <span
          @click="navigateTo('/signup')"
          class="text-primary-forest hover:underline cursor-pointer"
          >Signup</span
        >
      </p>
      <button
        type="submit"
        class="outline outline-2 px-4 py-2 text-xl text-white bg-soft-beige -mt-6 -mb-12"
        @click="navigateTo('/forgotPassword')"
      >
        Forgot Password
      </button>
    </div>
  </div>
</template>
