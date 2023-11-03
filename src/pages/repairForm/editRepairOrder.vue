<template>
  <div class="edit-repair-order">
    {{ msg }}
  </div>
</template>

<script lang="ts">
  export default {
    name: 'EditRepairOrder',
  };
</script>

<script lang="ts" setup>
  import { ref } from 'vue';

  const msg = ref('hello, ');
</script>

<style lang="scss" scoped>
  .edit-repair-order {
    color: red;
  }
</style>
