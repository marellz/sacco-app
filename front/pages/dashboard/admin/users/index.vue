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

                    <div v-if="store.queried" class="flex space-x-2 items-center">
                        <h1 class="text-2xl">
                            Search results for '{{ store.queried }}'
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
                                <div class="flex space-x-2 items-center">
                                    <span v-for="(role, index) in row.roles" :key="index"
                                        class="bg-slate-100 px-2 py-1 rounded-full">
                                        {{ role }}
                                    </span>
                                </div>
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
                            <template #actions="{ row }">
                                <div class="flex space-x-2">
                                    <BaseIconButton @click="editUserRole(row._id)">
                                        <SquarePen />
                                        <span>Edit roles</span>
                                    </BaseIconButton>
                                </div>
                            </template>
                        </CustomTable>
                    </template>

                </div>
            </div>
        </DashContent>
        <CustomModal v-model:show="showEditRolesModal" title="Edit roles" @close="editableRoleUserId = null">
            <form v-if="editableRoleUser" @submit.prevent="updateRoles">
                <LazyCustomLoader v-if="store.loadingModal" />
                <div v-else-if="error" class="p-4">
                    <p>{{ error }}</p>
                </div>
                <div class="py-2 px-4 space-y-4">
                    <div v-for="role in allRoles" :key="role" class="flex items-start space-x-2 py-4">
                        <input type="checkbox" v-model="editableRoles" :value="role"
                            :name="`roles-${editableRoleUser._id}`" :disabled="(editableRoleUser.roles.length === 1 && editableRoleUser.roles.includes(role)) ||
                                (currentUser.id === editableRoleUser._id && role === ROLE_ADMIN)" :id="`role-${role}`">
                        </input>
                        <label :for="`role-${role}`" class="-mt-2">
                            <div class="flex space-x-4">
                                <div class="flex flex-col space-y-2">
                                    <p class="text-xl font-bold uppercase">
                                        {{ roleDefinitions[role].name }}
                                    </p>
                                    <p class="text-sm text-slate-500">
                                        {{roleDefinitions[role].description}}
                                    </p>

                                </div>

                            </div>

                        </label>
                    </div>
                </div>
                <div class="mt-3">
                    <BaseButton type="submit" class="bg-color-c" :disabled="store.loadingModal">
                        <span>Update roles</span>
                    </BaseButton>
                </div>
            </form>
        </CustomModal>
        <CustomModal v-model:show="showCreateUserModal" title="Create user">
            <form @submit.prevent="createUser">

                <LazyCustomLoader v-if="store.loadingModal" />

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
                        <BaseButton :disabled="store.loadingModal" type="submit" class="bg-color-c">
                            <span>Save user info</span>
                        </BaseButton>
                    </div>
                </div>
            </form>
        </CustomModal>
    </LayoutsContainer>
</template>
<script lang="ts" setup>
import { Check, Phone, Plus, Save, Search, SquarePen, X } from 'lucide-vue-next';
import { ROLE_ADMIN, ROLE_AUDIT, ROLE_MEMBER } from '~/constants/user';
import { useAuthStore } from '~/store/auth';
import { useAdminUserStore } from '~/store/admin/users';
import type { UserRole } from '~/types/user';

definePageMeta({
    middleware: 'is-admin'
})

const store = useAdminUserStore()
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

const allRoles: UserRole[] = [ROLE_ADMIN, ROLE_AUDIT, ROLE_MEMBER];

const query = ref('')

const search = async () => {
    await store.searchUsers(query.value)
}

const clearSearch = () => {
    store.queried = null;
    query.value = '';
    store.fetchUsers()
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
    let created = await store.createUser(newUser.value)
    if (created) {
        showCreateUserModal.value = false
    }
}

const users = computed(() => store.users)
const loading = computed(() => store.loadingUsers)
const error = computed(() => store.error)

const editableRoles = ref<string[]>([])
const showEditRolesModal = ref(false)
const editableRoleUserId = ref<null | string>(null)
const editableRoleUser = computed(() => users.value.find(user => user._id === editableRoleUserId.value))
const editUserRole = (id: string) => {
    showEditRolesModal.value = true
    editableRoleUserId.value = id
    editableRoles.value = editableRoleUser.value?.roles || []
}

const updateRoles = async () => {
    if (editableRoleUserId.value === null) {
        return false
    }

    let updated = await store.updateUserRoles(editableRoleUserId.value, editableRoles.value)

    if (updated) {
        showEditRolesModal.value = false
        editableRoleUserId.value = null
    }
}

const roleDefinitions = ref({
    [ROLE_ADMIN]: {
        name: 'Admin',
        description: 'The administrator role grants full control over the system, including managing members, contributions, loans, and other key operations.'
    },
    [ROLE_AUDIT]: {
        name: 'Audit',
        description: 'The audit role provides access to review and monitor financial transactions and reports, ensuring compliance and transparency in the system.'
    },
    [ROLE_MEMBER]: {
        name: 'Member',
        description: 'The member role allows participation in the SACCO, including saving, borrowing, and engaging in community growth initiatives.'
    }
})

onMounted(() => {
    store.fetchUsers();
});
</script>