import { defineStore, acceptHMRUpdate } from "pinia";
import { useToastsStore } from "./toasts";
import type { User, UserRole } from "@/types/user";
import { useLoansStore } from "./loans";

interface LoginPayload {
  email: string;
  password: string;
}
interface LoginResponse {
  error?: string;
  token?: string;
  data?: User;
}

interface UpdateResponse {
  error?: string;
  data?: User;
}

interface SwitchRoleResponse {
  activeRole?: UserRole;
  error?: string;
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

      toasts.add({
        variant: "success",
        title: "Logout",
        description: "Successfully logged out!",
      });
    };

    const update = async (form: User) => {
      try {
        loading.value = true;
        const response: UpdateResponse = await $api.put("/user/profile", form);

        if (response.error) {
          console.error("Error updating user", response.error);

          toasts.add({
            variant: "error",
            title: "Error",
            description: response.error,
          });
        }

        if (response.data) {
          user.value = response.data;
           toasts.add({
             variant: "success",
             title: "Update profile",
             description: "Successfully updated your profile",
           });
          return true;
        }

        return false;
      } catch (error) {
        console.error("Error updating user", error);
      } finally {
        loading.value = false;
      }
    };

    const switchRole = async (role: UserRole) => {
      const { activeRole, error }: SwitchRoleResponse = await $api.put(
        "/user/switch",
        {
          role,
        }
      );

      if (error) {
        console.error("Error switching role", error);
      }

      if (activeRole) {
        user.value = { ...user.value!!, activeRole };

        resetStores()

        toasts.add({
          variant: "success",
          title: "Switch to " + activeRole,
          description: "Successfully switched role!",
        });
      }
    };

    const resetStores = () => {
      useLoansStore().resetLoanStore()
    }

    //**GETTERS */

    const isAuthenticated = computed(() => user.value !== null);

    //**WATCHER */
    watch(token, (value) => {
      $api.defaults.headers.common["Authorization"] = value;
    });

    watch(isAuthenticated, (v) => {
      if (!v) {
        useRouter().push("/auth/login");
      }
    });
    

    return {
      user,
      token,
      isAuthenticated,
      login,
      logout,

      update,
      switchRole,
    };
  },
  {
    persist: true,
  }
);

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
