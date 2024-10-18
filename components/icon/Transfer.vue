<script setup lang="ts">
const props = defineProps({
  isVisible: Boolean,
});
const toolTip = ref(false);
const emit = defineEmits(["openTransfer"]);
</script>

<template>
  <div class="relative">
    <div
      v-if="toolTip"
      class="bg-gray-200 font-bold absolute -left-20 top-1/2 -translate-y-1/2 px-4 py-2 text-md"
    >
      Transfer
    </div>
    <div
      @mouseover="
        () => {
          toolTip = true;
        }
      "
      @mouseleave="
        () => {
          toolTip = false;
        }
      "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        v-if="isVisible"
        @click="emit('openTransfer')"
        class="size-10 rounded-full px-2 cursor-pointer border-2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
        />
      </svg>
    </div>
  </div>
</template>
