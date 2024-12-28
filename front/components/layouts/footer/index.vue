<template>
    <footer class="py-3 bg-gray-100">
        <LayoutsContainer>
            <p class="font-medium text-gray-600">{{ year }}. All Rights Reserved.</p>
        </LayoutsContainer>
    </footer>
</template>
<script lang="ts" setup>
const year = computed(() => {
    let d = new Date()
    return d.getFullYear()
})
</script>