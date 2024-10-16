import { defineStore } from "pinia";
import type { UserType } from "~/types/user";

export const useUserStore = defineStore("user", {
  state: () => ({
    isLoading: false,
    user: {
      id: 0,
      role: "",
      username: "",
    },
    token: "",
  }),
  actions: {
    loading() {
      this.isLoading = true;
      this.user = {
        id: 0,
        role: "",
        username: "",
      };
    },
    notFound() {
      this.isLoading = false;
      this.user = {
        id: 0,
        role: "",
        username: "",
      };
    },
    setUser(user: UserType) {
      this.isLoading = false;
      this.user = user;
    },
  },
});
