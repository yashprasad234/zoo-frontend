<script setup="ts">
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
  </div>
</template>
