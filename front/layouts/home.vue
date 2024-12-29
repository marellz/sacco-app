<template>
    <div class="h-screen flex flex-col">
        <LayoutsHeader />
        <main class="flex-auto">
            <slot />
        </main>
        <LayoutsFooter />
    </div>
</template>
<script lang="ts" setup>
</script>