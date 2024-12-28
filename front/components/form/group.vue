<template>
<div>
    <form-label v-if="label">
        {{ label }}
    </form-label>
    <div>
        <slot />
    </div>
</div>
</template>
<script lang="ts" setup>
defineProps<{
    label?: string | undefined
}>()
</script>