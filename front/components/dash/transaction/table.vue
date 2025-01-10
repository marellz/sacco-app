<template>
    <div class="border rounded-xl p-10 space-y-10">
        <BlocksTitle>{{ title ?? 'Transactions' }}</BlocksTitle>
        <div class="flex">
            <form @submit.prevent="search">
                <div class="flex space-x-2">
                    <FormInput v-model="query" placeholder="Search"></FormInput>
                    <BaseIconButton>
                        <Search></Search>
                        <span>Search</span>
                    </BaseIconButton>
                </div>
            </form>
        </div>
        <CustomTable :headers :items>
            <template #amount="{ row }">
                Ksh. {{ row.amount.toLocaleString() }}
            </template>
            <template #status="{ row }">
                <DashStatusTag :color="themeMapping[row.status]">{{ row.status }}</DashStatusTag>
            </template>
            <template #loan="{ row }">
                {{ row.loan?.name }}
            </template>
        </CustomTable>
    </div>
</template>
<script lang="ts" setup>
import { Search } from 'lucide-vue-next'

const props = withDefaults(defineProps<{
    items: Array<Object>;
    title?: string;
}>(), {
})

const query = ref()

const headers = [
    { label: "Date", key: "date" },
    { label: "Transaction code", key: "code" },
    { label: "Transaction type", key: "type" },
    { label: "Amount transacted", key: "amount" },
    { label: "Status", key: "status" },
]

const search = () => {}

const themeMapping = {
    "failed": "error",
    "completed": "success"
}

</script>