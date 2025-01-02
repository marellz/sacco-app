<template>
    <LayoutsContainer>
        <DashHeader title="Loan view"></DashHeader>
        <DashContent>
            {{ loan }}
        </DashContent>
    </LayoutsContainer>
</template>
<script lang="ts" setup>

const loan = ref({})
</script>