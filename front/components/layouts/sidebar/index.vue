<template>
    <nav class="p-20">
        <BlocksContext>Menu</BlocksContext>
        <ul class="flex space-y-1 flex-col mt-4">
            <li v-for="link in links">
                <nuxt-link :to="link.path" class="flex items-center space-x-2 hover:bg-slate-100 p-4 rounded-xl"
                    exact-active-class="!bg-slate-200">
                    <component :is="link.icon" />
                    <span>
                        {{ link.label }}
                    </span>
                </nuxt-link>
            </li>
        </ul>
    </nav>
</template>
<script lang="ts" setup>
import { HandCoins, Home, PiggyBank, WalletCards } from 'lucide-vue-next';
const links = ref([
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
])
</script>