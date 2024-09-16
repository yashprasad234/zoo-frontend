import { reactive } from "vue";

export const userState = reactive({
  isLoading: true,
  user: null,
  setUser(user) {
    this.user = user;
  },
});
