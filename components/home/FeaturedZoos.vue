<script setup>
import GiraffeSvg from "./GiraffeSvg.vue";
import GrassSvg from "./GrassSvg.vue";
import TreeSvg from "./TreeSvg.vue";
const zooImages = [
  {
    src: "_nuxt/assets/zoo/delhi-zoo.jpg",
    alt: "Delhi Zoo",
  },
];
</script>

<template>
  <h1 class="text-6xl font-serif font-bold text-center my-8">OUR ZOOs</h1>
  <div class="grid grid-cols-12 grid-rows-11 gap-4">
    <!-- from col 1-6 and row 1-3 -->
    <div class="col-span-6 row-span-3 relative text-black">
      <img
        :src="zooImages[0].src"
        :alt="zooImages[0].alt"
        class="shadow-lg object-cover opacity-70 hover:opacity-50 aspect-[2/1]"
      />
      <div class="absolute top-12 left-8">
        <h1 class="text-3xl font-serif font-bold text-inherit">
          Delhi National Zoological Park
        </h1>
        <p class="font-mono font-semibold">
          Inaugurated on 1st November, 1959 and later in the year 1982 it was
          given the status of the National Zoological Park with the idea of it
          being the model zoo of the country. The Delhi Zoo is famous for its
          white tigers, which are a rare genetic mutation of the Bengal tiger.
          They have white fur with black stripes and blue eyes. They are not
          albinos or a separate subspecies.
        </p>
      </div>
    </div>
    <!-- from col 7-12 and row 1-5 -->
    <div class="col-start-7 col-end-13 row-span-5 relative text-black">
      <img
        :src="zooImages[0].src"
        :alt="zooImages[0].alt"
        class="shadow-lg object-cover opacity-70 hover:opacity-50 aspect-[6/5]"
      />
      <div class="absolute top-20 left-8">
        <h1 class="text-3xl font-serif font-bold text-inherit">
          Delhi National Zoological Park
        </h1>
        <p class="font-mono font-semibold">
          Inaugurated on 1st November, 1959 and later in the year 1982 it was
          given the status of the National Zoological Park with the idea of it
          being the model zoo of the country. The Delhi Zoo is famous for its
          white tigers, which are a rare genetic mutation of the Bengal tiger.
          They have white fur with black stripes and blue eyes. They are not
          albinos or a separate subspecies.
        </p>
      </div>
    </div>
    <!-- from col 1-6 row 4-5 -->
    <!-- <div class="col-span-6 row-start-4 row-end-6">
      <div class="flex">
        <TreeSvg />
        <TreeSvg />
        <TreeSvg />
        <TreeSvg />
      </div>
    </div> -->
    <!-- for col 1-12 and row 6-8 -->
    <div class="col-span-12 row-start-6 row-end-9 relative text-black">
      <img
        :src="zooImages[0].src"
        :alt="zooImages[0].alt"
        class="shadow-lg object-cover opacity-70 hover:opacity-50 aspect-[4/1]"
      />
      <div class="absolute top-28 left-20">
        <h1 class="text-3xl font-serif font-bold text-inherit">
          Delhi National Zoological Park
        </h1>
        <p class="font-mono font-semibold">
          Inaugurated on 1st November, 1959 and later in the year 1982 it was
          given the status of the National Zoological Park with the idea of it
          being the model zoo of the country. The Delhi Zoo is famous for its
          white tigers, which are a rare genetic mutation of the Bengal tiger.
          They have white fur with black stripes and blue eyes. They are not
          albinos or a separate subspecies.
        </p>
      </div>
    </div>
    <!-- for col 1-6 row 9-11 -->
    <div
      class="col-start-4 col-end-10 row-start-9 row-end-12 relative text-black"
    >
      <img
        :src="zooImages[0].src"
        :alt="zooImages[0].alt"
        class="shadow-lg object-cover opacity-70 hover:opacity-50 aspect-[2/1]"
      />
      <div class="absolute top-12 left-8">
        <h1 class="text-3xl font-serif font-bold text-inherit">
          Delhi National Zoological Park
        </h1>
        <p class="font-mono font-semibold">
          Inaugurated on 1st November, 1959 and later in the year 1982 it was
          given the status of the National Zoological Park with the idea of it
          being the model zoo of the country. The Delhi Zoo is famous for its
          white tigers, which are a rare genetic mutation of the Bengal tiger.
          They have white fur with black stripes and blue eyes. They are not
          albinos or a separate subspecies.
        </p>
      </div>
    </div>
    <!-- for col 7-12 row 9-11 -->
    <!-- <div class="col-start-7 col-end-13 row-start-9 row-end-12">
      <div class="flex flex-col">
        <div class="flex">
          <GiraffeSvg />
          <GiraffeSvg />
          <GiraffeSvg />
        </div>
        <div class="flex">
          <GrassSvg />
          <GrassSvg />
          <GrassSvg />
          <GrassSvg />
        </div>
      </div>
    </div> -->
  </div>
</template>
