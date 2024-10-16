<script setup lang="ts">
const inputs = [
  {
    type: "password",
    placeholder: "Enter New password",
    required: true,
  },
  {
    type: "password",
    placeholder: "Confirm New password",
    required: true,
  },
];

const formInputs = ref({
  var0: "",
  var1: "",
});
const message = ref("");
const route = useRoute();
const toast = useToast();

const updatePassword = async () => {
  try {
    if (formInputs.value.var0 != formInputs.value.var1) {
      throw new Error("Password and Confirm Password Don't Match");
    } else {
      const res = await useCustomFetch("/changePassword", {
        method: "PUT",
        body: {
          password: formInputs.value.var0,
        },
        headers: {
          "Content-Type": "Application/JSON",
          Authorization: `Bearer ${route.query.token}`,
        },
      });
      message.value = "Password changed successfully";
      navigateTo("/login");
    }
  } catch (err: any) {
    console.log(err);
    message.value = err.response.data.message;
  }
};

const handler = async (e: Event) => {
  e.preventDefault();
  await updatePassword();
  formInputs.value.var0 = "";
  formInputs.value.var1 = "";
  toast.add({ title: message.value });
};
</script>
<template>
  <div class="bg-primary-earth h-screen flex justify-center font-serif">
    <div
      class="flex flex-col justify-center items-center w-1/3 gap-6 h-max bg-white py-20 px-6 rounded-xl mt-8"
    >
      <div class="flex flex-col gap-4 w-4/5">
        <h1 class="text-3xl text-slate-800 self-start">Change Password</h1>
        <p class="text-lg self-start">
          Update your password and go to
          <span
            class="text-sky-300 hover:underline cursor-pointer"
            @click="navigateTo('/login')"
            >login</span
          >, to sign in with your new password.
        </p>
      </div>
      <Form
        @submitForm="handler"
        :inputs="inputs"
        submitBtnText="Change Password"
        v-model="formInputs"
        class="flex flex-col gap-12 w-full"
        :noBorder="true"
        gap="gap-6"
      />
    </div>
  </div>
</template>
