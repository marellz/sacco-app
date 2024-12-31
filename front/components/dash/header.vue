<template>
    <header class="py-8">
        <LayoutsContainer class="flex items-center">
            <BlocksTitle>
                {{ title ?? 'Title' }}
            </BlocksTitle>
            <div class="ml-auto flex space-x-3">
                <BaseIconButton type="button">
                    <Bell />
                </BaseIconButton>
                <UserMenu />
            </div>
        </LayoutsContainer>
    </header>
</template>
<script lang="ts" setup>
import { Bell } from 'lucide-vue-next';
defineProps<{
    title: string;
}>()
</script>