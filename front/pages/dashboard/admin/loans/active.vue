<template>
    <LayoutsContainer>
        <DashHeader title="Active loans"></DashHeader>
        <DashContent>
            {{ applications }}
        </DashContent>
    </LayoutsContainer>
</template>
<script lang="ts" setup>

const applications = ref([])
</script>