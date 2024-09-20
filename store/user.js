// stores/counter.js
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({ isLoading: false, user: null }),
  actions: {
    loading() {
      this.isLoading = true;
    },
    notFound() {
      this.isLoading = false;
      this.user = null;
    },
  },
});
