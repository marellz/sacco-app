<template>
    <div class="h-screen flex flex-col">
        <main class="flex-auto flex p-4 gap-10">
            <LayoutsSidebar />
            <div class="flex-auto">
                <slot />
            </div>
        </main>
        <LayoutsFooter/>
    </div>
</template>
<script lang="ts" setup>
</script>