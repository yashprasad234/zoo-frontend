<template>
  <div class="relative w-full relative">
    <div class="overflow-hidden relative">
      <div
        class="flex transition-transform duration-500"
        :style="`transform: translateX(-${currentIndex * 100}%)`"
      >
        <div v-for="(image, index) in images" :key="index" class="min-w-full">
          <img
            :src="image.src"
            :alt="image.alt"
            class="w-full h-1/2 object-cover opacity-70"
          />
        </div>
      </div>
    </div>
    <div class="absolute z-50 top-1/4 flex left-96">
      <h1 class="text-6xl text-slate-50 drop-shadow-xl">Welcome to the Zoo!</h1>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  images: {
    type: Array,
    required: true,
  },
});

const currentIndex = ref(0);

const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % props.images.length;
};

// Automatically change images every 2 seconds
let intervalId;

onMounted(() => {
  intervalId = setInterval(nextImage, 3500);
});

onUnmounted(() => {
  clearInterval(intervalId);
});

const goToImage = (index) => {
  currentIndex.value = index;
};
</script>

<style scoped>
.carousel-indicator {
  transition: background-color 1s;
}
</style>
