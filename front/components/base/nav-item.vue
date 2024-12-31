<template>
    <li>
        <component :is="tag" :to :class="[linkClass]"
            @click="$emit('click')"
            class="flex p-3 hover:bg-slate-100 whitespace-nowrap space-x-2 rounded-xl">
            <slot />
        </component>
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