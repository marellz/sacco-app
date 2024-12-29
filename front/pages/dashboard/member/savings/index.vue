<template>
    <LayoutsContainer>
        <DashHeader title="Savings" />
        <DashContent class="space-y-10">
            <div>
                <div class="grid grid-cols-2 gap-x-10">
                    <DashCard class="space-y-4">
                        <DashCardTitle>Total Savings</DashCardTitle>
                        <h1 class="font-medium">
                            Ksh.
                            <span class="text-[60px] font-bold">{{ totalAmount?.toLocaleString() }}</span>
                        </h1>
                        <div class="flex space-x-3">
                            <BaseButton>
                                <span>Withraw</span>
                            </BaseButton>
                            <BaseButton>
                                <span>Deposit</span>
                            </BaseButton>
                            <BaseButton>
                                <span>Get statement</span>
                            </BaseButton>
                        </div>
                    </DashCard>
                    <DashCard>
                        <DashCardTitle>Something else</DashCardTitle>
                    </DashCard>
                </div>
            </div>
            <div class="p-7 bg-black text-white rounded-2xl flex-auto px-10">
                <div class="flex items-center mb-8 space-x-4">
                    <h1 class="text-3xl">My accounts</h1>
                    <BaseIconButton class="bg-slate-100/10 hover:bg-slate-100/30 focus:ring-2 focus:ring-offset-2 focus:bg-slate-100/30">
                        <CirclePlus />
                        <span>Create new account</span>
                    </BaseIconButton>
                </div>
                <div class="flex">
                    <div class="px-10 first:pl-0 border-l-2 first:border-l-0" v-for="account in accounts">
                        <h1 class="">
                            Ksh.
                            <span class="text-[60px] font-bold">
                                {{ account.balance.toLocaleString() }}
                            </span>
                        </h1>
                        <p class="text-slate-400">{{ account.label }} account</p>
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-2 items-start gap-10">
                <DashCard class="bg-slate-100">
                    <div class="flex items-center space-x-3">
                        <DashCardTitle>Recent transactions</DashCardTitle>
                        <BaseIconButton>
                            <MoveLeft />
                        </BaseIconButton>
                        <BaseIconButton>
                            <MoveRight />
                        </BaseIconButton>
                    </div>
                    <ul class="mt-10">
                        <li v-for="i in 10">
                            <DashTransactionItem />
                        </li>
                    </ul>
                </DashCard>
                <DashCard class="bg-slate-100">
                    <div class="flex items-center space-x-3">
                        <DashCardTitle>Analytics</DashCardTitle>
                        <BaseIconButton>
                            <MoveLeft />
                        </BaseIconButton>
                        <BaseIconButton>
                            <MoveRight />
                        </BaseIconButton>
                    </div>
                    <ul class="flex gap-4 mt-10">
                        <li class="flex justify-end flex-col flex-auto" v-for="(item, i) in analytics">
                            <span class="w-full rounded-xl bg-slate-400/25 min-h-[40px] max-h-[200px]"
                                :class="{ 'bg-slate-400': i === (analytics.length - 1) }"
                                :style="{ height: `${Math.floor((200 / max) * item.amount)}px` }">
                            </span>
                            <p class="text-center text-slate-600 font-medium text-sm mt-2">{{ item.month }}</p>
                        </li>
                    </ul>
                </DashCard>
            </div>
            <!-- Blank page -->
        </DashContent>
    </LayoutsContainer>
</template>
<script lang="ts" setup>
import { MoveLeft, MoveRight, CirclePlus } from 'lucide-vue-next'

const accounts = ref([
    {
        name: "farming",
        label: "Farming",
        balance: 12500
    },
    {
        name: "main",
        label: "Default",
        balance: 7500
    },
])

const tab = ref('default')

const analytics = ref([
    {
        month: "Jun",
        amount: 6400
    },
    {
        month: "Jul",
        amount: 9200
    },
    {
        month: "Aug",
        amount: 8800
    },
    {
        month: "Sep",
        amount: 11500
    },
    {
        month: "Oct",
        amount: 14000
    },
    {
        month: "Nov",
        amount: 11000
    },
    {
        month: "Dec",
        amount: 12000
    },
])

const totalAmount = computed(() => accounts.value.reduce((total, item) => total += item.balance, 0))
const max = computed(() => {
    return analytics.value.map((i) => i.amount).reduce((a, b) => Math.max(a, b));
})

const range = computed(() => {
    // let l = analytics.value.reduce((a,b) => Math.max(a,b))
    // let m = analytics.value.reduce((a,b) => Math.min(a,b))

    // return l - m;
})
</script>