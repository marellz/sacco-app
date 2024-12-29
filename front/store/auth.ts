import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<null|{name: string; email: string}>(null);
  const token = ref<string|null>(null);

  const login = () => {};
  const logout = () => {};

  const isAuthenticated = computed(() => user.value !== null);

  const fakeLogin = async () => {

    user.value = {
        name:"Test User",
        email:"test@example.com",
    }
  }

  return {
    user,
    isAuthenticated,
    fakeLogin,
    login,
    logout,
  };
});
