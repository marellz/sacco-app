<template>
  <div class="fixed inset-0 z-[5] bg-black/10 backdrop-blur-sm transition"
    :class="{ 'invisible opacity-0': !show, 'visible opacity-full': show }">
    <div class="bg-white p-10 rounded-xl mt-20 mx-auto space-y-10" :class="[width]" ref="modal">
      <div class="border-b flex justify-between pb-4">
        <slot name="header">
          <div>
            <BlocksTitle>{{ title }}</BlocksTitle>
          </div>
        </slot>
        <button type="button" @click="close">
          <x :size="32"></x>
        </button>
      </div>
      <div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onClickOutside } from '@vueuse/core';
import { X } from 'lucide-vue-next';
import { ref, watch } from "vue"
withDefaults(
  defineProps<{
    title?: string;
    width?: string;
  }>(),
  {
    width: "max-w-xl",
  }
);
const emit = defineEmits(['close'])

const show = defineModel("show", { default: false });
const modal = ref();
const close = () => {
  show.value = false;
  emit("close");
};

onClickOutside(modal, close);

watch(show, (v) => {
  let w = document.body.classList;
  v ? w.add("overflow-hidden") : w.remove("overflow-hidden");
});
</script>
