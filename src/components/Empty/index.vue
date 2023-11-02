<template>
  <div class="empty">
    <img src="./images/empty.png" alt="" />
    <p>{{ message }}</p>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'Empty',
  };
</script>

<script lang="ts" setup>
  defineProps({
    message: {
      type: String,
      default: '搜索无结果',
    },
  });
</script>

<style lang="scss" scoped>
  .empty {
    margin-top: 100px;
    img {
      width: 134px;
      margin-bottom: 10px;
    }
  }
</style>
