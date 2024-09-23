<script setup="ts">
import { ref } from "vue";
import CustomInput from "~/components/CustomInput.vue";
import { useUserStore } from "~/store/user.ts";
import { userMenu, adminMenu, superAdminMenu } from "~/data/menu";
import { useMenuStore } from "~/store/menu";

const toast = useToast();
const email = ref("");
const password = ref("");
const data = ref("");
const menuState = useMenuStore();

const userState = useUserStore();

async function fetchData() {
  try {
    userState.loading();
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      body: JSON.stringify({
        username: email.value,
        password: password.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    console.log(result);
    if (!response.ok) {
      throw new Error(result.message);
    }

    localStorage.setItem("user-token", result.token);
    userState.$patch({ isLoading: false, user: result.userDetails });

    if (userState.user.role == "USER") {
      menuState.$patch({ menu: userMenu });
    }
    if (userState.user.role == "ADMIN") {
      menuState.$patch({ menu: adminMenu });
    }
    if (userState.user.role == "SUPERADMIN") {
      menuState.$patch({ menu: superAdminMenu });
    }

    navigateTo(`/${userState.user.role.toLowerCase()}/dashboard`);
    data.value = "Logged in!";
  } catch (error) {
    console.error(error);
    userState.notFound();
    data.value = error;
  }
}

async function handleLogin(e) {
  e.preventDefault();
  await fetchData();
  email.value = "";
  password.value = "";
  toast.add({ title: data.value });
}
</script>

<template>
  <div class="bg-sky-300 h-screen flex justify-center">
    <div
      class="flex flex-col justify-center items-center w-1/3 gap-12 h-max bg-white w-max py-20 px-12 rounded-xl mt-4"
    >
      <h1 class="text-3xl text-slate-800">Login</h1>

      <form action="" @submit="handleLogin" class="flex flex-col gap-12 -mb-4">
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
          class="outline outline-2 px-4 py-2 text-xl text-white bg-sky-300"
        >
          Login
        </button>
      </form>
      <p class="text-xl text-slate-800">
        Don't have an account?
        <span
          @click="navigateTo('/signup')"
          class="text-sky-500 hover:underline cursor-pointer"
          >Signup</span
        >
      </p>
      <button
        type="submit"
        class="outline outline-2 px-4 py-2 text-xl text-white bg-sky-300 -mt-6 -mb-12"
        @click="navigateTo('/forgotPassword')"
      >
        Forgot Password
      </button>
    </div>
  </div>
</template>
