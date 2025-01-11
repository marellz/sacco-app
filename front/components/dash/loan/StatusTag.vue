<template>
    <div class="tag" :class="themes[variant]">
        <slot />
    </div>
</template>
<script lang="ts" setup>
import type { LoanApplicationStatus } from '~/store/loans';

defineProps<{
    variant: LoanApplicationStatus
}>()

type Themes = {
    [key in LoanApplicationStatus] : string
}

const themes : Themes = {
    "draft": "bg-slate-100 text-slate-600",
    "pending": "bg-saffron/10 text-saffron",
    "approved": "bg-mantis/10 text-mantis",
    "rejected": "bg-red-100 text-red-500",
    "disbursed": "bg-russian-violet/10 text-russian-violet",
    "repaid": "bg-viridian/10 text-viridian",
    "withdrawn": "bg-chocolate-cosmos/20 text-chocolate-cosmos",
}
</script>