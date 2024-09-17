import { reactive } from "vue";

export const userState = reactive({
  isLoading: true,
  user: null,
  setUserState(isLoading, user) {
    this.isLoading = isLoading;
    this.user = user;
  },
});
