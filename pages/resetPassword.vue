<script setup>
const inputs = [
  {
    type: "text",
    placeholder: "Enter Old Password",
    required: true,
  },
  {
    type: "text",
    placeholder: "Enter New Password",
    required: true,
  },
  {
    type: "text",
    placeholder: "Confirm New Password",
    required: true,
  },
];

const formInputs = ref({
  var0: "",
  var1: "",
  var2: "",
});

const handler = async (e) => {
  e.preventDefault();
  await useCustomFetch("/animal/create", {
    method: "POST",
    body: JSON.stringify({
      oldPassword: formInputs.value.var0,
      newPassword: formInputs.value.var1,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("user-token")}`,
    },
  });
  formInputs.value = {
    var0: "",
    var1: "",
    var2: "",
    var3: "",
  };
};
</script>
<template>
  <div class="flex justify-center">
    <Form
      :handler="handler"
      :inputs="inputs"
      formName="Reset Password"
      submitBtnText="Submit"
      v-model="formInputs"
    />
  </div>
</template>
