<template>
  <div class="server-config">
    <app-header :title="''" :bg-color="'transparent'" :btn-back-color="'#333'" class="header" />
    <div class="px-25">
      <h2 class="mt-60 text-left">设置服务器地址</h2>
      <var-form ref="form" class="mt-40">
        <var-cell>
          地址
          <template #extra>
            <var-input placeholder="请输入地址" v-model="formData.address" clearable />
          </template>
        </var-cell>
      </var-form>
      <var-button
        block
        type="primary"
        class="btn mt-25 pt-27 pb-27"
        color="linear-gradient(90deg, #1788FF, #4575FF)"
        @click="save"
        >保存</var-button
      >
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'ServerConfig',
  };
</script>

<script lang="ts" setup>
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  import { validateIP } from '/@/utils/validate';
  import { toastMessage } from '/@/utils/index';
  import { useConfigStore } from '/@/store/modules/config';

  const { setConfig } = useConfigStore();

  const app = getCurrentInstance();

  console.log('app :>> ', app);

  const router = useRouter();

  interface Form {
    address: string;
  }

  const formData = reactive<Form>({
    address: '',
  });

  const save = () => {
    console.log('object :>> ', app?.proxy?.LOADING);
    if (!formData.address) {
      toastMessage('请先设置服务器地址');
      return;
    }
    if (!validateIP(formData.address)) {
      toastMessage('请设置正确的服务器地址');
      return;
    }
    app?.proxy?.LOADING.show();
    axios
      .get(`http://${formData.address}:8666/config/config.json`, {
        timeout: 10000,
      })
      .then(({ data }) => {
        app?.proxy?.LOADING.hide();
        const { server_port } = data;
        setConfig(
          Object.assign(data, {
            serverUrl: `http://${formData.address}:${server_port}`,
            socketUrl: `http://${formData.address}:${server_port}`,
          }),
        );
        router.replace({
          name: 'login',
        });
      })
      .catch(() => {
        app?.proxy?.LOADING.hide();
        toastMessage('无法连接服务器');
      });
  };
</script>

<style lang="scss" scoped>
  .server-config {
    background: #fff;
    height: 100%;
    .header :deep .var-app-bar {
      box-shadow: none;
    }
    .var-cell {
      padding: 0;
      :deep .var-cell__content {
        font-weight: bold;
      }
      :deep .var-cell__extra {
        flex: 6;
      }
    }
    .btn {
      border-radius: 44px;
      padding: 22px 0;
      font-size: $--font-size-m-lg;
    }
  }
</style>
