<script setup="ts">
import { useUserStore } from "~/store/user.ts";
import { useMenuStore } from "~/store/menu";
import MenuButton from "./MenuButton.vue";
import { userMenu, adminMenu, superAdminMenu } from "~/data/menu";

const userState = useUserStore();
const menuState = useMenuStore();

async function fetchMe() {
  if (!userState.isLoading && userState.user != null) {
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

      const menu =
        userState.user?.role === "USER"
          ? userMenu
          : userState.user?.role === "ADMIN"
          ? adminMenu
          : superAdminMenu || null;

      menuState.$patch({ menu: menu });
    } catch (err) {
      console.log(err.response);
      console.log(err.response._data.message);
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
