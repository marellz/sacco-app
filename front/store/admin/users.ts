import { defineStore, acceptHMRUpdate } from "pinia";
import type { OtherUser, UserRole } from "~/types/user";
import { useToastsStore } from "~/store/toasts";
import type { NewUser } from "~/pages/dashboard/admin/users/index.vue";

interface CreateUserResponse {
  error?: string;
  data?: OtherUser;
}

interface SearchResponse {
  error?: string;
  data?: Array<OtherUser>;
}

interface UpdateUserRoleResponse {
  error?: string;
  data?: UserRole[];
}

export const useAdminUserStore = defineStore(
  "users",
  () => {
    const { $api } = useNuxtApp();
    const users = ref<OtherUser[]>([]);
    const error = ref<any>(null);
    const loading = ref(false);
    const queried = ref<string | null>(null);
    const toasts = useToastsStore();

    const fetchUsers = async () => {
      loading.value = true;
      queried.value = null;
      try {
        const response = await $api.get("/admin/users");
        users.value = response.data;
      } catch (err) {
        error.value = err;
      } finally {
        loading.value = false;
      }
    };

    const createUser = async (user: NewUser) => {
      error.value = null;
      loading.value = true;
      try {
        const { firstName, otherNames, email, phone, roles } = user;

        let _user = {
          firstName,
          otherNames,
          email,
          roles,
          phoneNumbers: [phone],
        };

        const response: CreateUserResponse = await $api.post(
          "/admin/users",
          _user
        );

        if (response.error) {
          error.value = error;
          return false;
        }

        if (response.data) {
          users.value = [...users.value, response.data];
          return true;
        }

        // todo: toast
      } catch (err: any) {
        console.error(err);
        error.value = "Error occurred when creating user\n: " + err;
      } finally {
        loading.value = false;
      }
    };

    const searchUsers = async (query: string) => {
      error.value = null;
      loading.value = true;
      try {
        const response: SearchResponse = await $api.get("/admin/users", {
          params: {
            query,
          },
        });
        if (response.error) {
          error.value = error;
          console.error(error);
        }

        if (response.data) {
          users.value = response.data;
          queried.value = query;
          return true;
        }
        return false;
      } catch (err: any) {
        console.error(err);
        error.value = err;
      } finally {
        loading.value = false;
      }
    };

    const getUser = async () => {};
    const updateUser = async () => {};

    const updateUserRoles = async (id: string, payload: string[]) => {
      error.value = null;
      loading.value = true;

      try {
        const { error: err, data: roles }: UpdateUserRoleResponse =
          await $api.put(`/admin/users/${id}/roles`, {
            roles: payload,
          });

        if (err) {
          error.value = err;
          console.error(err);
        }

        if (roles) {
          let i = users.value.findIndex((u) => u._id === id);
          let _user = users.value[i];

          if (_user) {
            users.value[i].roles = roles;
            toasts.addSuccess("Updated", "User roles updated successfully");
          }

          return true;
        }

        return false;
      } catch (err: any) {
        console.error(err);
        error.value = err;
      } finally {
        loading.value = false;
      }
    };

    watch(error, (val) => {
      toasts.addError("Users error", val);
    });

    return {
      users,
      error,
      loading,
      queried,
      getUser,
      createUser,
      updateUser,
      fetchUsers,
      searchUsers,
      updateUserRoles,
    };
  },
  {
    persist: true,
  }
);

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAdminUserStore, import.meta.hot));
}
