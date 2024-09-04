<script setup>
import { ref, onMounted } from "vue";

const email = ref("");
const password = ref("");
const data = ref("");

function setEmail(newEmail) {
  email.value = newEmail;
}

function setPassword(newPassword) {
  password.value = newPassword;
}

async function fetchData() {
  try {
    const response = await fetch('http://localhost:8080/login', {
      method: 'GET', // or 'POST', 'PUT', etc.
      headers: {
        'Content-Type': 'application/json',
        'x-email': email.value,
        'x-password': password.value,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    data.value = result;
    console.log(data.value);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

async function handleLogin(e) {
  e.preventDefault();
  console.log(email.value);
  console.log(password.value);
  await fetchData();
}

</script>

<template>
  <div
    v-bind:style="{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      width: '30%',
      margin: '8rem auto',
    }"
  >
    <h1 v-bind:style="{ margin: 'auto', marginBottom: '2rem' }">LOGIN</h1>
    <form
      action=""
      v-bind:style="{ display: 'flex', flexDirection: 'column', gap: '2rem' }"
      @submit="handleLogin"
    >
      <input
        type="email"
        placeholder="Enter your email"
        required="true"
        v-bind:style="{ padding: '10px 12px', fontSize: '1.25rem' }"
        v-model="email"
      />
      <input
        type="password"
        placeholder="Enter your password"
        required="true"
        v-bind:style="{
          padding: '10px 12px',
          fontSize: '1.25rem',
        }"
        v-model="password"
      />
      <button
        type="submit"
        v-bind:style="{
          padding: '10px 12px',
          fontSize: '1.25rem',
        }"
      >
        Log In
      </button>
    </form>
  </div>
</template>
