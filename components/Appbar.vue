<script setup>
const router = useRouter();
import { userState } from "~/store/store";
async function fetchMe() {
  if (!userState.isLoading && userState.user != null) return;
  else {
    try {
      const res = await fetch("http://localhost:8080/user/me", {
        method: "GET",
        body: null,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("user-token")}`,
        },
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const dataString = await res.text();
      const user = JSON.parse(dataString);
      userState.setUserState(false, user);
    } catch (err) {
      console.error(err);
      router.push("/login");
    }
  }
}

function logout() {
  localStorage.clear();
  userState.setUserState(true, null);
  window.location.href = "/";
}

onMounted(() => {
  fetchMe();
});
</script>

<template>
  <div class="flex items-center justify-between px-6 py-4">
    <div class="text-3xl">ZOO</div>
    <div v-if="!userState.isLoading" class="flex gap-16 items-center">
      <ul class="flex justify-between gap-16">
        <li
          class="px-4 py-2 hover:bg-sky-300 hover:text-neutral-100 cursor-pointer"
        >
          <button class="" @click="router.push('/')">Home</button>
        </li>
        <li
          class="px-4 py-2 hover:bg-sky-300 hover:text-neutral-100 cursor-pointer"
        >
          <button class="" @click="router.push('/dashboard')">Dashboard</button>
        </li>
        <li
          class="px-4 py-2 hover:bg-sky-300 hover:text-neutral-100 cursor-pointer"
        >
          <button class="" @click="router.push('/about')">About</button>
        </li>
        <li
          class="px-4 py-2 hover:bg-sky-300 hover:text-neutral-100 cursor-pointer"
        >
          <button class="" @click="router.push('/users')">Users</button>
        </li>
      </ul>
      <button class="bg-sky-300 px-4 py-2 text-neutral-100" @click="logout">
        Logout
      </button>
    </div>
    <div v-if="userState.isLoading" class="flex gap-16 items-center">
      <button
        class="bg-sky-300 px-4 py-2 text-neutral-100"
        @click="router.push('/login')"
      >
        Login
      </button>
      <button
        class="bg-sky-300 px-4 py-2 text-neutral-100"
        @click="router.push('/signup')"
      >
        Signup
      </button>
    </div>
  </div>
</template>
