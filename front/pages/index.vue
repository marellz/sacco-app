<template>
    <LayoutsContainer>
        <div class="grid grid-cols-2 gap-x-10 items-center py-20">
            <div>
                <img class="max-w-sm ml-auto" src="@/assets/images/undraw_transfer-money.svg" alt="">
            </div>
            <div class="">
                <h1 class="text-[50px] leading-[60px] font-bold">Join Our SACCO Community Today!</h1>
                <p class="text-xl leading-8 mt-5">Save, borrow, and grow with confidence through a platform designed to
                    support your
                    financial journey.</p>
                <div class="flex space-x-3 mt-10">
                    <nuxt-link to="/auth/register">
                        <BaseButton class="border-color-c text-color-c focus:ring-color-c">
                            <span>
                                Sign Up as a Member
                            </span>
                        </BaseButton>
                    </nuxt-link>
                    <nuxt-link to="/auth/login">
                        <BaseButton class="bg-color-c border-color-c focus:ring-color-c">
                            <span>Login to Your Account</span>
                        </BaseButton>
                    </nuxt-link>
                </div>
            </div>

        </div>
    </LayoutsContainer>
</template>
<script lang="ts" setup>
definePageMeta({
    layout: "home"
})
</script>