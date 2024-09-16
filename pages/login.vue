<script setup>
import { ref, onMounted } from "vue";

const router = useRouter();

const toast = useToast();
const email = ref("");
const password = ref("");
const data = ref("");

function setEmail(newEmail) {
  email.value = newEmail;
}

function setPassword(newPassword) {
  password.value = newPassword;
}

async function fetchData() {
  try {
    const response = await fetch("http://localhost:8080/user/login", {
      method: "POST",
      body: null,
      headers: {
        "Content-Type": "application/json",
        "X-Email": email.value,
        "X-Password": password.value,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    console.log(response);

    const result = await response.text();
    localStorage.setItem("user-token", JSON.parse(result).token);
    router.push("/dashboard");
    data.value = "Logged in!";
  } catch (error) {
    console.error("Error fetching data:", error);
    data.value = "Failed to connect to api";
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
  <div class="bg-sky-300 h-screen flex items-center justify-center">
    <div
      class="flex flex-col justify-center items-center w-3/10 gap-12 h-max bg-white w-max py-20 px-12 rounded-xl"
    >
      <h1 class="text-center text-3xl text-slate-800">Login</h1>
      <form action="" @submit="handleLogin" class="flex flex-col gap-12">
        <input
          type="email"
          placeholder="Enter your email"
          required="true"
          v-model="email"
          class="px-4 py-2 text-xl border-b-2 border-slate-500 focus:outline-none bg-white text-slate-800"
        />
        <input
          type="password"
          placeholder="Enter your password"
          required="true"
          v-model="password"
          class="px-4 py-2 text-xl border-b-2 border-slate-500 focus:outline-none bg-white text-slate-800"
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
        <a href="/signup" class="text-sky-500 hover:underline">Signup</a>
      </p>
    </div>
  </div>
</template>
