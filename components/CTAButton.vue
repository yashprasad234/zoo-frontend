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
    default:
      "border border-slate-700 bg-white hover:bg-slate-700 px-4 py-2 hover:text-neutral-100 font-bold",
  },
});
</script>

<template>
  <button @click="navigateTo(`${props.href}`)" :class="props.class">
    {{ props.name }}
  </button>
</template>
