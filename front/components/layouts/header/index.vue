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
                <nuxt-link to="/auth/login">
                    <span>Login</span>
                </nuxt-link>
                <nuxt-link to="/auth/register">
                    <span>Register</span>
                </nuxt-link>
            </div>
        </LayoutsContainer>
    </header>
</template>