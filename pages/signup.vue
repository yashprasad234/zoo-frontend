<script setup>
import { ref, onMounted } from "vue";
import CustomInput from "~/components/CustomInput.vue";
const toast = useToast();
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const data = ref("");
const router = useRouter();

async function fetchData() {
  try {
    if (password.value == confirmPassword.value) {
      const response = await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
        body: JSON.stringify({
          username: email.value,
          password: password.value,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.text();
      router.push("/login");
      console.log(result);
      data.value = result;
    } else data.value = "Password and Confirm Password Don't match";
  } catch (error) {
    console.error("Error fetching data:", error);
    data.value = "Failed to connect to api";
  }
}

async function handleSignup(e) {
  e.preventDefault();
  await fetchData();
  email.value = "";
  password.value = "";
  confirmPassword.value = "";
  toast.add({ title: data.value });
}
</script>

<template>
  <div class="bg-sky-300 h-screen flex items-center justify-center">
    <div
      class="flex flex-col justify-center items-center w-3/10 gap-8 h-max bg-white w-max py-12 px-12 rounded-xl"
    >
      <h1 class="text-center text-3xl text-slate-800">Signup</h1>
      <form action="" @submit="handleSignup" class="flex flex-col gap-6">
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
        <CustomInput
          type="password"
          placeholder="Confirm password"
          :required="true"
          v-model="confirmPassword"
        />
        <button
          type="submit"
          class="outline outline-2 px-4 py-2 text-xl text-white bg-sky-300"
        >
          Signup
        </button>
      </form>
      <p class="text-xl text-slate-800">
        Already have an account?
        <a href="/login" class="text-sky-500 hover:underline">Login</a>
      </p>
    </div>
  </div>
</template>
