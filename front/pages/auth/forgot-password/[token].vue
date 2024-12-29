<template>
    <form @submit.prevent="sendVerification">
        <div class="space-y-5">
            <div class="flex items-start mb-20">
                <nuxt-link to="/">
                    <BaseButton class="border-0">
                        <MoveLeft />
                    </BaseButton>
                </nuxt-link>
                <span class="mr-4 border-l border-2 h-16"></span>
                <div class="">
                    <BlocksContext>Recovery</BlocksContext>
                    <BlocksTitle>Reset Password</BlocksTitle>
                    <p class="mt-3 text-slate-700">Choose a new password to regain access to your account.
                    </p>
                </div>
            </div>
            <FormInput v-model="user.password" required type="password" label="Password"></FormInput>
            <FormInput v-model="user.password_confirmation" required type="password" label="Confirm password"></FormInput>
            <BaseButton class="w-full bg-color-c border-color-c">
                <span>Reset Password</span>
            </BaseButton>

        </div>
    </form>
</template>
<script lang="ts" setup>
import { MoveLeft } from 'lucide-vue-next';
definePageMeta({
    layout: "auth"
})

const user = ref({
    password: "",
    password_confirmation: "",
})

const sendVerification = () => { }
</script>