<script setup lang="ts">
import type { PropType } from "vue";
import type { FormInputType } from "~/types/input";
const props = defineProps({
  inputs: Array as PropType<FormInputType[]>,
  submitBtnText: String,
  formName: String,
  modelValue: Object,
  noBorder: Boolean,
  gap: { type: String, default: "gap-4" },
});

const emit = defineEmits(["update:modelValue", "submitForm"]);

// Emit updated value for a specific input
const updateValue = (index: number, value: any) => {
  emit("update:modelValue", { ...props.modelValue, [index]: value });
};
</script>

<template>
  <div
    :class="
      noBorder
        ? `flex flex-col items-center w-max ${gap} h-max py-4 px-12 rounded-xl font-serif`
        : `flex flex-col items-center w-max ${gap} h-max py-4 px-12 rounded-xl font-serif border border-2 border-slate-800`
    "
  >
    <h1 class="text-3xl text-slate-800">{{ props.formName }}</h1>
    <form
      @submit="
        (e: Event) => {
          emit('submitForm', e);
        }
      "
      :class="`flex flex-col w-full ${gap}`"
    >
      <div v-for="(input, ind) of inputs">
        <CustomInput
          v-if="modelValue"
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
        class="outline outline-2 px-2 py-1 text-xl text-off-white bg-primary-forest w-full"
      >
        {{ props.submitBtnText }}
      </button>
    </form>
  </div>
</template>
