<script setup="ts">
const props = defineProps({
  type: String,
  modelValue: String,
  placeholder: String,
  required: Boolean,
  class: String,
  update: Function,
});
// Emit event to update the parent
const emit = defineEmits(["update:modelValue"]);
// Method to emit the new value when input changes
const onInputChange = (event) => {
  emit("update:modelValue", event.target.value);
};
</script>

<template>
  <input
    :type="props.type"
    :value="props.modelValue"
    :placeholder="props.placeholder"
    :required="props.required"
    class="px-4 py-2 text-xl border-b-2 border-slate-500 focus:outline-none bg-white text-slate-800 w-full"
    @input="onInputChange"
  />
</template>
