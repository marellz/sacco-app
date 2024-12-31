<template>
  <div>
    <!-- <icon-component /> -->
    <p>
      <slot></slot>
    </p>
    <button type="button" click="$emit('dismiss')">
      <XIcon></XIcon>
    </button>
  </div>
</template>
<script lang="ts" setup>
defineEmits(['dismiss'])
</script>
