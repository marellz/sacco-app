<template>
    <div class="inline-flex space-x-2 py-1 px-3 text-sm rounded-full font-medium leading-normal" :class="themes[color]">
        <slot />
    </div>
</template>
<script lang="ts" setup>
defineProps<{
    color: "success" | "error"
}>()

const themes = {
    "success": "bg-green-100 text-green-500",
    "error": "bg-red-100 text-red-500",
}
</script>