<template>
  <div class="flex items-center justify-between px-6 py-4">
    <div class="text-3xl">ZOO</div>
    <div class="flex gap-16 items-center">
      <ul class="flex justify-between gap-16">
        <li
          class="px-4 py-2 hover:bg-sky-300 hover:text-neutral-100 cursor-pointer"
        >
          <a class="p-0" href="/">Home</a>
        </li>
        <li
          class="px-4 py-2 hover:bg-sky-300 hover:text-neutral-100 cursor-pointer"
        >
          <a class="p-0" href="/about">About</a>
        </li>
        <li
          class="px-4 py-2 hover:bg-sky-300 hover:text-neutral-100 cursor-pointer"
        >
          <a class="p-0" href="/users">Users</a>
        </li>
      </ul>
      <button class="bg-sky-300 px-4 py-2 text-neutral-100">Logout</button>
    </div>
  </div>
</template>
