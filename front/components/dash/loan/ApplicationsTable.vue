<template>
    <CustomTable :headers :items="applications">
        <template #purpose="{ row }">
            <div>
                <h1 class="font-medium mb-1">{{ row.purpose }}</h1>
                <p>{{ row.information }}</p>
            </div>
        </template>
        <template #principleAmount="{ row }">
            <p>Ksh. {{ row.principleAmount.toLocaleString() }}</p>
        </template>
        <template #repayment="{ row }">
            <p>Ksh. {{ row.installmentAmount.toLocaleString() }} paid {{ row.repaymentFrequency }}</p>
            <p class="text-sm"> x {{ row.installments }} installments</p>
        </template>
        <template #createdAt="{ row }">
            <p>{{ parseTime(row.createdAt) }}</p>
        </template>
        <template #status="{ row }">
            <DashLoanStatusTag :variant="row.status">{{ row.status }}</DashLoanStatusTag>
        </template>
        <template #actions="{ row }">
            <slot name="actions" :row /> 
        </template>
    </CustomTable>
</template>
<script lang="ts" setup>
import type { LoanApplication } from '~/store/loans';

defineProps<{
    applications: LoanApplication[]
}>()

const headers = [
    { key: "purpose", label: "Purpose" },
    { key: "createdAt", label: "Created" },
    { key: "principleAmount", label: "Principle amount" },
    { key: "repayment", label: "Repayment" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Actions" },
]

const parseTime = (obj: string) => {
    let t = new Date(obj)
    return [t.getDate(), (t.getMonth() + 1), t.getFullYear()].join('-')
}
</script>