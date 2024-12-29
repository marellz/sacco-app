<template>
    <LayoutsContainer>
        <DashHeader title="Overview" />
        <DashContent class="space-y-10">
            <BlocksTitle>Hello, User.</BlocksTitle>
            <div class="flex">
                <DashCard class="bg-slate-100">
                    <div class="flex">
                        <div class="px-10">
                            <div class=" font-medium">
                                Ksh.
                                <span class="text-[60px] font-bold">2,400</span>
                            </div>
                            <BlocksContext>Current Savings</BlocksContext>
                            <div class="flex justify-end mt-3">
                                <nuxt-link to="/dashboard/member/savings">
                                    <BaseIconButton class=" hover:bg-black hover:text-white">
                                        <span>View more</span>
                                        <MoveRight />
                                    </BaseIconButton>
                                </nuxt-link>
                            </div>
                        </div>
                        <div class="border-l-2 px-10">
                            <div class="font-medium">
                                Ksh.
                                <span class="text-[60px] font-bold">4,500</span>
                            </div>
                            <BlocksContext>Outstanding Loans</BlocksContext>
                            <div class="flex justify-end mt-3">
                                <nuxt-link to="/dashboard/member/loans">
                                    <BaseIconButton class=" hover:bg-black hover:text-white">
                                        <span>View more</span>
                                        <MoveRight />
                                    </BaseIconButton>
                                </nuxt-link>
                            </div>
                        </div>
                    </div>
                </DashCard>
            </div>

            <div class="grid">
                <DashCard class="bg-slate-100">
                    <div class="flex items-center space-x-3">
                        <DashCardTitle>My activity</DashCardTitle>
                        <BaseIconButton>
                            <MoveLeft />
                        </BaseIconButton>
                        <BaseIconButton>
                            <MoveRight />
                        </BaseIconButton>
                    </div>
                    <ul class="mt-10">
                        <li v-for="i in 10">
                            <DashActivityItem />
                        </li>
                    </ul>
                </DashCard>
            </div>
            <!-- Blank page -->
        </DashContent>
    </LayoutsContainer>
</template>
<script lang="ts" setup>
import { MoveLeft, MoveRight } from 'lucide-vue-next'
</script>