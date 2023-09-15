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
            <var-badge v-if="messageNum > 0" type="danger" :value="messageNum" :max-value="99" />
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
          <li
            class="pt-64 justify-center flex flex-col items-center"
            v-for="(item, key) in mainMenus"
            :key="key"
          >
            <div class="position-relative">
              <img class="h-35" :src="item.icon" alt="" />
              <var-badge
                v-if="
                  (item.name === 'myApprove' && approvalNum > 0) ||
                  (item.name === 'myTask' && taskNum > 0) ||
                  (item.name === 'carbonCopyMyself' && carbonNum > 0) ||
                  (item.name === 'safeProductionPlatform' && alarmNum > 0)
                "
                class="icon-badge"
                type="danger"
                :value="
                  item.name === 'myApprove'
                    ? approvalNum
                    : item.name === 'myTask'
                    ? taskNum
                    : item.name === 'carbonCopyMyself'
                    ? carbonNum
                    : alarmNum
                "
                :max-value="99"
              />
            </div>
            <p class="title mt-2">{{ item.title }}</p>
          </li>
        </ul>
        <div class="feature-menu mt-10 pt-16">
          <strong class="block text-left px-20">功能服务</strong>
          <ul class="mt-12 w-full flex flex-wrap items-center">
            <li class="mb-16" v-for="(item, key) in featureMenus" :key="key">
              <div class="position-relative">
                <img class="w-24 h-24" :src="item.icon" alt="" />
              </div>
              <p class="title mt-2">{{ item.title }}</p>
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
  import { mineActivityRoutes, otherRoutes } from './routes';
  import { getUnreadNotificationNumApi } from '/@/api/notice';
  import { getAlarmsNotStartNumApi } from '/@/api/issue/alarms';
  import { useNotification } from '/@/hooks/useCordova';

  const loading = ref(true);
  const approvalNum = ref(0);
  const carbonNum = ref(0);
  const taskNum = ref(0);
  const messageNum = ref(0);
  const alarmNum = ref(0);

  const mainMenus = ref<
    {
      name: string;
      title: string;
      icon: string;
    }[]
  >([]);
  const featureMenus = ref<
    {
      name: string;
      title: string;
      icon: string;
    }[]
  >([]);

  const { userInfo, getMenus: menus } = useUserStore();

  document.addEventListener('deviceready', useNotification, false);

  console.log('menus :>> ', menus);
  // 过滤出以9开头的菜单，移动端以9开头
  const mobileMenus = Object.entries(menus)
    .filter(([key]) => key.startsWith('9'))
    .reduce((acc: { [key: string]: any }, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});
  console.log('mobileMenus :>> ', mobileMenus);
  for (const index in mineActivityRoutes) {
    // 安全生产处置在92000当中，只能把92000加入其中
    for (const key in { ...menus['91000'].childs, ...menus['92000'].childs }) {
      const route = mineActivityRoutes[index];
      if (~~key == ~~index) {
        mainMenus.value.push({
          name: route.name,
          title: route.title,
          icon: route.icon,
        });
      }
    }
  }

  for (const index in otherRoutes) {
    for (const key in menus['92000'].childs) {
      const route = otherRoutes[index];
      if (~~key == ~~index) {
        featureMenus.value.push({
          name: route.name,
          title: route.title,
          icon: route.icon,
        });
      }
    }
  }

  getUnreadNum();

  async function getUnreadNum() {
    try {
      const data = await getUnreadNotificationNumApi();
      approvalNum.value = data.approvalNum;
      carbonNum.value = data.carbonNum;
      taskNum.value = data.taskNum;
      messageNum.value = data.messageNum;
      loading.value = false;

      // 安全生产处置报警数
      const { all } = await getAlarmsNotStartNumApi();
      alarmNum.value = all;
    } catch (error) {
      loading.value = false;
    }
  }
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
            right: -12px;
            top: -6px;
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
            right: -16px;
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
