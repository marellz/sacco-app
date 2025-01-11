<template>
    <LayoutsContainer>
        <DashHeader title="Loan applications" />
        <DashContent class="space-y-10">
            <div class="flex justify-end">
                <nuxt-link to="/dashboard/member/loans/applications/new">
                    <BaseIconButton>
                        <FilePlus />
                        <span>New application</span>
                    </BaseIconButton>
                </nuxt-link>
            </div>
            <template v-if="store.loading">
                <div class="py-10">
                    <LazyCustomLoader />
                </div>
            </template>
            <template v-else-if="store.error">
                <div class="bg-red-100 p-6 space-y-4">
                    <h1 class="font-medium">Error</h1>
                    <p class="text-red-500">{{ store.error }}</p>
                </div>
            </template>
            <DashLoansEmpty v-else-if="!applications.length" />
            <DashLoanApplicationsTable v-else :applications>
                <template #actions="{ row }">
                    <template v-if="row.status === 'draft'">
                        <BaseIconButton class="hover:!bg-red-100 hover:text-red-500" @click="destroy(row._id)">
                            <FileX />
                            <span>Delete</span>
                        </BaseIconButton>
                        <BaseIconButton @click="submit(row._id)">
                            <FileUp />
                            <span>Submit</span>
                        </BaseIconButton>
                    </template>
                    <BaseIconButton v-if="row.status === 'pending'" @click="withdraw(row._id)">
                        <FileMinus />
                        <span>Withdraw</span>
                    </BaseIconButton>
                </template>
            </DashLoanApplicationsTable>
        </DashContent>
    </LayoutsContainer>
</template>
<script lang="ts" setup>
import { FileMinus, FilePlus, FileUp, FileX } from 'lucide-vue-next';
import { useLoansStore } from '~/store/loans';

const store = useLoansStore()
const applications = computed(() => store.applications)


const withdraw = async (id: string) => {
    await store.withdrawLoanApplication(id);
}

const destroy = async (id: string) => {
    if (confirm('Are you sure you want to delete this loan application?')) {
        await store.deleteLoanApplication(id);
    }
}

const submit = async (id: string) => {
    if (confirm('Are you sure you want to submit this loan application?')) {
        await store.submitLoanApplication(id);
    }
}

onMounted(store.getMyLoanApplications);
</script>