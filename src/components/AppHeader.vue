<template>
  <div class="app-header">
    <var-sticky z-index="4000">
      <var-app-bar :title="title" :color="bgColor" :title-position="titlePosition">
        <template #left>
          <var-button :text-color="btnBackColor" round text @click="back">
            <var-icon name="chevron-left" :size="30" />
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
    </var-sticky>
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
    titlePosition: {
      type: String as PropType<AppBarProps['titlePosition']>,
      default: 'center',
    },
  });

  const emit = defineEmits(['back']);

  const back = () => {
    emit('back');
  };
</script>

<style lang="scss" scoped>
  .app-header :deep .var-app-bar__toolbar {
    height: 40px;
  }
</style>
