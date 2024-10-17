<script setup lang="ts">
const props = defineProps({
  modelValue: Boolean,
});

const emit = defineEmits(["close", "delete"]);

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    emit("close");
  }
});
</script>
<template>
  <div class="flex flex-col font-serif gap-4 p-4">
    <p class="text-3xl">Are you sure?</p>
    <div class="flex justify-between text-white gap-4">
      <button
        class="px-4 py-2 bg-primary-forest"
        @click="
          () => {
            emit('delete');
            emit('close');
          }
        "
      >
        Yes
      </button>
      <button class="px-4 py-2 bg-primary-forest" @click="emit('close')">
        No
      </button>
    </div>
  </div>
</template>
