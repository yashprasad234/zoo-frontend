<script setup>
import CustomInput2 from "./CustomInput2.vue";
const props = defineProps({
  handler: Function,
  inputs: Array,
  submitBtnText: String,
  formName: String,
  modelValue: Object,
  class: { type: String, default: "flex flex-col gap-12 w-full" },
});

const emit = defineEmits(["update:modelValue"]);

// Emit updated value for a specific input
const updateValue = (index, value) => {
  emit("update:modelValue", { ...props.modelValue, [index]: value });
};
</script>

<template>
  <div
    class="flex flex-col items-center w-max gap-8 h-max bg-white py-4 px-12 rounded-xl mt-4 font-serif border border-2 border-slate-800"
  >
    <h1 class="text-3xl text-slate-800">{{ props.formName }}</h1>
    <form @submit="props.handler" :class="class">
      <div v-for="(input, ind) of props.inputs">
        <CustomInput2
          :type="input.type"
          :placeholder="input.placeholder"
          :required="input.required"
          v-model="modelValue[`var${ind}`]"
          :key="ind"
          @update:model-value="updateValue"
        />
      </div>
      <button
        type="submit"
        class="outline outline-2 px-4 py-2 text-xl text-off-white bg-primary-forest w-full"
      >
        {{ props.submitBtnText }}
      </button>
    </form>
  </div>
</template>
