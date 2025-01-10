<template>
    <LayoutsContainer>
        <DashHeader title="Loans"></DashHeader>
        <DashContent>
            {{ loans }}
        </DashContent>
    </LayoutsContainer>
</template>
<script lang="ts" setup>

const loans = ref([])
</script>