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
  try {
    const res = await useCustomFetch("/forgotpassword", {
      method: "POST",
      // headers: {
      //   "X-Email": formInputs.value.var0,
      // },
      body: formInputs.value.var0,
    });
    message.value = "User found in DB";
  } catch (err: any) {
    console.log(err.response);
    message.value = err.response.message;
  }
};

const handler = async (e) => {
  e.preventDefault();
  await fetchForgetPassword();
  toast.add({ title: message.value });
};
</script>

<template>
  <div class="bg-primary-earth h-screen flex justify-center font-serif">
    <div
      class="flex flex-col justify-center items-center w-1/3 gap-4 h-max bg-white py-20 px-6 rounded-xl mt-8"
    >
      <div class="flex flex-col gap-4 w-4/5">
        <h1 class="text-3xl text-slate-800 self-start">Forgot Password</h1>
        <p class="text-lg self-start">
          Please enter your email address to search for your account.
        </p>
      </div>
      <Form
        :handler="handler"
        :inputs="inputs"
        submitBtnText="Search"
        v-model="formInputs"
        class="flex flex-col gap-12 w-full"
        :noBorder="true"
      />
    </div>
  </div>
</template>
