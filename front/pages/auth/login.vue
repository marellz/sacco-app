<template>
    <form @submit.prevent="login">
        <div class="space-y-5">
            <div class="flex items-start mb-20">
                <nuxt-link to="/">
                    <BaseButton class="border-0">
                        <MoveLeft />
                    </BaseButton>
                </nuxt-link>
                <span class="mr-4 border-l border-2 h-16"></span>
                <div class="">
                    <BlocksContext>Login</BlocksContext>
                    <BlocksTitle>Welcome Back!</BlocksTitle>
                    <p class="mt-3 text-slate-700">Access your account to manage your savings, loans, and transactions
                        with ease.</p>
                </div>
            </div>
            <FormInput v-model="user.email" required label="Email/Phone"></FormInput>
            <FormInput v-model="user.password" required type="password" label="Password"></FormInput>
            <BaseButton class="w-full bg-color-c border-color-c">
                <span>Login</span>
            </BaseButton>
            <div class="space-y-3 flex flex-col">
                <nuxt-link class="hover:underline text-gray-400 hover:text-black" to="/auth/forgot-password">Forgot password?</nuxt-link>
                <nuxt-link class="hover:underline text-gray-400 hover:text-black" to="/auth/register">Don't have an account? Sign up.</nuxt-link>
            </div>
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
    password: "",
})

const login = () => { }
</script>