<script setup lang="ts">
const props = defineProps({
  modelValue: Boolean,
  handler: Function,
});

const emits = defineEmits(["update:modelValue", "deleteAnimal"]);

async function deletionConfirmed() {
  emits("deleteAnimal");
  emits("update:modelValue", false);
}

function deletionStopped() {
  emits("update:modelValue", false);
}
</script>
<template>
  <div class="flex flex-col font-serif gap-4 p-4">
    <p class="text-3xl">Are you sure?</p>
    <div class="flex justify-between text-white gap-4">
      <button class="px-4 py-2 bg-primary-forest" @click="deletionConfirmed">
        Yes
      </button>
      <button class="px-4 py-2 bg-primary-forest" @click="deletionStopped">
        No
      </button>
    </div>
  </div>
</template>
