<template>
    <li>
        <nuxt-link :to :class="[linkClass]" class="flex p-3 hover:bg-slate-100 whitespace-nowrap space-x-2 rounded-xl">
            <slot />
        </nuxt-link>
    </li>
</template>
<script lang="ts" setup>
defineProps<{
    to: string;
    linkClass?: string;
}>()

</script>