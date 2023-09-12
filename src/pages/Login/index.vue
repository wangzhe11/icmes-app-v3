<template>
  <div class="login">
    <LoginForm />
  </div>
</template>

<script lang="ts">
  export default {
    name: 'Login',
  };
</script>

<script lang="ts" setup>
  import LoginForm from './components/loginForm.vue';
  // import SetServerForm from './components/setServerForm.vue';
  import { useConfigStore } from '/@/store/modules/config';

  const { getConfig } = useConfigStore();

  interface Config {
    top_icon?: string;
    bottom_title?: string;
    bottom_icon?: string;
    background?: string;
    server_port?: number | null;
    websocket_port?: number | null;
    accountCodeExpireTime?: number | null;
  }

  let serverConfig = reactive<Config>({});
  serverConfig = getConfig;
  console.log('serverConfig :>> ', !serverConfig);
</script>

<style lang="scss" scoped>
  .login {

  }
</style>
