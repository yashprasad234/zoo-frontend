<script setup="ts">
import FeaturedZoos from "~/components/home/FeaturedZoos.vue";
import About from "~/components/home/About.vue";
import AnimalSpotlight from "~/components/home/AnimalSpotlight.vue";
import CTA from "~/components/home/CTA.vue";
</script>
<template>
  <div
    class="bg-[url('~/assets/animals/WhiteBengalTiger.webp')] opacity-70 h-screen bg-cover bg-no-repeat w-full bg-opacity-30 relative"
    id="landing"
  ></div>
  <div
    class="text-black drop-shadow-5xl absolute top-1/2 left-48 w-3/4 pr-20 flex flex-col gap-4"
  >
    <div class="w-3/5">
      <h1 class="text-3xl font-black">Connecting Zoos, Animals, and People.</h1>
      <h2 class="text-xl font-medium">
        Discover our zoos and the animals they protect, register new animals, or
        support wildlife conservation.
      </h2>
    </div>
    <div class="flex gap-16 w-full">
      <CTAButton
        name="Explore Zoos"
        href="/login"
        class="border border-slate-700 bg-slate-700 px-8 py-2 text-lg text-neutral-100 font-bold hover:bg-white hover:text-slate-700 font-bold"
      />
      <CTAButton
        name="Register an Animal"
        href="/login"
        class="border border-slate-700 bg-slate-700 px-8 py-2 text-lg text-neutral-100 font-bold hover:bg-white hover:text-slate-700 font-bold"
      />
      <CTAButton
        name="Manage Zoos"
        href="/login"
        class="border border-slate-700 bg-slate-700 px-8 py-2 text-lg text-neutral-100 font-bold hover:bg-white hover:text-slate-700 font-bold"
      />
    </div>
  </div>
  <div id="about">
    <About />
  </div>
  <div id="our-zoos" class="mb-8">
    <FeaturedZoos />
  </div>
  <div id="animal-spotlight" class="mb-8">
    <AnimalSpotlight />
  </div>
  <div id="cta" class="mb-8">
    <CTA />
  </div>
</template>
