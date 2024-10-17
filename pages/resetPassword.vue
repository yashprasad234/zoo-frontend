<script setup lang="ts">
const inputs = [
  {
    type: "password",
    placeholder: "Enter Old Password",
    required: true,
  },
  {
    type: "password",
    placeholder: "Enter New Password",
    required: true,
  },
  {
    type: "password",
    placeholder: "Confirm New Password",
    required: true,
  },
];

const formInputs = ref({
  var0: "",
  var1: "",
  var2: "",
});

const handler = async (e: Event) => {
  e.preventDefault();
  useCustomFetch("/animal/create", {
    method: "POST",
    body: {
      oldPassword: formInputs.value.var0,
      newPassword: formInputs.value.var1,
    },
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    console.log(res);
  });
  formInputs.value = {
    var0: "",
    var1: "",
    var2: "",
  };
};
</script>
<template>
  <div class="bg-primary-earth h-screen flex justify-center items-center">
    <Form
      @submitForm="handler"
      :inputs="inputs"
      formName="Reset Password"
      submitBtnText="Submit"
      v-model="formInputs"
      :noBorder="true"
      gap="gap-6"
    />
  </div>
</template>
