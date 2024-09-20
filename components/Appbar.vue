<script setup="ts">
import { useUserStore } from "~/store/user.ts";
import { useMenuStore } from "~/store/menu";
import MenuButton from "./MenuButton.vue";

const userState = useUserStore();
const menuState = useMenuStore();

async function fetchMe() {
  if (!userState.isLoading && userState.user != null) {
    return;
  } else {
    try {
      userState.loading();
      const res = await fetch("http://localhost:8080/user/me", {
        method: "GET",
        body: null,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("user-token")}`,
        },
      });

      if (!res.ok) {
        console.log("res not ok");
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      console.log(data);
      userState.$patch({ isLoading: false, user: data });
    } catch (err) {
      console.log(err);
      userState.notFound();
    }
  }
}

function logout() {
  localStorage.removeItem("user-token");
  userState.notFound();
  navigateTo("/login");
}

onBeforeMount(() => {
  fetchMe();
});
</script>

<template>
  <div class="flex items-center justify-between px-6 py-4">
    <div class="text-3xl">ZOO</div>

    <div v-if="userState.isLoading"></div>
    <div>
      <div v-if="userState.user != null" class="flex gap-16 items-center">
        <div
          v-for="([name, href], index) in menuState.menu"
          class="flex justify-between gap-16"
        >
          <MenuButton :key="index" :name="name" :href="href" />
        </div>
        <button class="bg-sky-300 px-4 py-2 text-neutral-100" @click="logout">
          Logout
        </button>
      </div>
      <div
        v-if="!userState.isLoading && userState.user == null"
        class="flex gap-16 items-center"
      >
        <MenuButton
          name="Login"
          class="bg-sky-300 px-4 py-2 text-neutral-100"
          href="/login"
        />
        <MenuButton
          name="Signup"
          class="bg-sky-300 px-4 py-2 text-neutral-100"
          href="/signup"
        />
      </div>
    </div>
  </div>
</template>
