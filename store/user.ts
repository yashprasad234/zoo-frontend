import { defineStore } from "pinia";
import jwtDecode from "jwt-decode";

interface DecodedToken {
  exp: number;
}

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
  },
});
