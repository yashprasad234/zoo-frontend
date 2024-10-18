<script setup lang="ts">
import { useUserStore } from "~/store/user";
import { useMenuStore } from "~/store/menu";
import { userMenu } from "~/data/menu";
import type { UserType } from "~/types/user";

const userState = useUserStore();
const menuState = useMenuStore();
const isOpen = ref(false);
const hamburgerMenuOpen = ref(false);
const openUserMenu = ref(false);
const userToken = useCookie("user-token");

async function fetchMe() {
  const token = userToken.value;
  if (!token) navigateTo("/login");
  else {
    if (!userState?.isLoading && userState?.user.role != "") {
      return;
    } else {
      await useCustomFetch(`/me`, {
        method: "GET",
      })
        .then((res) => {
          menuState.$patch({ menu: userMenu });
          userState.setUser(res as UserType);
        })
        .catch((err) => {
          menuState.reset();
          userState.notFound();
          userToken.value = "";
          navigateTo("/login");
        });
    }
  }
}

async function handleLogout() {
  const res = await useCustomFetch(`/logout`, {
    method: "PUT",
  })
    .then(() => {
      userState.notFound();
      menuState.reset();
      userToken.value = "";
      navigateTo("/login");
    })
    .catch((err) => {
      console.log(err.response);
    });
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
  <div v-if="userState.isLoading">Loading...</div>
  <div
    v-if="!userState.isLoading"
    class="flex items-center justify-between px-6 py-4 sticky top-0 bg-white z-30 font-serif shadow-xl"
  >
    <!-- Mobil menu -->
    <div class="flex flex-col relative block md:hidden">
      <!-- Menu open close buttons -->
      <div>
        <div
          v-if="!hamburgerMenuOpen"
          class="cursor-pointer"
          @click="
            () => {
              hamburgerMenuOpen = true;
            }
          "
        >
          <IconHamburger />
        </div>
        <div
          v-if="hamburgerMenuOpen"
          class="cursor-pointer mb-2"
          @click="
            () => {
              hamburgerMenuOpen = false;
            }
          "
        >
          <IconClose />
        </div>
      </div>
      <div v-if="hamburgerMenuOpen" class="flex flex-col items-start">
        <div
          v-for="([name, href], index) in menuState.menu"
          class="flex justify-between gap-16"
          :key="index"
        >
          <MenuButton :name="name" :href="href" />
        </div>
        <div v-if="userState.user.role == ''" class="flex flex-col items-start">
          <MenuButton name="Login" href="/login" />
          <MenuButton name="Register" href="/signup" />
        </div>
        <div v-else>
          <!-- user icon -->
          <div
            class="ml-2 cursor-pointer"
            @click="
              () => {
                openUserMenu = !openUserMenu;
              }
            "
          >
            <IconUser />
          </div>
          <!-- User menu -->
          <div
            v-if="openUserMenu"
            class="flex flex-col gap-2 items-start ml-6 mt-2"
          >
            <button class="">
              {{ userState.user.username }}
            </button>
            <button class="" @click="navigateTo('/resetPassword')">
              Reset Password
            </button>
            <button class="" @click="logout">Logout</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Tablet and above menu -->
    <div class="hidden md:block w-full">
      <!-- Logo -->
      <div class="flex justify-between">
        <img
          src="/_nuxt/assets/zoo-logo.png"
          alt="logo"
          class="h-12 w-auto cursor-pointer justify-self-start"
          @click="navigateTo('/')"
        />
        <!-- <div v-if="userState?.isLoading"></div> -->
        <!-- Nav buttons -->
        <div class="justify-self-end">
          <div
            v-if="userState?.user.role != ''"
            class="flex gap-16 items-center"
          >
            <div
              v-for="([name, href], index) in menuState.menu"
              class="flex justify-between gap-4"
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
            class="flex gap-6 items-center"
          >
            <div
              v-for="([name, href], index) in menuState.menu"
              class="flex justify-between gap-4"
              :key="index"
            >
              <MenuButton :name="name" :href="href" />
            </div>
            <button
              @click="navigateTo(`/login`)"
              class="bg-gray-100 hover:bg-deep-orange px-4 py-2 hover:text-neutral-100 font-bold"
            >
              Login
            </button>
            <button
              class="bg-deep-orange px-4 py-2 text-neutral-100 font-bold"
              @click="navigateTo(`/signup`)"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
