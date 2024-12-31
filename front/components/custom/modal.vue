<template>
  <div>
    <div ref="modal">
      <div>
        <slot name="header">
          <div>
            <h1>{{ title }}</h1>
          </div>
        </slot>
        <button type="button" click="close">
          <x :size="20"></x>
        </button>
      </div>
      <div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
// import { onClickOutside } from "@vueuse/core";
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

const show = defineModel("show", { default: false });
const close = () => {
  show.value = false;
};
const modal = ref();
// onClickOutside(modal, close);

watch(show, (v) => {
  let w = document.body.classList;
  v ? w.add("overflow-hidden") : w.remove("overflow-hidden");
});
</script>
