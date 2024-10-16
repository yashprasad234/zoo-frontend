import { defineStore } from "pinia";
import { defaultMenu } from "~/data/menu";

export const useMenuStore = defineStore("menu", {
  state: () => ({ menu: defaultMenu }),
  actions: {
    reset() {
      this.menu = defaultMenu;
    },
  },
});
