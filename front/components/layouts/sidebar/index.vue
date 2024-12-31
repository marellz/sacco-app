<template>
    <nav class="py-20 px-10 w-72">
        <BlocksContext>Menu</BlocksContext>
        <ul v-if="activeLinks.links.length" class="flex space-y-1 flex-col mt-4">
            <li v-for="link in activeLinks.links">
                <nuxt-link :to="link.path" class="flex items-center space-x-2 hover:bg-slate-100 p-4 rounded-xl"
                    exact-active-class="!bg-slate-200">
                    <component :is="link.icon" />
                    <span>
                        {{ link.label }}
                    </span>
                </nuxt-link>
            </li>
        </ul>
        <div v-else class="flex flex-col items-center space-y-4">
            <img class="max-w-48" src="@/assets/images/undraw_warning.svg" />
            <p class="text-sm text-center mt-3">Something is causing the links to not appear</p>
            <BaseIconButton class="bg-color-c/20 hover:bg-color-c" @click="refresh">
                <span>Refresh page</span>
                <RefreshCcw />
            </BaseIconButton>
        </div>
    </nav>
</template>
<script lang="ts" setup>
import { HandCoins, Home, PiggyBank, WalletCards, RefreshCcw, Users } from 'lucide-vue-next';
import { useAuthStore } from '@/store/auth';
const auth = useAuthStore()

interface SidebarLink {
    links: Array<{
        path: string,
        icon: Component,
        label: string;
    }>
}
interface SidebarMenu {
    [role: string]: SidebarLink
}

const links: SidebarMenu = {
    "admin": {
        links: [
            {
                path: "/dashboard/admin/",
                icon: Home,
                label: "Dashboard",
            },
            {
                path: "/dashboard/admin/users",
                icon: Users,
                label: "Users",
            },
            {
                path: "/dashboard/admin/loans",
                icon: HandCoins,
                label: "Loans",
            },
            {
                path: "/dashboard/admin/savings",
                icon: PiggyBank,
                label: "Savings",
            },
        ]
    },
    "member": {
        links: [
            {
                path: "/dashboard/member/",
                icon: Home,
                label: "Dashboard",
            },
            {
                path: "/dashboard/member/savings",
                icon: PiggyBank,
                label: "Savings",
            },
            {
                path: "/dashboard/member/loans",
                icon: HandCoins,
                label: "Loans",
            },
            {
                path: "/dashboard/member/transactions",
                icon: WalletCards,
                label: "Transactions"
            }
        ]
    }
}

const refresh = () => {
    location.reload()
}

const activeLinks = computed(() => auth.user !== null ? links[auth.user.activeRole] : { links: [] });
</script>