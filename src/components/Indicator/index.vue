<template>
  <div class="indicator" :class="{ mask: isShowMask, show: isShow }">
    <div class="indicator-content">
      <div id="container">
        <div id="ring"></div>
        <div id="ring"></div>
        <div id="ring"></div>
        <div id="ring"></div>
        <div id="h3">加载中...</div>
      </div>
      <!-- <slot>
        <div class="spin"></div>
      </slot>
      <div class="indicator-text" v-html="indicatorText" v-if="indicatorText"></div> -->
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
      #container {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
      }

      #h3 {
        color: $--font-color-light;
      }

      #ring {
        width: 190px;
        height: 190px;
        border: 1px solid transparent;
        border-radius: 50%;
        position: absolute;
      }

      #ring:nth-child(1) {
        border-bottom: 8px solid rgb(255, 141, 249);
        animation: rotate1 2s linear infinite;
      }

      @keyframes rotate1 {
        from {
          transform: rotateX(50deg) rotateZ(110deg);
        }

        to {
          transform: rotateX(50deg) rotateZ(470deg);
        }
      }

      #ring:nth-child(2) {
        border-bottom: 8px solid rgb(255, 65, 106);
        animation: rotate2 2s linear infinite;
      }

      @keyframes rotate2 {
        from {
          transform: rotateX(20deg) rotateY(50deg) rotateZ(20deg);
        }

        to {
          transform: rotateX(20deg) rotateY(50deg) rotateZ(380deg);
        }
      }

      #ring:nth-child(3) {
        border-bottom: 8px solid rgb(0, 255, 255);
        animation: rotate3 2s linear infinite;
      }

      @keyframes rotate3 {
        from {
          transform: rotateX(40deg) rotateY(130deg) rotateZ(450deg);
        }

        to {
          transform: rotateX(40deg) rotateY(130deg) rotateZ(90deg);
        }
      }

      #ring:nth-child(4) {
        border-bottom: 8px solid rgb(252, 183, 55);
        animation: rotate4 2s linear infinite;
      }

      @keyframes rotate4 {
        from {
          transform: rotateX(70deg) rotateZ(270deg);
        }

        to {
          transform: rotateX(70deg) rotateZ(630deg);
        }
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
