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
    <HomeAbout />
  </div>
  <div id="our-zoos" class="mb-8">
    <HomeFeaturedZoos />
  </div>
  <div id="animal-spotlight" class="mb-8">
    <HomeAnimalSpotlight />
  </div>
  <div id="cta" class="mb-8">
    <HomeCTA />
  </div>
</template>
