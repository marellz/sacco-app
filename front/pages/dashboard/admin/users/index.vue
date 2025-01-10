<template>
    <LayoutsContainer>
        <DashHeader title="Users"></DashHeader>
        <DashContent>
            <div class="space-y-10">
                <template v-if="error">
                    <ErrorContainer :error />
                </template>

                <div v-else class="space-y-10">
                    <div class="flex">
                        <form @submit.prevent="search">
                            <div class="flex space-x-2">
                                <form-input placeholder="Search" v-model="query" />
                                <BaseIconButton type="submit">
                                    <Search />
                                </BaseIconButton>
                            </div>
                        </form>

                        <div class="ml-auto flex">
                            <BaseButton class="space-x-2 items-center" @click="showCreateUserModal = true">
                                <span>Add a new user</span>
                                <Plus :size="24" />
                            </BaseButton>
                        </div>

                    </div>

                    <div v-if="queried" class="flex space-x-2 items-center">
                        <h1 class="text-2xl">
                            Search results for '{{ queried }}'
                        </h1>
                        <BaseIconButton @click="clearSearch">
                            <X />
                            <span>Clear results</span>
                        </BaseIconButton>
                    </div>

                    <div v-if="loading" class="py-10">
                        <CustomLoader />
                    </div>

                    <template v-else>
                        <CustomTable :headers :items="users">
                            <template #user="{ row }">
                                <div class="flex items-center space-x-2">
                                    <img class="h-10 w-10 rounded-full border" :src="row.avatar" alt="">
                                    <div class="space-y-1">
                                        <p class="text-lg font-medium">{{ [row.otherNames, row.firstName].join(', ') }}
                                        </p>
                                        <p class="text-slate-500">{{ row.email }}</p>
                                    </div>
                                </div>
                            </template>
                            <template #roles="{ row }">
                                <form @submit.prevent="updateRoles(row._id, row.roles)">
                                    <BaseIconButton @click="toggleRoles(row._id)">
                                        <span>Edit roles</span>
                                        <ChevronDown class="transform rotate-0"
                                            :class="{ 'rotate-180': editRolesActive === row._id }" />
                                    </BaseIconButton>
                                    <template v-if="editRolesActive === row._id">
                                        <div class="py-2 px-4">
                                            <div v-for="role in allRoles" :key="role" class="flex space-x-2">
                                                <input type="checkbox" v-model="row.roles" :value="role"
                                                    :name="`roles-${row._id}`" :disabled="(row.roles.length === 1 && row.roles.includes(role)) ||
                                                        (currentUser.id === row._id && role === ROLE_ADMIN)"
                                                    :id="`role-${role}`">
                                                </input>
                                                <label :for="`role-${role}`">
                                                    {{ role }}
                                                </label>
                                            </div>
                                        </div>
                                        <div class="mt-3">
                                            <BaseIconButton type="submit" class="bg-color-c">
                                                <span>Update</span>
                                                <Save />
                                            </BaseIconButton>
                                        </div>
                                    </template>
                                </form>
                            </template>
                            <template #phoneNumbers="{ row }">
                                <div class="flex items-start space-x-3">
                                    <div class="py-3">
                                        <Phone :size="16" />
                                    </div>
                                    <template v-if="row.phoneNumbers.length">
                                        <div class="p-2">
                                            <a v-for="(phone, index) in row.phoneNumbers" :key="index"
                                                :href="`tel:${phone}`" class="block ">
                                                {{ phone }}
                                            </a>
                                        </div>
                                    </template>
                                    <template v-else>
                                        <p class="text-slate-500 py-2">No phone</p>
                                    </template>
                                </div>
                            </template>
                        </CustomTable>
                    </template>

                </div>
            </div>
        </DashContent>
        <CustomModal v-model:show="showCreateUserModal" title="Create user">
            <form @submit.prevent="createUser">
                <div class="space-y-4">
                    <form-input required label="First name" v-model="newUser.firstName"></form-input>
                    <form-input required label="Other names" v-model="newUser.otherNames"></form-input>
                    <form-input required label="Email address" v-model="newUser.email"></form-input>
                    <form-input required label="Phone number" v-model="newUser.phone"></form-input>
                    <form-group label="Roles">
                        <div class="flex flex-wrap gap-8 form-input">
                            <form-checkbox v-for="role in allRoles" v-model="newUser.roles" :value="role" :key="role"
                                name="new-user-roles" :required="newUser.roles.length === 0">
                                {{ role }}
                            </form-checkbox>
                        </div>
                    </form-group>
                    <div class="flex justify-end">
                        <BaseButton>
                            <span>Save user info</span>
                        </BaseButton>
                    </div>
                </div>
            </form>
        </CustomModal>
    </LayoutsContainer>
</template>
<script lang="ts" setup>
import { useUsers } from '~/composables/admin/useUsers';
import { ChevronDown, Phone, Plus, Save, Search, X } from 'lucide-vue-next';
import { ROLE_ADMIN, ROLE_AUDIT, ROLE_MEMBER } from '~/constants/user';
import type { UserRole } from '~/types/user';
import { useAuthStore } from '~/store/auth';
definePageMeta({
    middleware: 'is-admin'
})
const { users, error, loading, queried, fetchUsers: _fetch, searchUsers: _search, createUser: _create } = useUsers();
const currentUser = computed(() => useAuthStore().user!!)
const headers = [

    {
        key: "user",
        label: "User",
    },
    {
        key: "roles",
        label: "Roles",
    },
    {
        key: "phoneNumbers",
        label: "PhoneNumbers",
    },
    {
        key: "actions",
        label: "Actions",
    },
]

const editRolesActive = ref<null | string>(null)

const toggleRoles = (id: string) => {
    editRolesActive.value = editRolesActive.value === id ? null : id;
}

const updateRoles = (id: string, roles: UserRole[]) => {
    console.log('changed roles', roles)
}

const allRoles = [ROLE_ADMIN, ROLE_AUDIT, ROLE_MEMBER];

const query = ref('')

const search = async () => {
    await _search(query.value)
}

const clearSearch = () => {
    queried.value = null;
    query.value = '';
    _fetch()
}

export interface NewUser {
    firstName?: string;
    otherNames?: string;
    email?: string;
    phone?: string;
    roles: UserRole[]
}

const newUser = ref<NewUser>({
    firstName: '',
    otherNames: '',
    email: '',
    phone: '',
    roles: [],
})

const showCreateUserModal = ref(false)

const createUser = async () => {
    let created = await _create(newUser.value)
    if (created) {
        showCreateUserModal.value = false
    }
}
onMounted(() => {
    _fetch();
});
</script>