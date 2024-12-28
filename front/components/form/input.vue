<template>
    <div>
        <form-label v-if="label" :for="id">
            {{ label }}
            <span v-if="required">&ast;</span>
        </form-label>
        <div>
            <input v-model="model" :type :id :placeholder :disabled :required ref="input">
        </div>
        <form-error v-if="error">{{ error }}</form-error>
    </div>
</template>
<script setup lang="ts">
import useCustomId from '@/composables/useCustomId';
import { onMounted, ref } from 'vue';

withDefaults(defineProps<{
    label?: string | undefined;
    error?: string | undefined;
    type?: string | undefined;
    placeholder?: string | undefined;
    disabled?: boolean;
    required?: boolean;
}>(), {
    type: 'text'
})

const id = useCustomId();

const model = defineModel<string | null | undefined>({ required: true });

const input = ref<HTMLInputElement | null>(null);

onMounted(() => {
    if (input.value?.hasAttribute('autofocus')) {
        input.value?.focus();
    }
});

defineExpose({ focus: () => input.value?.focus() });
</script>
