<template>
    <div class="relative" ref="menu">
        <BaseIconButton class="border" @click="active = !active">
            <span v-if="!user?.avatar" class="bg-slate-200 h-8 w-8 rounded-full">
                <User />
            </span>
            <img v-else :src="user?.avatar" class="h-8 w-8 rounded-full" />
            <p class="font-medium">
                {{ user?.firstName }}
            </p>
            <ChevronDown />
        </BaseIconButton>
        <div :class="{ '!visible !translate-y-2': active }"
            class="absolute invisible transform translate-y-0 transition-all duration-100 ease-linear overflow-hidden top-full border bg-white rounded-xl shadow-sm min-w-full right-0 z-10 p-2">
            <ul>
                <BaseNavItem to="/user/profile">
                    <User />
                    <span>View profile</span>
                </BaseNavItem>
                <BaseNavItem to="#" v-for="role in otherRoles" :key="role">
                    <template #nav-item>
                        <a href="#" class="nav-item" @click.prevent="switchRole(role)">
                            <UserCog />
                            <span>
                                Switch to {{ role }}
                            </span>
                        </a>
                    </template>
                </BaseNavItem>
                <BaseNavItem to="#">
                    <template #nav-item>
                        <a href="#" class="nav-item text-red-500 font-medium hover:bg-red-100" @click.prevent="logout">
                            <LogOut />
                            <span>
                                Logout
                            </span>
                        </a>
                    </template>
                </BaseNavItem>
            </ul>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { onClickOutside } from '@vueuse/core';
import { ChevronDown, LogOut, User, UserCog } from 'lucide-vue-next';
import { useAuthStore } from '~/store/auth';
import type { UserRole } from '~/types/user';

const auth = useAuthStore()
const user = computed(() => auth.user!!)
const router = useRouter()
const route = useRoute()
const active = ref(false);
const target = useTemplateRef('menu')
const logout = () => {
    auth.logout()
    router.push('/')
}

const otherRoles = computed(() => user.value?.roles.filter(role => role !== user.value.activeRole))

const switchRole = async (role: UserRole) => {
    await auth.switchRole(role)
    const newRole = user.value.activeRole
    if (route.path.includes('/dashboard'))
        router.push(`/dashboard/${newRole}/`)
}

watch(() => useRoute().path, () => {
    active.value = false
})

onClickOutside(target, () => {
    active.value = false
})
</script>