<template>
    <LayoutsContainer class="py-10">
        <BlocksHero class="bg-slate-100 space-y-10">
            <BlocksTitle>Your profile</BlocksTitle>

            <div class="space-y-4">
                <h1 class="font-bold">Your personal information</h1>
                <form @submit.prevent="update" v-if="form">
                    <div class="grid grid-cols-2 gap-10">
                        <form-input v-model="form.firstName" required label="First same"></form-input>
                        <form-input v-model="form.otherNames" required label="Other names"></form-input>
                        <form-input v-model="form.email" required label="Email" disabled></form-input>
                        <div>
                            <div class="relative">
                                <form-input v-model="phone" label="Phone"></form-input>
                                <BaseIconButton type="button" class="absolute right-2 top-10" @click="savePhoneNumber">
                                    <span class="font-medium">Add phone</span>
                                    <Plus />
                                </BaseIconButton>
                            </div>
                            <template v-if="form.phoneNumbers.length">
                                <h1 class="font-medium text-sm mt-4">Added phones</h1>
                                <div class="flex mt-2 items-center space-x-2 border rounded-xl p-2" v-for="(item, index) in form.phoneNumbers"
                                    :key="index">
                                    <span class="p-2 rounded-full bg-slate-200">
                                        <Phone />
                                    </span>
                                    <p class="flex-auto text-lg font-medium">
                                        {{ item }}
                                    </p>
                                    <BaseIconButton class="hover:!bg-red-100 hover:text-red-500 font-medium" @click="deletePoneNumber(index)">
                                        <span>Delete</span>
                                        <X />
                                    </BaseIconButton>
                                </div>
                            </template>
                        </div>
                        <div class="col-span-2 flex justify-end">
                            <base-button>Save profile information</base-button>
                        </div>
                    </div>
                </form>
            </div>
        </BlocksHero>
    </LayoutsContainer>
</template>
<script lang="ts" setup>
import type { User } from '~/types/user';
import { useAuthStore } from '~/store/auth';
import { X, Plus, Phone } from "lucide-vue-next";

definePageMeta({
    layout: "home",
    middleware: 'is-authenticated'
})


const auth = useAuthStore();

const user = computed(() => auth.user)

const form = ref<User>({ ...user.value!! })

const phone = ref('')
// const phoneNumbers = ref([...user.value.phoneNumbers])

const savePhoneNumber = async () => {
    if (!phone.value === null || phone.value === '') {
        return false;
    }

    form.value.phoneNumbers.push(phone.value);
    let success = await auth.update(form.value)
    if(success){
        phone.value = ''
    }
}

const deletePoneNumber = async (index: number) => {
    let phoneNumbers = form.value.phoneNumbers
    phoneNumbers.splice(index, 1)

    let success = await auth.update({ ...form.value, ...phoneNumbers })

    if (success) {
        form.value = { ...user.value!! }
    }
}

const update = async () => {
    if (!form.value) {
        return;
    }

    await auth.update(form.value)
}

onMounted(() => { })

</script>