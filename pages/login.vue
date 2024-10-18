<script setup lang="ts">
import { useUserStore } from "~/store/user";
import { userMenu } from "~/data/menu";
import { useMenuStore } from "~/store/menu";
import type { UserLoginDetails } from "~/types/user";

const inputs = [
  {
    type: "email",
    placeholder: "Enter your email",
    required: true,
  },
  {
    type: "password",
    placeholder: "Enter your password",
    required: true,
  },
];

const formInputs = ref({
  var0: "",
  var1: "",
});

const toast = useToast();
const message = ref("");
const menuState = useMenuStore();
const userToken = useCookie("user-token", {
  maxAge: 3600,
  httpOnly: false,
  secure: true,
  sameSite: true,
});

const userState = useUserStore();

async function fetchData() {
  useCustomFetch("/login", {
    method: "POST",
    body: {
      username: formInputs.value.var0,
      password: formInputs.value.var1,
    },
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      const data = res as UserLoginDetails;
      userToken.value = data.token;
      userState.$patch({ isLoading: false, user: data.userDetails });
      let menu = userMenu;
      menuState.$patch({ menu });
      message.value = "Logged in!";
      navigateTo(`/dashboard`);
    })
    .catch((err) => {
      console.log(err.response);
    });
}

async function handler(e: Event) {
  e.preventDefault();
  await fetchData();
  formInputs.value.var0 = "";
  formInputs.value.var1 = "";
  toast.add({ title: message.value });
}
</script>

<template>
  <div
    class="bg-primary-earth h-screen flex justify-center font-serif text-off-white items-center"
    v-if="userState?.user.role == ''"
  >
    <div
      class="flex flex-col justify-center items-center lg:w-1/3 gap-8 h-min bg-white rounded-xl px-4 py-8"
    >
      <Form
        @submitForm="handler"
        :inputs="inputs"
        formName="Login"
        submitBtnText="Login"
        v-model="formInputs"
        gap="gap-8"
        :noBorder="true"
      />
      <div class="flex flex-col gap-4 items-center">
        <p
          type="submit"
          class="text-md text-black underline cursor pointer"
          @click="navigateTo('/forgotPassword')"
        >
          Forgot Password?
        </p>
        <p class="text-xl text-slate-800">
          Don't have an account?
          <span
            @click="navigateTo('/signup')"
            class="text-primary-forest hover:underline cursor-pointer"
            >Signup</span
          >
        </p>
      </div>
    </div>
  </div>
</template>
