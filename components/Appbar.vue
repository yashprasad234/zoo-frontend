<script setup="ts">
import { useUserStore } from "~/store/user.ts";
import { useMenuStore } from "~/store/menu";
import MenuButton from "./MenuButton.vue";
import { userMenu } from "~/data/menu";
import AvatarComponent from "./AvatarComponent.vue";

const userState = useUserStore();
const menuState = useMenuStore();
const isOpen = ref(false);

const navMenu = new Map();
navMenu.set("Home", "/");
navMenu.set("About", "/#about");
navMenu.set("Contact", "/#contact");

async function fetchMe() {
  if (!userState?.isLoading && userState?.user != null) {
    return;
  } else {
    try {
      const res = await useCustomFetch(`/me`, {
        method: "GET",
      });
      userState.$patch({
        isLoading: false,
        user: res,
      });

      const menu = userMenu;

      menuState.$patch({ menu: menu });
    } catch (err) {
      localStorage.removeItem("user-token");
      console.log(err.response);
      console.log(err.response._data.message);
    }
  }
}

async function handleLogout() {
  try {
    const res = await useCustomFetch(`/logout`, {
      method: "PUT",
    });
    console.log(res);
    localStorage.removeItem("user-token");
    userState.notFound();
    navigateTo("/login");
  } catch (err) {
    console.log(err.response);
    console.log(err.response._data.message);
  }
}

async function logout() {
  isOpen.value = false;
  await handleLogout();
}

onBeforeMount(() => {
  fetchMe();
});
</script>

<template>
  <div
    class="flex items-center justify-between px-6 py-4 sticky top-0 bg-white z-50 font-serif"
  >
    <div class="text-3xl">ZOO</div>

    <div v-if="userState?.isLoading"></div>
    <div>
      <div v-if="userState?.user != null" class="flex gap-16 items-center">
        <div
          v-for="([name, href], index) in menuState?.menu"
          class="flex justify-between gap-16"
        >
          <MenuButton :key="index" :name="name" :href="href" />
        </div>
        <AvatarComponent v-model="isOpen" />
      </div>
      <AvatarPopup
        v-if="isOpen"
        :logoutHandler="logout"
        :userName="userState?.user.username"
        v-model="isOpen"
      />
      <div
        v-if="!userState?.isLoading && userState?.user == null"
        class="flex gap-16 items-center"
      >
        <div
          v-for="([name, href], index) in navMenu"
          class="flex justify-between gap-16"
        >
          <MenuButton :key="index" :name="name" :href="href" />
        </div>
        <button
          @click="navigateTo(`/login`)"
          class="border border-deep-orange bg-white hover:bg-deep-orange px-4 py-2 hover:text-neutral-100 font-bold"
        >
          Login
        </button>
        <button
          class="border border-deep-orange bg-deep-orange px-4 py-2 text-neutral-100 font-bold"
          @click="navigateTo(`/signup`)"
        >
          Register
        </button>
      </div>
    </div>
  </div>
</template>
