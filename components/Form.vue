<script setup lang="ts">
import type { PropType } from "vue";
import type { FormInputType } from "~/types/input";
const props = defineProps({
  type: String,
  inputs: Array as PropType<FormInputType[]>,
  submitBtnText: String,
  formName: String,
  subHeading: String,
  modelValue: Object,
  noBorder: Boolean,
  gap: { type: String, default: "gap-4" },
});

const emit = defineEmits([
  "update:modelValue",
  "submitForm",
  "delete",
  "close",
  "updateProps",
]);

// Emit updated value for a specific input
const updateValue = (index: number, value: any) => {
  emit("update:modelValue", { ...props.modelValue, [index]: value });
};
</script>

<template>
  <div
    v-if="type == 'form'"
    :class="
      noBorder
        ? `flex flex-col items-center w-full ${gap} h-max py-4 px-12 rounded-xl font-serif`
        : `flex flex-col items-center w-full ${gap} h-max py-4 px-12 rounded-xl font-serif border border-2 border-slate-800`
    "
  >
    <h1 v-if="formName != ''" class="text-3xl text-slate-800">
      {{ props.formName }}
    </h1>
    <p v-if="subHeading != ''" class="text-lg self-start">
      {{ subHeading }}
    </p>
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
  <div v-if="type == 'popup'">
    <div class="flex flex-col gap-2">
      <button
        class="outline outline-2 outline-slate-800 px-2 w-max self-end text-sm"
        @click="emit('updateProps')"
      >
        X
      </button>
      <div
        :class="
          noBorder
            ? `flex flex-col items-center w-full ${gap} h-max py-4 px-12 rounded-xl font-serif`
            : `flex flex-col items-center w-full ${gap} h-max py-4 px-12 rounded-xl font-serif border border-2 border-slate-800`
        "
      >
        <h1 v-if="formName != ''" class="text-3xl text-slate-800">
          {{ props.formName }}
        </h1>
        <p v-if="subHeading != ''" class="text-lg self-start">
          {{ subHeading }}
        </p>
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
    </div>
  </div>
  <div v-if="type == 'confirmation'">
    <div class="flex flex-col font-serif gap-4 p-4">
      <p class="text-3xl">Are you sure?</p>
      <div class="flex justify-between text-white gap-4">
        <button
          class="px-4 py-2 bg-primary-forest"
          @click="
            () => {
              emit('delete');
              emit('close');
            }
          "
        >
          Yes
        </button>
        <button class="px-4 py-2 bg-primary-forest" @click="emit('close')">
          No
        </button>
      </div>
    </div>
  </div>
</template>
