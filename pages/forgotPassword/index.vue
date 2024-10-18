<script setup lang="ts">
const toast = useToast();
const message = ref("");

const inputs = [
  {
    type: "email",
    placeholder: "Enter your email",
    required: true,
  },
];

const formInputs = ref({
  var0: "",
});

const fetchForgetPassword = async () => {
  useCustomFetch("/forgotpassword", {
    method: "GET",
    query: {
      email: formInputs.value.var0,
    },
  })
    .then((res) => {
      navigateTo(res as string);
      message.value = "User found in DB";
    })
    .catch((err) => {
      console.log(err.response);
      message.value = err.response.message;
    });
};

const handler = async (e: Event) => {
  e.preventDefault();
  await fetchForgetPassword();
  toast.add({ title: message.value });
};
</script>

<template>
  <div
    class="bg-primary-earth h-screen flex justify-center items-center font-serif"
  >
    <div
      class="flex flex-col justify-center items-center w-1/3 gap-4 h-max p-8"
    >
      <div class="w-full p-4 bg-white">
        <Form
          @submitForm="handler"
          formName="Forgot Password"
          :inputs="inputs"
          submitBtnText="Search"
          v-model="formInputs"
          :noBorder="true"
          gap="gap-6"
        />
      </div>
    </div>
  </div>
</template>
