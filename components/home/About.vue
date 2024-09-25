<script setup="ts">
import { useUserStore } from "~/store/user";

const userState = useUserStore();
</script>

<template>
  <h1 class="text-6xl font-serif font-bold text-center my-8">ABOUT</h1>
  <div class="flex gap-2 justify-center items-center p-8">
    <div class="flex flex-col px-4 py-2 gap-4 w-3/5">
      <h2 class="text-3xl font-serif font-bold">Mission Statement</h2>
      <p class="text-xl font-mono">
        At the heart of our zoos lies a commitment to wildlife conservation,
        education, and the protection of endangered species. Our zoos are safe
        havens for animals, dedicated to preserving biodiversity and fostering
        an understanding of the vital role these creatures play in our
        ecosystem. By supporting our zoos, you're joining the effort to protect
        and rehabilitate animals, ensuring that future generations can
        experience the beauty of wildlife.
      </p>
    </div>
    <img
      src="~/assets/animals/RedPanda.webp"
      alt="a red panda"
      class="w-2/5 h-full object-cover rounded-3xl transition-transform hover:scale-y-110"
    />
  </div>
  <div class="flex flex-col px-12 mx-auto py-2 gap-4 w-3/5">
    <h2 class="text-3xl font-serif font-bold">Our Community of Users</h2>
    <h2 class="text-xl font-mono">
      We believe everyone has a role to play in this mission, and that’s why our
      platform caters to various user levels:
    </h2>
  </div>
  <div class="flex flex-col gap-4 mx-auto px-12 w-4/5 mt-4">
    <div class="flex gap-6 items-center justify-between">
      <div class="flex flex-col items-center">
        <div class="rounded-full border border-slate-700 p-2 relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-12"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
            />
          </svg>
        </div>
        <p>Guests</p>
      </div>
      <p class="font-mono text-xl">
        Visitors who aren’t logged in can explore the zoos, learn about the
        animals, and see our conservation efforts in action.
      </p>
    </div>
    <div class="flex gap-6 items-center justify-between">
      <div class="flex flex-col items-center">
        <div class="rounded-full border border-slate-700 p-2 relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-12"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
        </div>
        <p>User</p>
      </div>
      <p class="font-mono text-xl">
        Members who log in have the ability to actively participate by
        registering new animals in the zoo database, contributing directly to
        our animal records and care.
      </p>
    </div>
    <div class="flex gap-6 items-center justify-between">
      <div class="flex flex-col items-center">
        <div class="rounded-full border border-slate-700 p-2 relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-12"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6 absolute top-4 right-2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
            />
          </svg>
        </div>
        <p>Admin</p>
      </div>
      <p class="font-mono text-xl">
        Zoo administrators not only register new animals but also manage them,
        ensuring that animals can be transferred safely between zoos to balance
        resources and improve welfare.
      </p>
    </div>
    <div class="flex gap-6 items-center justify-between">
      <div class="flex flex-col items-center">
        <div class="rounded-full border border-slate-700 p-2 relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-12"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-8 absolute top-4 right-0"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
            />
          </svg>
        </div>
        <p>S-Admin</p>
      </div>
      <p class="font-mono text-xl">
        These are our top-level users who oversee the creation of new zoos,
        manage large-scale zoo operations, and release animals back into the
        wild when it is safe and sustainable to do so.
      </p>
    </div>
  </div>
</template>
