<template>
  <div class="app-header">
    <var-app-bar :title="title" :color="bgColor">
      <template #left>
        <var-button :text-color="btnBackColor" round text>
          <var-icon name="chevron-left" :size="40" />
        </var-button>
      </template>

      <template #right>
        <var-space class="app-header-right" :size="[0, '1.4vmin']">
          <slot name="right"></slot>
        </var-space>
      </template>

      <template #content>
        <slot name="content"></slot>
      </template>
    </var-app-bar>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'AppHeader',
  };
</script>

<script lang="ts" setup>
  import { AppBarProps, ButtonProps } from '@varlet/ui';
  import type { PropType } from 'vue';

  defineProps({
    title: {
      type: String as PropType<AppBarProps['title']>,
    },
    bgColor: {
      type: String as PropType<AppBarProps['color']>,
      default: 'linear-gradient(45deg, #00A6FC, #1788FF)',
    },
    btnBackColor: {
      type: String as PropType<ButtonProps['textColor']>,
      default: '#fff',
    },
  });
</script>
