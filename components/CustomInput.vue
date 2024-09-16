<script setup>
const props = defineProps({
  type: String,
  value: String,
  placeholder: String,
  required: Boolean,
  class: String,
  update: Function,
});

// Emit event to update the parent
const emit = defineEmits(["update:value"]);

// Method to emit the new value when input changes
const onInputChange = (event) => {
  emit("update:value", event.target.value);
};
</script>

<template>
  <input
    :type="props.type"
    :value="props.value"
    :placeholder="props.placeholder"
    :required="props.required"
    :class="props.class"
    @input="onInputChange"
  />
</template>
