<template>
    <div class="relative" ref="menu">
        <BaseIconButton @click="active = !active">
            <span v-if="!user?.avatar" class="bg-slate-200 p-1 rounded-full">
                <User />
            </span>
            <img v-else :src="user?.avatar" />
            <p>
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
                <BaseNavItem to="#" link-class=" text-red-500 font-medium hover:bg-red-100" @click.prevent="logout">
                    <LogOut />
                    <span>
                        Logout
                    </span>
                </BaseNavItem>

            </ul>
        </div>

    </div>
</template>
<script lang="ts" setup>
import { onClickOutside } from '@vueuse/core';
import { ChevronDown, LogOut, User } from 'lucide-vue-next';
import { useAuthStore } from '~/store/auth';

const auth = useAuthStore()
const user = computed(() => auth.user)
const router = useRouter()
const active = ref(false);
const target = useTemplateRef('menu')
const logout = () => {
    auth.logout()

    router.push('/')
}

onClickOutside(target, () => {
    active.value = false
})
</script>