import type { NewUser } from "~/pages/dashboard/admin/users/index.vue";
import type { User } from "~/types/user";

interface CreateUserResponse {
  error?: string;
  data?: User;
}

interface SearchResponse {
  error?: string;
  data?: Array<User>;
}

export function useUsers() {
  const { $api } = useNuxtApp();
  const users = ref<User[]>([]);
  const error = ref<any>(null);
  const loading = ref(false);
  const queried = ref<string | null>(null);

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
  };
}
