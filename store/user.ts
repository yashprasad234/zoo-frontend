// stores/counter.js
import { defineStore } from "pinia";
import jwtDecode from "jwt-decode";

interface DecodedToken {
  exp: number; // JWT expiry timestamp in seconds
}

export const useUserStore = defineStore("user", {
  state: () => ({ isLoading: false, user: null, token: null }),
  actions: {
    loading() {
      this.isLoading = true;
      this.user = null;
    },
    notFound() {
      this.isLoading = false;
      this.user = null;
    },
    isTokenExpired(token: string): boolean {
      try {
        const decoded: DecodedToken = jwtDecode<DecodedToken>(token);
        const now = Math.floor(Date.now() / 1000);
        return decoded.exp < now;
      } catch (error) {
        console.error("Invalid token:", error);
        return true; // If decoding fails, treat the token as expired
      }
    },
    login(token: string) {
      if (this.isTokenExpired(token)) {
        this.notFound(); // Or another method to handle logout
        // Redirect to login or handle expired session logic
        // For example, use the router to navigate
        // this.$router.push('/login'); (This is an example; use router from context)
      } else {
        localStorage.setItem("user-token", token);
        // Optionally, fetch user data and set it to state
        // this.fetchUser(token); (Implement fetchUser method as needed)
      }
    },
  },
});
