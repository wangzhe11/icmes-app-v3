<template>
  <div class="login-form px-25 h-full">
    <div v-if="JSON.stringify(serverConfig) === '{}'" class="pt-86">
      <img src="../images/logo.png" alt="" width="290" />
      <var-button
        block
        type="primary"
        class="btn mt-112 pb-27 p-14 font-size-18"
        color="linear-gradient(-90deg, #4575FF, #1788FF)"
        @click="setConfig"
        >设置服务器</var-button
      >
      <var-button block text outline class="btn black gray-border mt-25 pt-27 pb-27"
        >扫码设置</var-button
      >
      <p class="tips mt-30 text-left">
        <var-icon name="information-outline" color="#CDCDCD" size="15" class="mr-4" />
        首次登录请先设置服务器地址
      </p>
    </div>
    <div v-else>
      <h2 class="pt-60 text-left">账号密码</h2>
      <var-form ref="form" class="mt-40" scroll-to-error="start">
        <var-cell class="mb-20">
          工号
          <template #extra>
            <var-input
              placeholder="请输入用户名"
              :rules="[(v) => !!v || '用户名不能为空']"
              v-model="formData.employeeCode"
              clearable
            />
          </template>
        </var-cell>
        <var-cell class="mb-20">
          密码
          <template #extra>
            <var-input
              placeholder="请输入密码"
              :type="inputType"
              :rules="[(v) => !!v || '密码不能为空']"
              v-model="formData.password"
              clearable
            >
              <template #append-icon>
                <div @click="handlePwdEye">
                  <Icon v-if="eyeIsOpen" icon="ph:eye-light" />
                  <Icon v-else icon="iconoir:eye-close" />
                </div>
              </template>
            </var-input>
          </template>
        </var-cell>
        <var-button
          :disabled="isDisabled"
          block
          type="primary"
          class="btn mt-25 pt-27 pb-27"
          :color="
            isDisabled
              ? 'linear-gradient(90deg, rgba(23,136,255,0.6), rgba(69,117,255,0.6))'
              : 'linear-gradient(90deg, #1788FF, #4575FF)'
          "
          @click="handleLogin"
          >登录</var-button
        >
      </var-form>
    </div>
  </div>
</template>

<script lang="ts">
  import { Icon } from '@iconify/vue';
  export default {
    name: 'LoginForm',
    components: {
      Icon,
    },
  };
</script>

<script lang="ts" setup>
  import { useConfigStore } from '/@/store/modules/config';
  import { useRouter } from 'vue-router';
  import { useUserStore } from '/@/store/modules/user';

  const { getConfig } = useConfigStore();

  const { login } = useUserStore();

  const router = useRouter();

  interface Config {
    top_icon?: string;
    bottom_title?: string;
    bottom_icon?: string;
    background?: string;
    server_port?: number | null;
    websocket_port?: number | null;
    accountCodeExpireTime?: number | null;
  }

  interface Form {
    employeeCode: string;
    password: string;
  }

  let serverConfig = reactive<Config>({});

  const formData = reactive<Form>({
    employeeCode: '',
    password: '',
  });

  const eyeIsOpen = ref(false);

  serverConfig = getConfig;

  const isDisabled = computed(() => {
    return (
      (!formData.employeeCode && !formData.password) ||
      ((formData.employeeCode && formData.password.length < 6) as boolean)
    );
  });

  const inputType = computed(() => {
    return eyeIsOpen.value ? 'text' : 'password';
  });

  const setConfig = () => {
    router.push({
      name: 'ServerConfig',
    });
  };

  const handlePwdEye = () => {
    eyeIsOpen.value = !eyeIsOpen.value;
  };

  const handleLogin = () => {
    login({
      ...formData,
    });
  };
</script>

<style lang="scss" scoped>
  .login-form {
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
      color: #fff;
    }
    .black {
      color: #333;
    }
    .gray-border {
      border: 1px solid $--border-color-light;
    }
    .tips {
      font-size: $--font-size-sm;
      color: $--font-color-light;
    }
  }
</style>
