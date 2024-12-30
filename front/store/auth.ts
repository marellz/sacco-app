import { defineStore, acceptHMRUpdate } from "pinia";
import { useToastsStore } from "./toasts";

interface User {
  firstName: string;
  otherNames: string;
  avatar: string;
  id: string;
  email: string;
  activeRole: string;
}

interface LoginPayload {
  email: string;
  password: string;
}
interface LoginResponse {
  error?: string;
  token?: string;
  data?: User;
}

export const useAuthStore = defineStore(
  "auth",
  () => {
    const { $api } = useNuxtApp();
    const toasts = useToastsStore();
    const user = ref<null | User>(null);
    const loading = ref(false);
    const token = ref<string | null>(null);

    const login = async (form: LoginPayload) => {
      try {
        loading.value = true;

        const {
          error,
          data,
          token: _token,
        }: LoginResponse = await $api.post("/auth/login", form);

        if (error) {
          // throw error
          console.error("Error logging in");
          return false;
        }

        if (data && _token) {
          user.value = data;
          token.value = _token;
        } else {
          console.log("no");
        }

        return true;
      } catch (error) {
        console.error(error);
      } finally {
        loading.value = false;
      }
    };
    const logout = async () => {
      user.value = null;
      token.value = null;
    };

    const isAuthenticated = computed(() => user.value !== null);

    watch(token, (value) => {
      $api.defaults.headers.common["Authorization"] = value;
    });

    return {
      user,
      isAuthenticated,
      login,
      logout,
    };
  },
  {
    persist: true,
  }
);

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
