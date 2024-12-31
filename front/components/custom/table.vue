<template>

        <table class="table w-full">
            <thead>
                <tr class="">
                    <th class="bg-slate-100 p-4 font-medium first:rounded-l-xl last:rounded-r-xl text-left"
                        v-for="(header, index) in headers" :key="index">
                        <div>
                            {{ header.label }}
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, index) in items" :key="index">
                    <td v-for="(header, rowIndex) in headers" :key="rowIndex" class="px-4 py-2">
                        <slot :name="header.key" :row>
                            {{ row[header.key] }}
                        </slot>
                    </td>
                </tr>
            </tbody>
        </table>
</template>
<script lang="ts" setup>
defineProps<{
    headers:Array<{label: string; key: string;}>,
    items: Array<Object>
}>()

</script>