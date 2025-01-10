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
                    <BlocksContext>Forgot password</BlocksContext>
                    <BlocksTitle>Trouble Logging In?</BlocksTitle>
                    <p class="mt-3 text-slate-700">Enter your email to receive instructions on resetting your password.
                    </p>
                </div>
            </div>
            <FormInput v-model="user.email" required type="email" label="Email address"></FormInput>
            <BaseButton class="w-full bg-color-c border-color-c">
                <span>Send verification email</span>
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
    email: "",
})

const sendVerification = () => { }
</script>