<template>
    <LayoutsContainer>
        <DashHeader title="Loan applications"></DashHeader>
        <DashContent>
            {{ applications }}
        </DashContent>
    </LayoutsContainer>
</template>
<script lang="ts" setup>

const applications = ref([])
</script>