<template>
    <LayoutsContainer>
        <DashHeader title="Loans"></DashHeader>
        <DashContent>
            {{ loans }}
        </DashContent>
    </LayoutsContainer>
</template>
<script lang="ts" setup>
import { useLoansStore } from '~/store/loans';

const store = useLoansStore()
const loans = computed(() => store.applications)
</script>