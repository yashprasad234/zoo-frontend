import { defineStore } from "pinia";

export const useMobileMenuStore = defineStore("mobileMenu", {
  state: () => ({
    isOpen: false,
  }),
  actions: {
    open() {
      this.isOpen = true;
    },
    close() {
      this.isOpen = false;
    },
  },
});
