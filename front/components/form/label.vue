<template>
    <label :for>
        <span v-if="value">{{ value }}</span>
        <span v-else><slot></slot></span>
    </label>
</template>

<script setup lang="ts">
defineProps<{
    value?: string;
    for?: string | undefined
}>();
</script>

