<template>
    <LayoutsContainer>
        <DashHeader title="Administrator"></DashHeader>
    </LayoutsContainer>
</template>
<script lang="ts" setup>

definePageMeta({
    middleware: "is-admin"
})
</script>