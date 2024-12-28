<template>
  <button :type :class="btnClass" :disabled="loading || disabled">
    <slot />
    <custom-loader v-if="loading" />
  </button>
</template>
<script lang="ts" setup>
withDefaults(
  defineProps<{
    loading?: boolean;
    disabled?: boolean;
    type?: "submit" | "button" | "reset" | undefined;
    btnClass?: string;
  }>(),
  {
    btnClass: "btn",
  }
);
</script>
