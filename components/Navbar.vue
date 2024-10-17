<script setup lang="ts">
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";
import { useUserStore } from "~/store/user";
import { useMenuStore } from "~/store/menu";
import { userMenu } from "~/data/menu";
import { openRoutes } from "~/data/routes";
import type { UserType } from "~/types/user";

const userState = useUserStore();
const menuState = useMenuStore();
const route = useRoute();

async function fetchMe() {
  const token = localStorage.getItem("user-token");
  if (!token && openRoutes.includes(route.path)) {
    return;
  }
  if (!token && !openRoutes.includes(route.path)) {
    navigateTo("/login");
    return;
  } else {
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
  await handleLogout();
}

onBeforeMount(() => {
  fetchMe();
});
</script>
<template>
  <Disclosure
    as="nav"
    class="bg-white sticky top-0 z-50 shadow-xl"
    v-slot="{ open }"
  >
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <DisclosureButton
            class="relative inline-flex items-center justify-center rounded-md p-2 text-slate-800 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <span class="absolute -inset-0.5" />
            <span class="sr-only">Open main menu</span>
            <div v-if="!open" class="block h-6 w-6" aria-hidden="true">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="{1.5}"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </div>
            <div v-else class="block h-6 w-6" aria-hidden="true">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="{1.5}"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </div>
          </DisclosureButton>
        </div>
        <div class="flex gap-4 flex-1 items-center sm:justify-start">
          <!-- Logo -->
          <div class="mx-auto md:mx-0 flex flex-shrink-0 items-center">
            <img
              class="h-16 w-auto cursor-pointer"
              src="/_nuxt/assets/zoo-logo.png"
              alt="Zoo"
              @click="
                () => {
                  navigateTo('/');
                }
              "
            />
          </div>
          <!-- navbar links -->
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex gap-4 space-x-4">
              <button
                v-for="([name, href], index) in menuState.menu"
                :key="index"
                class="text-slate-800 hover:bg-primary-earth hover:text-white rounded-sm px-3 py-2 text-md font-medium"
                @click="() => navigateTo(href)"
              >
                {{ name }}
              </button>
            </div>
          </div>
        </div>
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <!-- Profile dropdown -->
          <Menu v-if="userState.user.role != ''" as="div" class="relative ml-3">
            <div>
              <MenuButton
                class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span class="absolute -inset-1.5" />
                <span class="sr-only">Open user menu</span>
                <!-- Avatar icon -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="bg-white size-8 rounded-full"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
              </MenuButton>
            </div>
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <MenuItem v-slot="{ active }">
                  <button
                    :class="[
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-slate-800',
                    ]"
                  >
                    {{ userState.user.username }}
                  </button>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <button
                    :class="[
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-slate-800',
                    ]"
                    @click="
                      () => {
                        navigateTo('/resetPassword');
                      }
                    "
                  >
                    Reset Password
                  </button>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <button
                    :class="[
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-slate-800',
                    ]"
                    @click="logout"
                  >
                    Logout
                  </button>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
          <div v-else class="flex gap-8">
            <button
              class="px-2 py-1 bg-gray-100 hover:bg-deep-orange hover:text-white rounded-sm"
              @click="
                () => {
                  navigateTo('/login');
                }
              "
            >
              Login
            </button>
            <button
              class="px-2 py-1 bg-deep-orange text-white rounded-sm"
              @click="
                () => {
                  navigateTo('/signup');
                }
              "
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 px-2 pb-3 pt-2">
        <DisclosureButton
          v-for="([name, href], index) in menuState.menu"
          :key="name"
          as="button"
          @click="navigateTo(href)"
          :class="[
            'text-slate-800 hover:bg-gray-700 hover:text-white',
            'block rounded-md px-3 py-2 text-base font-medium',
          ]"
          >{{ name }}</DisclosureButton
        >
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>
