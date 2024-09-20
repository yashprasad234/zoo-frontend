<script setup="ts">
const props = defineProps({
  name: {
    type: String,
    Required: true,
  },
  href: {
    type: String,
    Required: true,
  },
  class: {
    type: String,
    default: "px-4 py-2 hover:bg-sky-300 hover:text-neutral-100 cursor-pointer",
  },
});
</script>

<template>
  <button @click="navigateTo(`${props.href}`)" :class="props.class">
    {{ props.name }}
  </button>
</template>
