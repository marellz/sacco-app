<template>
    <LayoutsContainer>
        <DashHeader title="Savings"></DashHeader>
        <DashContent>
            {{ savings }}
        </DashContent>
    </LayoutsContainer>
</template>
<script lang="ts" setup>

const savings = ref([])
</script>