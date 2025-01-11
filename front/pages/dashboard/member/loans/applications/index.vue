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
                <p>{{ store.error }}</p>
            </template>
            <template v-else-if="!applications.length">
                <div class="flex justify-center gap-10">
                    <div>
                        <img class="max-w-xs" src="@/assets/images/undraw_add-notes.svg" alt="">
                    </div>
                    <div class="space-y-4 max-w-md ml-20">
                        <p class="text-4xl font-bold">Empty...</p>
                        <p class="text-lg">You have not made any loan applications for now. Use the button on the top right of this page
                            to go to the application form.</p>
                    </div>

                </div>
            </template>
            <CustomTable v-else :headers :items="applications">
                <template #purpose="{ row }">
                    <div>
                        <h1 class="font-medium mb-1">{{ row.purpose }}</h1>
                        <p>{{ row.information }}</p>
                    </div>
                </template>
                <template #principleAmount="{ row }">
                    <p>Ksh. {{ row.principleAmount.toLocaleString() }}</p>
                </template>
                <template #repayment="{ row }">
                    <p>Ksh. {{ row.installmentAmount.toLocaleString() }} paid {{ row.repaymentFrequency }}</p>
                    <p class="text-sm"> x {{ row.installments }} installments</p>
                </template>
                <template #createdAt="{ row }">
                    <p>{{ parseTime(row.createdAt) }}</p>
                </template>
                <template #status="{ row }">
                    <DashLoanStatusTag :variant="row.status">{{ row.status }}</DashLoanStatusTag>
                </template>
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
            </CustomTable>
        </DashContent>
    </LayoutsContainer>
</template>
<script lang="ts" setup>
import { FileMinus, FilePlus, FileUp, FileX } from 'lucide-vue-next';
import { useLoansStore } from '~/store/loans';

const store = useLoansStore()
const applications = computed(() => store.applications)

const headers = [
    { key: "purpose", label: "Purpose" },
    { key: "createdAt", label: "Created" },
    { key: "principleAmount", label: "Principle amount" },
    { key: "repayment", label: "Repayment" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Actions" },
]

onMounted(store.getMyLoanApplications);

const parseTime = (obj: string) => {
    let t = new Date(obj)
    return [t.getDate(), (t.getMonth() + 1), t.getFullYear()].join('-')
}

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
</script>