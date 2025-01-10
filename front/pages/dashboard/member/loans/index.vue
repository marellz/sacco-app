<template>
    <LayoutsContainer>
        <DashHeader title="Loans"></DashHeader>
        <DashContent class="space-y-10">
            <div class="grid grid-cols-3 gap-10">
                <DashCard class="col-span-2">
                    <DashCardTitle>Outstanding Balance</DashCardTitle>
                    <h1 class="font-medium mt-5">
                        Ksh.
                        <span class="text-[60px] font-bold">{{ totalAmount.toLocaleString() }}</span>
                    </h1>
                    <div class="flex space-x-3 mt-6">
                        <BaseButton v-if="totalAmount > 0">
                            <span>Make payment</span>
                        </BaseButton>
                        <BaseButton>
                            <span>Apply for a loan</span>
                        </BaseButton>
                    </div>
                    <!--
                        <div class="mt-5 border-t pt-5">
                            <p class="font-medium">Current loans</p>
                            <div class="flex gap-4 mt-5">
                                <div v-for="loan in loans" class="rounded-xl bg-black text-white p-4">
                                    <p class="font-medium">
                                        {{ loan.name }}
                                    </p>
                                    <h1 class="mt-4">
                                        <span class="text-sm">Ksh.</span>
                                        <span class="text-4xl font-bold">
                                            {{ loan.amount_due.toLocaleString() }}
                                        </span>
                                    </h1>
                                </div>
                            </div>
                        </div>
                    -->
                </DashCard>
                <DashCard>
                    <DashCardTitle>Loan Analytics</DashCardTitle>
                </DashCard>
            </div>
            <div class="p-7 bg-black text-white rounded-2xl flex-auto px-10">
                <div class="flex items-center mb-8 space-x-4">
                    <h1 class="text-3xl">Loan accounts</h1>
                </div>
                <div class="flex">
                    <div class="px-10 first:pl-0 border-l-2 first:border-l-0" v-for="loan in loans">
                        <h1 class="">
                            Ksh.
                            <span class="text-[60px] font-bold">
                                {{ loan.amount_due.toLocaleString() }}
                            </span>
                        </h1>
                        <p class="text-slate-400">{{ loan.name }} account</p>
                    </div>
                </div>
            </div>
            <DashTransactionTable title="Loan repayments" :headers="loanTableHeaders" :items="loanRepayments">
            </DashTransactionTable>
        </DashContent>
    </LayoutsContainer>
</template>
<script lang="ts" setup>
const loans = ref([
    {
        name: "Shamba shape-up",
        amount: 50000,
        rate: 0.05,
        interest_accrued: 7500,
        paid: 20000,
        amount_due: 37500,
    },
    {
        name: "Car loan",
        amount: 30000,
        rate: 0.05,
        interest_accrued: 4500,
        paid: 10500,
        amount_due: 24000,
    },
])

const loanTableHeaders = [{ label: "Date", key: "date" },
    { label: "Transaction code", key: "code" },
    { label: "Transaction type", key: "type" },
    { label: "Loan", key: "loan" },
    { label: "Amount transacted", key: "amount" },
    { label: "Status", key: "status" },]

const loanRepayments = ref([
    {
        code: "12ASD1231",
        type: "Loan Repayment",
        loan:{
            name:"Shamba shape-up",
        },
        amount: 10000,
        date: '29/12/24',
        status: 'completed'
    },
    {
        code: "12ASD1231",
        type: "Loan repayment",
        loan: {
            name: "Car loan",
        },
        amount: 4400,
        date: '25/12/24',
        status: 'completed'

    },
    {
        code: "12ASD1231",
        type: "Loan repayment",
        loan: {
            name: "Shamba shape-up",
        },
        amount: -4400,
        date: '25/12/24',
        status: 'completed'
    },
])

const totalAmount = computed(() => loans.value.reduce((total, item) => total + item.amount_due, 0))
</script>