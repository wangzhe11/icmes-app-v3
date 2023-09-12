<template>
  <var-button @click="handleClick">说你好</var-button>
  <Footer />
</template>

<script setup lang="ts">
  function handleClick() {
    Snackbar('你好!');
  }
</script>

<style scoped>
  .read-the-docs {
    color: #888;
  }
</style>
