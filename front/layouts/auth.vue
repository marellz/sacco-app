<template>
    <div class="h-screen">
        <main>
            <div class="grid grid-cols-2 h-screen">
                <div class="flex items-center -mt-80 justify-center">
                    <img class="max-w-md" src="@/assets/images/undraw_secure-login.svg" alt="">
                </div>
                <div class="bg-gray-100 h-full p-10 pt-20">
                    <div class="max-w-2xl mx-auto">
                        <slot></slot>
                    </div>
                </div>
            </div>
        </main>
    </div>
    <ToastWrapper />
</template>
<script lang="ts" setup>

</script>