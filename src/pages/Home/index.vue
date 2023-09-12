<template>
  <div class="home w-full h-full flex flex-col">
    <var-skeleton title avatar :rows="6" :loading="loading">
      <header class="position-relative box-border flex justify-between z-10 p-15">
        <div class="flex mt-10">
          <div class="avatar pl-1 pt-3 mr-10">
            <var-avatar :src="userInfo?.avatar" />
          </div>
          <div class="name text-left">
            <h3 class="font-bold mt-6 mb-2">{{ userInfo?.name }}</h3>
            <p>{{ userInfo?.employeeCode }}</p>
          </div>
        </div>
        <ul class="flex mt-18">
          <li class="ml-30">
            <img class="h-19 mb-4" src="./images/qr-code.png" alt="" />
            <p class="text">二维码</p>
          </li>
          <li class="ml-30">
            <img class="h-19 mb-4" src="./images/scan-qr-code-o.png" alt="" />
            <p class="text">扫描</p>
          </li>
          <li class="position-relative ml-30">
            <img class="h-19 mb-4" src="./images/message.png" alt="" />
            <var-badge type="danger" dot />
            <p class="text">消息</p>
          </li>
        </ul>
      </header>
      <div class="bg-welcome position-absolute top-110 mx-15 z-1000">
        <img class="w-305" src="./images/bg_welcome.png" alt="" />
      </div>
    </var-skeleton>
    <var-skeleton title card :rows="6" :loading="loading">
      <div class="menu position-relative flex-1 -mt-48 z-100">
        <ul class="main-menu w-full h-144 flex flex-wrap items-center">
          <li class="pt-64 justify-center flex flex-col items-center">
            <div class="position-relative">
              <img class="w-35 h-35" src="./images/icon-approve.png" alt="" />
              <var-badge class="icon-badge" type="danger" :value="188" :max-value="99" />
            </div>
            <p class="title mt-2">我的审批</p>
          </li>
        </ul>
        <div class="feature-menu mt-10 py-16">
          <strong class="block text-left px-20">功能服务</strong>
          <ul class="mt-12 w-full flex flex-wrap items-center">
            <li>
              <div class="position-relative">
                <img class="w-35 h-35" src="./images/icon-approve.png" alt="" />
              </div>
              <p class="title mt-2">我的审批</p>
            </li>
            <li>
              <div class="position-relative">
                <img class="w-35 h-35" src="./images/icon-approve.png" alt="" />
              </div>
              <p class="title mt-2">我的审批</p>
            </li>
            <li>
              <div class="position-relative">
                <img class="w-35 h-35" src="./images/icon-approve.png" alt="" />
              </div>
              <p class="title mt-2">我的审批</p>
            </li>
            <li>
              <div class="position-relative">
                <img class="w-35 h-35" src="./images/icon-approve.png" alt="" />
              </div>
              <p class="title mt-2">我的审批</p>
            </li>
          </ul>
        </div>
      </div>
    </var-skeleton>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'Home',
  };
</script>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useUserStore } from '/@/store/modules/user';

  const loading = ref(true);
  setTimeout(() => {
    loading.value = false;
  }, 1000);

  const { userInfo } = useUserStore();
  console.log('userInfo :>> ', userInfo);
</script>

<style lang="scss" scoped>
  .home {
    header {
      @include cube(100%, 197px);
      background: url('./images/header-bg.png') 0 / contain no-repeat;
      .avatar {
        @include square(55px);
        background: url('./images/avatar-bg.png') 0 / contain no-repeat;
      }
      .name {
        font-size: $--font-size-md;
        color: #fff;
        h3 {
          font-size: $--font-size-m-lg;
        }
      }
      ul {
        li {
          font-size: $--font-size-sm;
          color: #fff;
          :deep .var-badge {
            position: absolute;
            right: 1px;
            top: -6px;
            .var-badge--dot {
              width: 6px;
              height: 6px;
            }
          }
        }
      }
    }
    .bg-welcome {
      background: #1b51fc;
      border-radius: 15px;
      padding: 14px 20px;
    }
    .menu {
      .main-menu {
        background: url('./images/bg_board.png') 0 / contain no-repeat;
        background-size: cover;
      }
      .feature-menu {
        background: #fff;
        border-radius: 10px;
      }
      ul {
        li {
          width: 25%;
          :deep .var-badge {
            position: absolute;
            right: -20px;
            top: -10px;
          }
          .title {
            font-size: $--font-size-sm;
          }
        }
      }
    }
  }
</style>
