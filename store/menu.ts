import { defineStore } from "pinia";

const defaultMenu = new Map();
defaultMenu.set("Home", "/");
defaultMenu.set("About", "/#about");
defaultMenu.set("Contact", "/#contact");

export const useMenuStore = defineStore("menu", {
  state: () => ({ menu: defaultMenu }),
});
