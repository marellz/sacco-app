<template>
    <header class="border-b py-2">
        <LayoutsContainer class="flex items-center">
            <nuxt-link to="/" class="block p-2 text-3xl font-bold">
                WaweruSacco
            </nuxt-link>
            <div class="ml-5 flex space-x-3">
                <span>Learn more</span>
            </div>
            <div class="ml-auto flex space-x-3">
                <template v-if="auth.isAuthenticated">
                   <UserMenu />
                </template>
                <template v-else>
                    <nuxt-link to="/auth/login">
                        <span>Login</span>
                    </nuxt-link>
                    <nuxt-link to="/auth/register">
                        <span>Register</span>
                    </nuxt-link>
                </template>
            </div>
        </LayoutsContainer>
    </header>
</template>
<script lang="ts" setup>
import { useAuthStore } from '~/store/auth';

const auth = useAuthStore();
</script>