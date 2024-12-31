<template>
    <li>
        <slot name="nav-item">
            <nuxt-link :to class="nav-item" :class="[linkClass]">
                <slot />
            </nuxt-link>
        </slot>
    </li>
</template>
<script lang="ts" setup>
withDefaults(defineProps<{
    to: string;
    tag?: string,
    linkClass?: string;
}>(), {
    tag: 'nuxt-link'
})

defineEmits(['click'])

</script>