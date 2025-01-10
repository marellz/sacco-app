<template>
    <div class="h-screen flex flex-col">
        <main class="flex-auto flex p-4 gap-10 overflow-hidden">
            <LayoutsSidebar />
            <div class="flex-auto overflow-auto h-ful">
                <slot />
            </div>
        </main>
    </div>
    <ToastWrapper />
</template>
<script lang="ts" setup>
</script>