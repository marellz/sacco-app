<template>
    <div class="h-screen flex flex-col">
        <HomeHeader />
        <main class="flex-auto">
            <slot />
        </main>
        <HomeFooter />
    </div>
</template>
<script lang="ts" setup>
</script>