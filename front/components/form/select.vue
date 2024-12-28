<template>
    <div>
        <form-label v-if="label" :for="id">
           {{ label }}
            <span v-if="required">&ast;</span>
       </form-label>
       <div>
           <select v-model="model" :id :disabled :required ref="input">
           <option :value="null" :disabled="required">{{ placeholder }}</option>
           <slot></slot>
        </select>
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
    placeholder?: string;
    disabled?: boolean
    required?: boolean
}>(), {
    type: 'text',
    placeholder: 'Select option',
})

const id = useCustomId();

const model = defineModel<string|null|undefined>({ required: true, default: null });

const input = ref<HTMLInputElement | null>(null);

onMounted(() => {
    if (input.value?.hasAttribute('autofocus')) {
        input.value?.focus();
    }
});

defineExpose({ focus: () => input.value?.focus() });
</script>


