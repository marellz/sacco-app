<template>
    <LayoutsContainer>
        <DashHeader title="Apply for a loan"></DashHeader>
        <DashContent class="space-y-10">
            <div class="grid grid-cols-3 gap-10">
                <div class="col-span-2">
                    <form @submit.prevent="submit">
                        <div class="grid grid-cols-2 gap-10">
                            <form-select label="Purpose" v-model="form.purpose" required class="col-span-2">
                                <option v-for="purpose in purposes" :key="purpose" :value="purpose">{{ purpose }}
                                </option>
                            </form-select>
                            <form-text label="More information" v-model="form.information" required
                                class="col-span-2"></form-text>
                            <form-input label="Amount" type="number" v-model="form.principleAmount"
                                required></form-input>
                            <form-select label="Payment frequency" type="number" v-model="form.repaymentFrequency">
                                <option v-for="frequency in repaymentFrequencies" :key="frequency.label"
                                    :value="frequency.label">{{
                                        frequency.label }}</option>
                            </form-select>
                            <form-input label="Installments" type="number" v-model="form.installments">
                            </form-input>
                            <div class="col-span-2 flex justify-end space-x-4">

                                <BaseButton type="button" @click="saveAs(LoanApplicationStatusEnum.DRAFT)" :disabled="disabledSubmit">
                                    <span>Save as draft</span>
                                </BaseButton>

                                <BaseButton type="submit" class="text-color-c border-color-c"
                                    :disabled="disabledSubmit">
                                    <span>Submit application</span>
                                </BaseButton>

                            </div>
                        </div>
                    </form>
                </div>
                <div>
                    <DashCard>
                        <DashCardTitle>Loan summary</DashCardTitle>
                        <div class="mt-10 space-y-4">
                            <div class="flex flex-col space-y-1">
                                <p class="font-medium text-sm">Principle amount: </p>
                                <p v-if="form.principleAmount">Ksh. {{ form.principleAmount.toLocaleString() }}</p>
                                <p v-else>&ndash;</p>
                            </div>
                            <div>
                                <p class="font-medium text-sm">Interest rate: </p>
                                <p v-if="form.interestRate">{{ form.interestRate }} % P.A</p>
                            </div>
                            <div class="flex flex-col space-y-1">
                                <p class="font-medium text-sm">Interest amount: </p>
                                <p v-if="interestAmount">{{ interestAmount.toLocaleString() }}</p>
                                <p v-else>&ndash;</p>
                            </div>
                            <div class="flex flex-col space-y-1">
                                <p class="font-medium text-sm">Principle amount: </p>
                                <p v-if="form.principleAmount">Ksh. {{ form.principleAmount.toLocaleString() }}</p>
                                <p v-else>&ndash;</p>
                            </div>
                            <div class="flex flex-col space-y-1">
                                <p class="font-medium text-sm">Repayment frequency: </p>
                                <p v-if="form.repaymentFrequency">{{ form.repaymentFrequency }}</p>
                                <p v-else>&ndash;</p>
                            </div>
                            <div class="flex flex-col space-y-1">
                                <p class="font-medium text-sm">Installments :</p>
                                <p v-if="form.installments">{{ form.installments }}</p>
                                <p v-else>&ndash;</p>
                            </div>

                            <div class="flex flex-col space-y-1">
                                <p class="font-medium text-sm">Repayable amount</p>
                                <p v-if="form.repayableAmount">Ksh. {{ Math.floor(Number(form.repayableAmount)) }}</p>
                                <p v-else>&ndash;</p>
                            </div>
                            <div class="flex flex-col space-y-1">
                                <p class="font-medium text-sm">Installment amount</p>
                                <p v-if="form.installmentAmount && form.installments">Ksh. {{
                                    form.installmentAmount }}</p>
                                <p v-else>&ndash;</p>
                            </div>

                        </div>
                    </DashCard>
                </div>
            </div>
        </DashContent>
    </LayoutsContainer>
</template>
<script lang="ts" setup>
import { LoanApplicationStatusEnum, useLoansStore, type LoanApplicationStatus, type NewLoanApplication } from '~/store/loans';

const store = useLoansStore()

const newApplication: NewLoanApplication = {
    purpose: '',
    information: '',
    principleAmount: '1000',
    installments: '12',
    interestRate: 6,
    interestAmount: null,
    repaymentFrequency: 'weekly',
    installmentAmount: '',
    status: LoanApplicationStatusEnum.DRAFT,
    repayableAmount: null,
}

const repaymentFrequencies = [
    { label: 'weekly', yearlyQuotient: 52 },
    { label: 'daily', yearlyQuotient: 365 },
    { label: 'monthly', yearlyQuotient: 12 }
];

const purposes = ['Business', 'Education', 'Medical', 'Personal', 'Other'];

const _duration = computed(() => {
    if (!form.value.repaymentFrequency || !form.value.installments) {
        return null
    }

    let _f = repaymentFrequencies.find(f => f.label === form.value.repaymentFrequency)

    if (!_f) {
        return null
    }

    return (Number(form.value.installments) / _f.yearlyQuotient)
})

const interestAmount = computed(() => {
    if (!form.value.principleAmount || !_duration.value) {
        return null
    }
    return Math.floor(parseInt(form.value.principleAmount) * (_duration.value * (form.value.interestRate / 100)))
})


const form = ref(newApplication)
const calculate = (v: NewLoanApplication = form.value) => {
    if (interestAmount.value) {
        form.value.repayableAmount = Number(form.value.principleAmount!!) + interestAmount.value // todo: + fees
        form.value.interestAmount = interestAmount.value;
        form.value.installmentAmount = Math.floor(form.value.repayableAmount / Number(form.value.installments))
    }
}

const disabledSubmit = computed(() => ![
    form.value.purpose,
    form.value.information,
    form.value.principleAmount,
    form.value.repaymentFrequency,
    form.value.installments
].every(item => item !== null && item !== ''))

const submit = async () => {
    saveAs(LoanApplicationStatusEnum.PENDING)
}

const saveAs = async (status: LoanApplicationStatus = LoanApplicationStatusEnum.DRAFT) => {
    console.log({status})
    const success = await store.apply({ ...form.value, status });
    if (success) {
        useRouter().push('/dashboard/member/loans/applications/')
    }
}

watch(form, calculate, { deep: true })

onMounted(calculate)

</script>