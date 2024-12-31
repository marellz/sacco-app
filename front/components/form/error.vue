<template>
    <p class="text-red-500">
        <slot>
            {{ message }}
        </slot>
    </p>
</template>
<script setup lang="ts">
defineProps<{
    message?: string;
}>();
</script>
