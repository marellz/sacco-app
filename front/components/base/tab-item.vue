<template>
    <li>
        <button type="button" class="py-2 px-3 min-w-[60px] rounded-full hover:bg-slate-200"
            :class="{ '!bg-black !text-white': active }">
            <slot />
        </button>
    </li>
</template>
<script lang="ts" setup>
defineProps<{
    active?: boolean;
}>()
</script>