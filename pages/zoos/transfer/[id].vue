<script setup>
const allZoos = ref(null);
const myAnimal = ref(null);
const route = useRoute();

const handleTransfer = async (e) => {
  try {
    const res = await useCustomFetch(
      `/animal/id/${route.params.id}?zooId=${e.currentTarget.parentElement.dataset.id}`,
      {
        method: "PUT",
      }
    );
    navigateTo("/zoos");
  } catch (err) {
    console.log(err);
  }
};

const fetchAnimal = async () => {
  try {
    const res = await useCustomFetch(`/animal/id/${route.params.id}`, {
      method: "GET",
    });
    console.log(res.zoo.id);
    myAnimal.value = res;
    await fetchAllZoos();
  } catch (err) {
    console.log(err);
  }
};

const fetchAllZoos = async () => {
  try {
    const res = await useCustomFetch("/zoo/list", {
      method: "GET",
    });
    allZoos.value = res.filter((zoo) => {
      if (zoo.id != myAnimal.value.zoo.id) return zoo;
    });
    console.log(allZoos.value);
  } catch (err) {
    console.log(err);
  }
};

onBeforeMount(() => {
  fetchAnimal();
  fetchAllZoos();
});
</script>
<template>
  <div class="p-4">
    <h1 class="text-4xl">Zoo List</h1>
    <div class="grid grid-cols-12 my-8 gap-8">
      <div
        v-for="zoo in allZoos"
        :key="zoo?.id"
        :data-id="zoo?.id"
        class="col-span-4 shadow-lg flex flex-col p-4 border border-2 rounded-lg"
      >
        <h3 class="text-2xl">{{ zoo?.name }}</h3>
        <p class="text-lg">{{ zoo?.id }}</p>
        <button
          class="bg-deep-orange text-off-white w-max px-4 py-2 mx-auto"
          @click="handleTransfer"
        >
          Transfer Here
        </button>
      </div>
    </div>
  </div>
</template>
