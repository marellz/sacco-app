<template>
  <transition-group
    tag="ul"
    name="toasts"
    class="fixed z-20 h-1 bottom-0 left-0 w-full flex flex-col-reverse items-center space-y-4 border"
  >
    <toast-item
      :toast
      :key="toast.id"
      v-for="toast in toasts"
      @close="toastStore.remove(toast.id)"
    />
  </transition-group>
</template>
<script lang="ts" setup>
import { useToastsStore } from "~/store/toasts";

const toastStore = useToastsStore();
const toasts = computed(() => toastStore.toasts);
</script>
<style lang="scss">
.toasts {
  &-enter-to,
  &-leave-from {
    transform: translateY(0);
    opacity: 1;
  }

  &-enter-from,
  &-leave-to {
    transform: translateY(10px);
    opacity: 0;
  }

  &-leave-to {
    transform: translateT(50%);
  }

  &-leave-active,
  &-enter-active {
    transition: all 0.15s ease;
  }

  &-enter-active {
  }

  &-move {
    transition-delay: 0.05s;
    position: absolute;
  }

  &-leave-active {
    // position: absolute;
  }
}
</style>
