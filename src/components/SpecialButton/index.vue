<template>
  <div class="special-button">
    <button @click="handleClick">
      {{ text }}
      <div class="star a"></div>
      <div class="star b"></div>
      <div class="star c"></div>
      <div class="star d"></div>
      <div class="star e"></div>
      <div class="star f"></div>
      <div class="star g"></div>
    </button>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'SpecialButton',
  };
</script>

<script lang="ts" setup>
  defineProps({
    text: {
      type: String,
      default: '',
    },
  });

  const emit = defineEmits(['click']);

  const handleClick = () => {
    emit('click');
  };
</script>

<style lang="scss" scoped>
  .special-button {
    animation: flashing 1.4s infinite;
    width: 100%;
    height: 45px;
    border-radius: 9999px;
    button {
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
      background-color: none;
      border-radius: 9999px;
      // padding: 8px 16px;
      color: white;
      font-size: $--font-size-m-lg;
      background: linear-gradient(109.6deg, #1788ff 11.2%, #4575ff 53.7%, #1788ff 100.2%);
      letter-spacing: 0.08em;
      font-weight: 800;
      position: relative;
      .star {
        width: 2px;
        height: 2px;
        background-color: white;
        border-radius: 50%;
        position: absolute;
        animation: start-flashing 1.8s infinite;
        transition: all 0.8s ease-in-out;
        &.a {
          top: 8px;
          left: 6px;
        }
        &.b {
          top: 2px;
          left: 16px;
        }
        &.c {
          top: 18px;
          left: 8px;
        }
        &.d {
          top: 14px;
          left: 20px;
        }

        &.e {
          top: 30px;
          left: 8px;
        }

        &.f {
          top: 24px;
          left: 24px;
        }
        &.g {
          top: 10px;
          left: 32px;
        }
      }
      &:active {
        animation: flashing-active 0.4s infinite;
      }
    }
    &:hover {
      .star.a {
        transform: translate3d(0px, 8px, 0);
      }
      .star.b {
        transform: translate3d(-4px, 6px, 0);
      }
      .star.c {
        transform: translate3d(14px, -8px, 0);
      }
      .star.d {
        transform: translate3d(16px, -2px, 0);
      }
      .star.e {
        transform: translate3d(58px, -20px, 0);
      }
      .star.f {
        transform: translate3d(34px, 2px, 0);
      }
      .star.g {
        transform: translate3d(10px, 16px, 0);
      }
    }
    @keyframes flashing {
      0% {
        box-shadow: 0 0 0 0 #0660a1;
      }

      100% {
        box-shadow: 0 0 0 8px #fbb32f01;
      }
    }

    @keyframes start-flashing {
      0% {
        box-shadow: 0 0 0 0 #ffffff;
      }

      100% {
        box-shadow: 0 0 0 4px #fbb32f01;
      }
    }

    @keyframes flashing-active {
      0% {
        box-shadow: 0 0 0 0 #0660a1;
      }

      100% {
        box-shadow: 0 0 0 16px #fbb32f01;
      }
    }
  }
</style>
