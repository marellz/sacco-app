<template>
    <nav class="py-20 px-10 w-72">
        <BlocksContext>Menu</BlocksContext>
        <ul v-if="activeLinks.links.length" class="flex space-y-1 flex-col mt-4">
            <li v-for="(link, i) in activeLinks.links" :key="i">
                <template v-if="link.children">
                    <button class="flex items-center space-x-2 hover:bg-slate-100 p-2 rounded-xl w-full"
                        @click="activeSidebarLinkChildren = activeSidebarLinkChildren === i ? null : i">
                        <component :is="link.icon" :stroke-width="1.5" :size="20" />
                        <span>
                            {{ link.label }}
                        </span>
                        <span class="!ml-auto">
                            <Minus v-if="activeSidebarLinkChildren === i" />
                            <Plus v-else />
                        </span>
                    </button>
                    <ul v-show="activeSidebarLinkChildren === i" class="pl-2 my-2 ml-8">
                        <li>
                            <nuxt-link v-for="child in link.children" :to="child.path"
                                class="flex items-center space-x-2 text-slate-500 hover:text-slate-900 hover:border-l-slate-200 p-2 text-sm border-l border-l-slate-100"
                                exact-active-class="!text-slate-900 !border-l-slate-500">
                                <span>
                                    {{ child.label }}
                                </span>
                            </nuxt-link>
                        </li>
                    </ul>
                </template>

                <nuxt-link v-else :to="link.path" class="flex items-center space-x-2 hover:bg-slate-100 p-2 rounded-xl"
                    exact-active-class="!bg-slate-200">
                    <component :is="link.icon" :stroke-width="1.5" :size="20" />
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
import { HandCoins, Home, PiggyBank, WalletCards, RefreshCcw, Users, ChevronDown, Plus, Minus } from 'lucide-vue-next';
import { useAuthStore } from '@/store/auth';
const auth = useAuthStore()

interface SidebarLinkChild {
    path: string;
    label: string;
}

interface SidebarLink {
    links: Array<{
        path?: string,
        icon: Component,
        label: string;
        children?: SidebarLinkChild[]
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
                icon: HandCoins,
                label: "Loans",
                children: [
                    {
                        path: "/dashboard/admin/loans/applications",
                        label: "Applications",
                    },
                    {
                        path: "/dashboard/admin/loans/active",
                        label: "Active",
                    },
                ]
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
                // path: "/dashboard/member/loans",
                icon: HandCoins,
                label: "Loans",
                children: [
                    { label: "Active loans", path: "/dashboard/member/loans" },
                    { label: "Applications", path: "/dashboard/member/loans/applications" },
                ]
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

const activeSidebarLinkChildren = ref<null | number>(null)

const activeLinks = computed(() => auth.user !== null ? links[auth.user.activeRole] : { links: [] });
</script>