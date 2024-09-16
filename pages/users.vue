<script setup>
import { ref, onMounted } from "vue";
import UserCard from "~/components/UserCard.vue";

let isDataFetched = ref(false);
let data = ref(null);

async function fetchUsers() {
  try {
    const res = await fetch("http://localhost:8080/user/getusers", {
      method: "GET",
      body: null,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("user-token")}`,
      },
    });

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    const dataString = await res.text();
    data.value = JSON.parse(dataString);
    console.log(data);
    console.log(typeof data);
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  fetchUsers();
});
</script>

<template>
  <div class="py-4 px-8">
    <div v-if="data != null" v-for="(user, index) in data" :key="index">
      <UserCard :id="user.id" :username="user.username" :role="user.role" />
    </div>
  </div>
</template>
