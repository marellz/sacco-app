<template>
    <LayoutsContainer>
        <DashHeader title="My transactions"></DashHeader>
        <DashContent>
            <DashTransactionTable :items />
        </DashContent>
    </LayoutsContainer>
</template>
<script lang="ts" setup>
const items = ref([
    {
        code: "12ASD1231",
        type: "Loan Repayment",
        amount: 10000,
        date: '29/12/24',
        status: 'completed'
    },
    {
        code: "12ASD1231",
        type: "Savings deposit",
        amount: 4400,
        date: '25/12/24',
        status: 'completed'

    },
    {
        code: "12ASD1231",
        type: "Savings withdrawal",
        amount: -4400,
        date: '25/12/24',
        status: 'failed'
    },
])
</script>