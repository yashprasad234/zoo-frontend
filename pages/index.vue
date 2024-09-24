<script setup>
import CarouselComponent from "~/components/CarouselComponent.vue";

import img1 from "~/assets/RedPanda.jpeg";
import img2 from "~/assets/GiraffeAndMom.webp";
import img3 from "~/assets/AsiaticLion.webp";
import img4 from "~/assets/WhiteBengalTiger.jpg";
import img5 from "~/assets/RhinoAndMom.jpg";

const animalImages = [
  {
    src: img1,
    alt: "Red Panda",
  },
  {
    src: img2,
    alt: "Giraffe and Mom",
  },
  {
    src: img3,
    alt: "Asiatic Lion",
  },
  {
    src: img4,
    alt: "White Bengal Tiger",
  },
  {
    src: img5,
    alt: "Rhino and its mom",
  },
];
</script>
<template>
  <div>
    <CarouselComponent :images="animalImages" />
  </div>
</template>
