<template>
    <LayoutsContainer>
        <DashHeader title="Loan applications"></DashHeader>
        <DashContent>
            <template v-if="store.error">
                <div class="bg-red-100 p-6 space-y-4">
                    <h1 class="font-medium">Error</h1>
                    <p class="text-red-500">{{ store.error }}</p>
                </div>
            </template>
            <DashLoanApplicationsTable :applications>
                <template #actions="{row}">
                    <template v-if="row.status === LoanApplicationStatusEnum.PENDING">
                        <BaseIconButton @click="approve(row._id)" class="hover:!bg-green-100 hover:text-green-500">
                            <FileCheckIcon />
                            <span>Approve</span>
                        </BaseIconButton>
                        <BaseIconButton @click="reject(row._id)" class="hover:!bg-red-100 hover:text-red-500">
                            <FileX2 />
                            <span>Reject</span>
                        </BaseIconButton>
                    </template>
                    <BaseIconButton v-if="row.status === LoanApplicationStatusEnum.APPROVED" @click="disburse(row._id)">
                        <FileCheckIcon />
                        <span>Disburse</span>
                    </BaseIconButton>
                    <BaseIconButton v-if="row.status === LoanApplicationStatusEnum.REJECTED" @click="review(row._id)">
                        <FileCheckIcon />
                        <span>Review</span>
                    </BaseIconButton>
                </template>
            </DashLoanApplicationsTable>
        </DashContent>
    </LayoutsContainer>
</template>
<script lang="ts" setup>
import { FileCheckIcon, FileX2 } from 'lucide-vue-next';
import { LoanApplicationStatusEnum, useLoansStore } from '~/store/loans';

const store = useLoansStore()
const applications = computed(() => store.applications)


const approve = async (id: string) => {
    await store.approveLoanApplication(id)
}

const reject = async (id: string) => {
    await store.rejectLoanApplication(id);
}

const disburse = async (id: string) => {
    await store.disburseLoan(id)
}

const review = async (id: string) => {
    // todo: open in a modal?
    // await store.reviewLoan(string)
}


onMounted(async () => {
    await store.getLoanApplications()
})
</script>