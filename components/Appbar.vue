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

async function fetchMe() {
  const token = localStorage.getItem("user-token");
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
          localStorage.removeItem("user-token");
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
      localStorage.removeItem("user-token");
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
  <div
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-6"
          >
            <path
              fill-rule="evenodd"
              d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
              clip-rule="evenodd"
            />
          </svg>
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-6"
          >
            <path
              fill-rule="evenodd"
              d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>
      <div v-if="hamburgerMenuOpen" class="flex flex-col items-start">
        <div
          v-for="([name, href], index) in menuState.menu"
          class="flex justify-between gap-16"
        >
          <MenuButton :key="index" :name="name" :href="href" />
        </div>
        <div v-if="userState.user.role == ''">
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-9"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
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
    </div>
  </div>
</template>
