<script setup lang="ts">
const animalData = [
  {
    src: "/_nuxt/assets/animals/RhinoAndMom.webp",
    alt: "The Rhino Mother-Son Duo",
    name: "Badal & Asha",
    species: "Indian One Horned Rhinocerous",
    description:
      "Badal, meaning 'cloud' in Hindi, is the name given to our curious and playful male baby rhino. Born during the monsoon season, his arrival brought a wave of joy to the zoo. Badal is always seen trotting behind his mother, Asha, who is fiercely protective of her little one. Asha, whose name means 'hope,' symbolizes the zoo's efforts to revive the dwindling rhino population. Together, mother and son are a powerful representation of nurturing and survival in the face of adversity, reminding us how crucial it is to protect these gentle giants.",
  },
  {
    src: "/_nuxt/assets/animals/WhiteBengalTiger.webp",
    alt: "The White Bengal Tigeress",
    name: "Shveti",
    species: "White Bengal Tigeres",
    description:
      "Shveti, named after the Sanskrit word for 'white', is a rare and magnificent white tigress that roams the dense forests of our zoo's sanctuary. Her stunning white coat, a result of a genetic variation, has captivated visitors for years. Despite her striking appearance, Shveti is known for her playful and gentle nature. Found abandoned as a cub, she was rescued and raised in the zoo, where she’s become a symbol of resilience and strength. Now, she thrives in an environment that mimics her natural habitat, inspiring a deeper appreciation for tigers' conservation.",
  },
  {
    src: "/_nuxt/assets/animals/RedPanda.webp",
    alt: "The Baby Red Panda",
    name: "Lalchu",
    species: "Red Panda",
    description:
      "Lalchu, or 'little red', is the name given to our baby red panda. This fluffy little male is known for his playful antics and inquisitive nature. His large, bright eyes and mischievous personality make him a favorite among visitors. Orphaned early in life, Lalchu found a new home here at the zoo, where he’s given all the love and care he needs to thrive. His journey from a vulnerable cub to a confident young panda serves as a heartwarming tale of second chances in the wild.",
  },
  {
    src: "/_nuxt/assets/animals/GiraffeAndMom.webp",
    alt: "The Giraffe Family",
    name: "Sundari & Tara",
    species: "Giraffe",
    description:
      "Sundari, meaning 'beauty' in Hindi, is our graceful lady giraffe who stands tall with elegance. But the most beautiful part of her story is her deep bond with Tara, a young giraffe she adopted after the unfortunate loss of Tara’s biological mother. Tara, meaning 'star', came into Sundari’s life unexpectedly, but the two have formed an inseparable bond. Sundari’s love and care for her adopted daughter is a testament to the nurturing nature of animals. Together, they stroll through the savannah enclosure, symbolizing the kindness and unity found in the animal kingdom.",
  },
  {
    src: "/_nuxt/assets/animals/AsiaticLion.webp",
    alt: "The Asiatic Lion King",
    name: "Raja",
    species: "Asiatic Lion",
    description:
      "Raja, which translates to 'king' in Hindi, is truly the ruler of the zoo’s pride. This majestic Asiatic lion commands respect with his powerful presence and deep, booming roar that can be heard throughout the zoo. Once roaming the forests of Gir in Gujarat, Raja was brought to the zoo to aid in preserving the endangered Asiatic lion species. Known for his leadership and protective nature, Raja embodies the essence of a true king. His regal stance and piercing gaze remind everyone who visits of the strength and majesty of lions, urging us to safeguard their future in the wild.",
  },
];
</script>

<template>
  <h1 class="text-6xl font-serif font-bold text-center my-12">
    Animal Spotlight
  </h1>
  <div class="grid grid-cols-12 grid-rows-8 gap-4">
    <!-- from col 1-6 and row 1-3 -->
    <div class="col-span-6 row-span-3 relative text-black">
      <img
        :src="animalData[0].src"
        :alt="animalData[0].alt"
        class="shadow-lg object-cover opacity-70 hover:opacity-50 aspect-[2/1]"
      />
      <div class="absolute top-12 left-8">
        <h1 class="text-3xl font-serif font-bold text-inherit">
          {{ animalData[0].name + " " + animalData[0].alt }}
        </h1>
        <p class="font-mono font-semibold text-sm">
          {{ animalData[0].description }}
        </p>
      </div>
    </div>
    <!-- from col 7-12 and row 1-3 -->
    <div class="col-start-7 col-end-13 row-span-3 relative text-black">
      <img
        :src="animalData[1].src"
        :alt="animalData[1].alt"
        class="shadow-lg object-cover opacity-70 hover:opacity-50 aspect-[6/5]"
      />
      <div class="absolute top-20 left-8">
        <h1 class="text-3xl font-serif font-bold text-inherit">
          {{ animalData[1].name + " " + animalData[1].alt }}
        </h1>
        <p class="font-mono font-semibold text-sm">
          {{ animalData[1].description }}
        </p>
      </div>
    </div>
    <!-- for col 1-12 and row 4-5 -->
    <div class="col-span-12 row-start-4 row-end-6 relative text-black">
      <img
        :src="animalData[2].src"
        :alt="animalData[2].alt"
        class="shadow-lg object-cover opacity-70 hover:opacity-50 aspect-[4/1]"
      />
      <div class="absolute top-28 left-20">
        <h1 class="text-3xl font-serif font-bold text-inherit">
          {{ animalData[2].name + " " + animalData[2].alt }}
        </h1>
        <p class="font-mono font-semibold text-sm">
          {{ animalData[2].description }}
        </p>
      </div>
    </div>
    <!-- for col 1-6 row 6-9 -->
    <div class="col-span-6 row-start-6 row-end-10 relative text-black">
      <img
        :src="animalData[3].src"
        :alt="animalData[3].alt"
        class="shadow-lg object-cover opacity-70 hover:opacity-50 aspect-[2/1]"
      />
      <div class="absolute top-12 left-8">
        <h1 class="text-3xl font-serif font-bold text-inherit">
          {{ animalData[3].name + " " + animalData[3].alt }}
        </h1>
        <p class="font-mono font-semibold text-sm">
          {{ animalData[3].description }}
        </p>
      </div>
    </div>
    <!-- for col 7-12 row 6-9 -->
    <div class="col-start-7 col-end-13 row-start-6 row-end-10 relative">
      <img
        :src="animalData[4].src"
        :alt="animalData[4].alt"
        class="shadow-lg object-cover opacity-70 hover:opacity-50 aspect-[2/1]"
      />
      <div class="absolute top-12 left-8">
        <h1 class="text-3xl font-serif font-bold text-inherit">
          {{ animalData[4].name + " " + animalData[4].alt }}
        </h1>
        <p class="font-mono font-semibold text-sm">
          {{ animalData[4].description }}
        </p>
      </div>
    </div>
  </div>
</template>
