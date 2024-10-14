<script setup>
import { useUserStore } from "~/store/user";

const props = defineProps({
  userName: String,
  logoutHandler: Function,
  modelValue: Boolean,
});

const emit = defineEmits(["update:modelValue"]);
const onClick = () => {
  emit("update:modelValue", !props.modelValue);
};
const userState = useUserStore();
</script>

<template>
  <div
    class="w-max right-4 pt-4 flex flex-col absolute bg-white z-50 shadow-lg rounded-md gap-2 justify-center border-2 items-center mt-2"
  >
    <button class="border-b-2 border-slate-800 py-2">
      {{ userName }}
    </button>
    <button
      class="border-b-2 border-slate-800 py-2"
      @click="
        () => {
          onClick();
          navigateTo('/resetPassword');
        }
      "
    >
      Reset Password
    </button>
    <button class="py-1" @click="logoutHandler">Logout</button>
  </div>
</template>
