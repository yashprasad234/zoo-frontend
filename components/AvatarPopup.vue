<script setup lang="ts">
import { useUserStore } from "~/store/user";

const props = defineProps({
  modelValue: Boolean,
});

const emit = defineEmits(["update:modelValue", "logout"]);
const onClick = () => {
  emit("update:modelValue", !props.modelValue);
  navigateTo("/resetPassword");
};
const userState = useUserStore();
</script>

<template>
  <div
    class="w-max right-4 pt-4 flex flex-col absolute bg-white z-50 shadow-lg rounded-md gap-2 justify-center border-2 items-center mt-2"
  >
    <button class="border-b-2 border-slate-800 py-2">
      {{ userState.user.username }}
    </button>
    <button class="border-b-2 border-slate-800 py-2" @click="onClick">
      Reset Password
    </button>
    <button class="py-1" @click="emit('logout')">Logout</button>
  </div>
</template>
