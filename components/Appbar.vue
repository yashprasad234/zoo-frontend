<script setup lang="ts">
import { useUserStore } from "~/store/user";
import { useMenuStore } from "~/store/menu";
import { userMenu } from "~/data/menu";
import type { UserType } from "~/types/user";

const userState = useUserStore();
const menuState = useMenuStore();
const isOpen = ref(false);

async function fetchMe() {
  const token = localStorage.getItem("user-token");
  if (!token) navigateTo("/login");
  else {
    if (!userState?.isLoading && userState?.user.role != "") {
      return;
    } else {
      try {
        const res = await useCustomFetch(`/me`, {
          method: "GET",
        });
        menuState.$patch({ menu: userMenu });
        userState.setUser(res as UserType);
      } catch (err) {
        menuState.reset();
        localStorage.removeItem("user-token");
      }
    }
  }
}

async function handleLogout() {
  try {
    const res = await useCustomFetch(`/logout`, {
      method: "PUT",
    });
    userState.notFound();
    menuState.reset();
    localStorage.removeItem("user-token");
    navigateTo("/login");
  } catch (err: any) {
    console.log(err.response);
    console.log(err.response.data.message);
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
    class="flex items-center justify-between px-6 py-4 sticky top-0 bg-white z-50 font-serif shadow-xl"
  >
    <div class="text-3xl">ZOO</div>

    <div v-if="userState?.isLoading"></div>
    <div>
      <div v-if="userState?.user.role != ''" class="flex gap-16 items-center">
        <div
          v-for="([name, href], index) in menuState.menu"
          class="flex justify-between gap-16"
        >
          <MenuButton :key="index" :name="name" :href="href" />
        </div>
        <AvatarComponent @updateState="isOpen = !isOpen" />
      </div>
      <AvatarPopup
        v-if="isOpen"
        @logout="logout"
        :userName="userState?.user.username"
        v-model="isOpen"
      />
      <div
        v-if="!userState?.isLoading && userState?.user.role == ''"
        class="flex gap-16 items-center"
      >
        <div
          v-for="([name, href], index) in menuState.menu"
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
