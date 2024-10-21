import { defineStore } from "pinia";

export const useAvatarStore = defineStore("avatar", {
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
