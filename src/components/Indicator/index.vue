<template>
  <div class="indicator" :class="{ mask: isShowMask, show: isShow }">
    <div class="indicator-content">
      <slot>
        <div class="spin"></div>
      </slot>
      <div class="indicator-text" v-html="indicatorText" v-if="indicatorText"></div>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'Indicator',
  };
</script>

<script lang="ts" setup>
  const isShow = ref(false);
  const isShowMask = ref(false);
  const indicatorText = ref('');
  const onHide = ref(() => {});

  const props = defineProps({
    value: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  });

  watch(
    () => props.value,
    (val) => {
      isShow.value = val;
    },
  );
  watch(
    () => props.options,
    () => {
      initOptionsData();
    },
  );

  onMounted(() => {
    isShow.value = props.value || false;
    initOptionsData();
  });

  function initOptionsData() {
    isShowMask.value = props.options.isShowMask;
    indicatorText.value = props.options.indicatorText;
  }
  // 显示
  function show(showMask = false, text = '') {
    console.log('show :>> ');
    isShow.value = true;
    isShowMask.value = showMask;
    indicatorText.value = text;
  }
  // 隐藏
  function hide() {
    isShow.value = false;
    if (onHide.value && typeof onHide.value === 'function') {
      nextTick(() => {
        // 异步操作判断
        if (!isShow.value) onHide.value();
      });
    }
  }

  defineExpose({
    show,
    hide,
  });
</script>

<style lang="scss" scoped>
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .indicator {
    width: 100%;
    height: 100%;
    display: none;
    text-align: center;
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    &.show {
      display: block;
    }
    .indicator-content {
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 0, 0, 0.6);
      border-radius: 5px;
      padding: 15px;
      .spin {
        @include radiusCube(30px);
        margin: 0 auto;
        border: 4px solid transparent;
        border-top-color: $--border-color-default;
        border-left-color: $--border-color-default;
        border-bottom-color: $--border-color-default;
        animation: rotate 0.8s infinite linear;
      }
      .indicator-text {
        line-height: 1;
        margin-top: $--font-size-sm;
        font-size: $--font-size-md;
        color: #fff;
      }
    }
    &.mask {
      background-color: rgba(0, 0, 0, 0.6);
      .indicator-content {
        background: transparent;
        .indicator-text {
          color: $--font-color-light;
        }
      }
    }
  }
</style>
