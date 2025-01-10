<template>
  <div class="flex rounded-xl w-80 z-10 relative m-4 mb-0 bg-slate-50 first:!mb-10 shadow items-center">
    <div class="p-3">
      <div class="h-16 w-16 flex items-center justify-center rounded-full" :class="[toastTheme['bg'], toastTheme['color']]" >
        <component :is="toastIcon" :size="36" :stroke-width="1.5" />
      </div>
    </div>
    <div class="flex-auto p-2 mb-1">
      <h1 class="font-bold text-lg" :class="[toastTheme['color']]">{{ toast.title }}</h1>
      <p class="text-sm mt-1">{{ toast.description }}</p>
    </div>
    <button type="button" class="p-2 bg-slate-100/50 hover:bg-slate-200 rounded-full m-2" @click="$emit('close', toast.id)">
      <x :size="20" />
    </button>
  </div>
</template>
<script lang="ts" setup>
import type { Toast, ToastVariant } from "~/store/toasts";
import { Check, CircleAlert, Info } from "lucide-vue-next";
import { X } from "lucide-vue-next";
const props = defineProps<{
  toast: Toast;
}>();

defineEmits(["close"]);

const defaultVariant: ToastVariant = "info"

interface Theme {
  bg: string;
  color: string;
}

interface Themes {
  success: Theme;
  info: Theme;
  error: Theme;
}

const icons = {
  success: Check,
  info: Info,
  error: CircleAlert,
};

const themes: Themes = {
  success: { bg: "bg-green-100", color: "text-green-500" },
  info: { bg: "bg-blue-100", color: "text-blue-500" },
  error: { bg: "bg-red-100", color: "text-red-500" },
};

const toastTheme = computed(() => {
  const v = props.toast.variant || defaultVariant;
  return themes[v as keyof Themes];
});

const toastIcon = computed(() => {
  return icons[props.toast.variant || defaultVariant];
});
</script>
