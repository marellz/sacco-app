<template>
    <label>
        <input type="checkbox" :value :required :disabled :name v-model="model">

        <div>
            <slot>
                <span v-if="label">
                    {{ label }}
                </span>
            </slot>
        </div>
    </label>
</template>
<script setup lang="ts">
import { watch } from 'vue';

const props = defineProps<{
    label?: string;
    name?: string;
    value?: any;
    required?: boolean;
    disabled?: boolean;
}>();

const emit = defineEmits(['change'])

const model = defineModel()

watch(model, (v) => {
    emit('change', v)
})
</script>
