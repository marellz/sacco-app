<template>
    <form @submit.prevent="register">
        <div class="space-y-5">
            <div class="flex items-start mb-20">
                <nuxt-link to="/">
                    <BaseButton class="border-0">
                        <MoveLeft />
                    </BaseButton>
                </nuxt-link>
                <span class="mr-4 border-l border-2 h-16"></span>
                <div class="">
                    <BlocksContext>Register</BlocksContext>
                    <BlocksTitle>Become a Member Today!</BlocksTitle>
                    <p class="mt-3 text-slate-700">Join our SACCO and take control of your financial future with a
                        trusted platform.</p>
                </div>
            </div>
            <FormInput v-model="user.name" required label="Name"></FormInput>
            <FormInput v-model="user.email" required label="Email"></FormInput>
            <FormInput v-model="user.phone" required label="Phone"></FormInput>
            <FormInput v-model="user.password" required type="password" label="Password"></FormInput>
            <BaseButton class="w-full bg-color-c border-color-c">
                <span>Create account</span>
            </BaseButton>
            <div>
                <nuxt-link class="hover:underline text-gray-400 hover:text-black" to="/auth/login">Already have an
                    account? Login.</nuxt-link>
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
    name: "",
    email: "",
    phone: "",
    password: "",
})

const register = () => { }
</script>