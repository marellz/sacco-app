<template>
    <div class="border rounded-xl p-10">
        <div class="flex items-center justify-center gap-10">
            <img class="max-w-xs" src="@/assets/images/undraw_fixing-bugs.svg" alt="" />
            <div>
                <h1 class="text-3xl font-medium">An error occurred.</h1>
                <p class="text-lg">{{ error }}</p>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
defineProps<{
    error: string;
}>()
</script>