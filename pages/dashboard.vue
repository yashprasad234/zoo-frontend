<script setup>
import { ref, onMounted } from "vue";
const toast = useToast();
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const data = ref("");

function setEmail(newEmail) {
  email.value = newEmail;
}

function setPassword(newPassword) {
  password.value = newPassword;
}

function setConfirmPassword(newPassword) {
  confirmPassword.value = newPassword;
}

async function fetchData() {
  try {
    if (password.value == confirmPassword.value) {
      const response = await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
        body: JSON.stringify({
          email: email.value,
          password: password.value,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.text();
      console.log(result);
      data.value = result;
    } else data.value = "Password and Confirm Password Don't match";
  } catch (error) {
    console.error("Error fetching data:", error);
    data.value = "Failed to connect to api";
  }
}

async function handleSignup(e) {
  e.preventDefault();
  await fetchData();
  email.value = "";
  password.value = "";
  confirmPassword.value = "";
  toast.add({ title: data.value });
}
</script>

<template>
	<div class="flex justify-between px-12 py-8">
		<div class="text-4xl" >ZOO</div>
		<div class="flex">
			<ul class="flex gap-12 items-center">
				<li class="hover:text-white hover:bg-cyan-400 cursor-pointer px-4 py-2" >Home</li>
				<li  class="hover:text-white hover:bg-cyan-400 cursor-pointer px-4 py-2" >About</li>
				<li class="hover:text-white hover:bg-cyan-400 cursor-pointer px-4 py-2" >Users</li>
				<li><button class="outline-2 bg-cyan-400 text-white rounded-md px-4 py-2" >Logout</button></li>
			</ul>
		</div>	
	</div>
</template>

