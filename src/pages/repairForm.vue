<template>
  <div class="repair-order">
    <app-header :title="'报修单'" @back="back" />
    <var-sticky z-index="2300" :offset-top="'40px'">
      <ul id="dropdown-menu-list" class="dropdown-menu-list flex">
        <li>
          <p class="item flex-1" :class="{ on: statusShow }" block @click.stop="toggleStatus"
            >状态</p
          >
          <var-badge v-if="repairNum" type="danger" :value="repairNum" :max-value="99" />
        </li>
        <li>
          <p
            class="item flex-1"
            :class="{ on: emergencyLevelShow }"
            block
            @click.stop="toggleEmergencyLevel"
            >紧急程度</p
          >
        </li>
        <li>
          <p
            class="item flex-1"
            :class="{ on: departmentShow }"
            block
            @click.stop="toggleDepartment"
            >报修部门</p
          >
        </li>
        <li class="justify-center">
          <p class="item mr-6" block>搜索</p>
          <var-icon class="icon" name="magnify" color="#bebebe" />
        </li>
      </ul>
    </var-sticky>
    <var-sticky z-index="1000">
      <ul class="quick-search-list flex px-12 py-7">
        <li v-for="(item, key) in quickSearchList" :key="key">
          <var-button
            ref="quickSearchItemRef"
            class="btn"
            text
            :class="{ on: activeIndex === key }"
            @click="quickSearch(item, key)"
            >{{ item.value }}</var-button
          >
        </li>
      </ul>
    </var-sticky>
    <div class="content">
      <basic-list
        ref="basicListRef"
        :dataList="list"
        :getListApi="getRepairOrderList"
        :pageModel="pageModel"
        @update:dataList="getList"
        @update:pageModel="getPageModel"
      >
        <template #default>
          <ul v-if="list.length" class="list">
            <li class="p-12 mb-10" v-for="item in list" :key="item.id">
              <header class="flex justify-between pb-12">
                <p>{{ item.code }}</p>
                <p>{{ dateFormat(item.createTime, 'YYYY-MM-DD HH:mm') }}</p>
              </header>
              <var-cell class="cell text-left">
                <template #default>
                  <p class="title flex items-center">
                    <var-ellipsis style="max-width: 170px">
                      {{ item.content }}
                    </var-ellipsis>
                    <var-chip
                      class="ml-10 label"
                      type="primary"
                      size="mini"
                      :round="false"
                      color="#feeeeb"
                      text-color="#ed3a3e"
                      >{{ getDictName('EMERGENCY_LEVEL', item.emergencyLevel) }}
                    </var-chip></p
                  >
                </template>
                <template #description>
                  <div class="description mt-8">{{ item.processNo }}{{ item.deviceName }}</div>
                </template>
                <template #extra>
                  <div class="extra text-right mr-20">
                    <p class="status">{{ getDictName('BT_REPAIR_ORDER_STATUS', item.status) }}</p>
                    <p class="gray mt-8">{{ item.createUserName }}</p>
                  </div>
                </template>
              </var-cell>
            </li>
          </ul>
          <empty v-else :message="'暂无报修单'" />
        </template>
      </basic-list>
    </div>
    <div class="actions flex justify-between p-10">
      <var-button
        color="linear-gradient(45deg, #00a6fb, #1787ff)"
        text-color="#fff"
        class="btn w-full"
        @click="create"
      >
        新建
      </var-button>
    </div>
  </div>

  <var-popup class="custom-dialog" position="top" v-model:show="statusShow">
    <div v-on-click-outside.bubble="statusHide">
      <var-cell
        class="cell"
        v-for="item in statusList"
        :key="item.value"
        :class="{ on: item.value === searchData.status[0] }"
        @click="changeStatus(item.value)"
        >{{ item.label
        }}<var-icon
          v-if="item.value === searchData.status[0]"
          name="check-circle-outline"
          class="ml-10"
      /></var-cell>
      <div class="actions w-full left-0 bottom-0 px-16 py-10">
        <var-button
          class="btn w-full"
          color="linear-gradient(45deg, #00a6fb, #1787ff)"
          text-color="#fff"
          @click="resetStatus"
          >重置</var-button
        >
      </div>
    </div>
  </var-popup>

  <var-popup class="custom-dialog" position="top" v-model:show="emergencyLevelShow">
    <div v-on-click-outside.bubble="emergencyLevelHide">
      <var-cell
        class="cell"
        v-for="item in emergencyLevelList"
        :key="item.value"
        :class="{ on: item.value === searchData.emergencyLevel[0] }"
        @click="changeEmergencyLevel(item.value)"
        >{{ item.label
        }}<var-icon
          v-if="item.value === searchData.emergencyLevel[0]"
          name="check-circle-outline"
          class="ml-10"
      /></var-cell>
      <div class="actions w-full left-0 bottom-0 px-16 py-10">
        <var-button
          class="btn w-full"
          color="linear-gradient(45deg, #00a6fb, #1787ff)"
          text-color="#fff"
          @click="resetEmergencyLevel"
          >重置</var-button
        >
      </div>
    </div>
  </var-popup>

  <var-popup class="custom-dialog" position="top" v-model:show="departmentShow">
    <div v-on-click-outside.bubble="departmentHide">
      <choose-department
        :selected-organization-id="searchData.organizationId"
        @organization-id="getOrganizationId"
        @reset="resetOrganizationId"
      />
    </div>
  </var-popup>
</template>

<script lang="ts">
  export default {
    name: 'RepairOrder',
  };
</script>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { getDictOptions, getDictName } from '/@/hooks/useDict';
  import {
    CurrnetReapirNum,
    RepairOrderBaseModel,
    RepairOrderListParams,
  } from '/@/api/maintenance/model/repairOrdersModel';
  import { getRepairOrderListApi } from '/@/api/maintenance/repairOrders';
  import { PageModel } from '/#/page-model';
  import { OnClickOutsideHandler } from '@vueuse/core';
  import { vOnClickOutside } from '@vueuse/components';
  import { dateFormat } from '/@/utils/dateHelper';

  interface QuickSearchItem {
    key: string;
    value: string;
    selected: boolean;
  }

  const router = useRouter();
  const searchData = reactive({
    emergencyLevel: [],
    globalName: '',
    overdue: false,
    pageNo: 1,
    pageSize: 15,
    ascending: false,
    orderBy: 'createTime',
    status: [],
  }) as RepairOrderListParams;
  let pageModel = reactive<PageModel>({
    pageNo: 1,
    totalPages: 0,
  });
  const list = ref<RepairOrderBaseModel[]>([]);

  const statusShow = ref(false);
  const statusList = getDictOptions('BT_REPAIR_ORDER_STATUS');

  const emergencyLevelShow = ref(false);
  const emergencyLevelList = getDictOptions('EMERGENCY_LEVEL');

  const departmentShow = ref(false);

  const quickSearchItemRef = ref();
  const quickSearchList = ref([
    {
      key: '1',
      value: '当天上报',
      selected: false,
    },
    {
      key: '2',
      value: '我的待办',
      selected: false,
    },
    {
      key: '3',
      value: '已超期的',
      selected: false,
    },
  ]);

  const activeIndex = ref(-1);

  const repairNum = ref(0);

  const basicListRef = ref();

  // 是否可以分配报修单
  let isAssign = ref(false);

  const currentRepairNum = ref<CurrnetReapirNum[]>([]);

  const back = () => {
    router.back();
  };

  const refresh = () => {
    searchData.pageNo = 1;
    list.value = [];
    console.log('basicListRef.value :>> ', basicListRef.value?.['getList']);
    basicListRef.value.getList();
  };

  const getRepairOrderList = async (pageNo: number) => {
    const { items, totalPages, currnetReapirNum, assign } = await getRepairOrderListApi(searchData);
    console.log('items :>> ', items);
    isAssign.value = assign;
    currentRepairNum.value = currnetReapirNum;
    // 只有待分配、待处理、处理-已解决显示数量
    switch (searchData.status[0]) {
      case 'REPAIR_WAIT_ASSIGNED':
        repairNum.value = currentRepairNum.value.find((item) => {
          return item.show && item.type === 'assign';
        })?.num as number;
        break;
      case 'REPAIR_WAIT_PROCESS':
        repairNum.value = currentRepairNum.value.find((item) => {
          return item.show && item.type === 'process';
        })?.num as number;
        break;
      case 'REPAIR_PROCESSED_RESOLVED':
        repairNum.value = currentRepairNum.value.find((item) => {
          return item.show && item.type === 'accept';
        })?.num as number;
        break;
    }

    const result = {
      list: items,
      pageNo: pageNo,
      totalPages: totalPages,
    };

    console.log('result :>> ', result);

    return new Promise((resolve) => resolve(result));
  };

  const getList = (data: RepairOrderBaseModel[]) => {
    console.log('data :>> ', data);
    list.value = data || [];
  };
  const getPageModel = (data: PageModel) => {
    console.log('data :>> ', data);
    pageModel = data;
    searchData.pageNo = data.pageNo;
  };

  const changeStatus = (value: string) => {
    searchData.status = [value];
    statusShow.value = false;
    refresh();
  };
  const changeEmergencyLevel = (value: string) => {
    searchData.emergencyLevel = [value];
    emergencyLevelShow.value = false;
    refresh();
  };

  const getOrganizationId = (value: number) => {
    searchData.organizationId = value;
    departmentShow.value = false;
    refresh();
  };

  const resetOrganizationId = () => {
    delete searchData.organizationId;
    departmentShow.value = false;
  };

  const toggleStatus = () => {
    emergencyLevelShow.value = departmentShow.value = false;
    statusShow.value = !statusShow.value;
  };
  const statusHide: OnClickOutsideHandler = (event) => {
    console.log(event);
    statusShow.value = false;
  };

  const toggleEmergencyLevel = () => {
    statusShow.value = departmentShow.value = false;
    emergencyLevelShow.value = !emergencyLevelShow.value;
  };
  const emergencyLevelHide: OnClickOutsideHandler = (event) => {
    console.log(event);
    emergencyLevelShow.value = false;
  };

  const toggleDepartment = () => {
    statusShow.value = emergencyLevelShow.value = false;
    departmentShow.value = !departmentShow.value;
  };
  const departmentHide: OnClickOutsideHandler = (event) => {
    console.log(event);
    departmentShow.value = false;
  };

  const resetStatus = () => {
    searchData.status = [];
    statusShow.value = false;
    refresh();
  };

  const resetEmergencyLevel = () => {
    searchData.emergencyLevel = [];
    emergencyLevelShow.value = false;
    refresh();
  };

  const create = () => {
    router.push({
      path: '/repairorder/editrepairorder',
    });
  };

  const quickSearch = (item: QuickSearchItem, key: number) => {
    const quickSearchItem = quickSearchItemRef.value[key];
    console.log('quickSearchItem :>> ', quickSearchItem, item);
    if (quickSearchItem.$el.classList.contains('on')) {
      activeIndex.value = -1;
    } else {
      activeIndex.value = key;
    }
    searchData.status = [];
    searchData.overdue = false;
    searchData.reportStartTime = null;
    searchData.reportEndTime = null;
    switch (item.key) {
      case '1':
        // 获取当天零点毫秒值
        searchData.reportStartTime = new Date(new Date().getTime()).setHours(0, 0, 0, 0);
        // 获取当天23:59毫秒值
        searchData.reportEndTime = new Date(new Date().getTime()).setHours(23, 59, 0, 0);
        break;
      // 我的待办(包括待我分配、待我处理、处理-已解决以及分配退回和处理退回的单据)
      case '2':
        searchData.status = [
          'REPAIR_WAIT_ASSIGNED',
          'REPAIR_WAIT_PROCESS',
          'REPAIR_PROCESSED_SOLVED',
          'REPAIR_ASSIGN_RETURN',
          'REPAIR_PROCESSED_RETURN',
        ];
        break;
      case '3':
        searchData.overdue = true;
        break;
    }
    refresh();
  };
</script>

<style lang="scss" scoped>
  .repair-order {
    height: 100%;
    display: flex;
    flex-direction: column;
    .dropdown-menu-list {
      position: relative;
      z-index: 4000;
      background: #fff;
      li {
        width: 20%;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 40px;
        .item {
          font-size: $--font-size-md;
          &.on {
            color: $--theme-color-main;
          }
          .icon {
            font-size: $--font-size-md;
          }
        }
        .var-badge {
          position: absolute;
          top: 2px;
          left: 56px;
        }
      }
    }
    .quick-search-list {
      li {
        .btn {
          border-radius: 22px;
          height: 28px;
          font-size: $--font-size-sm;
          padding: 0 8px;
          margin-right: 10px;
          color: #666;
          background: #fff;
          &.on {
            background: #e4f1fd;
            @include border-1px-radius($--theme-color-main, 22px);
            color: $--theme-color-main;
          }
        }
      }
    }
    .content {
      position: relative;
      flex: 1;
      z-index: 200;
      .list {
        li {
          background: #fff;
          header {
            font-size: $--font-size-md;
            @include border-bottom-1px($--border-color-default);
            color: $--font-color-dark;
          }
          .cell {
            position: relative;
            padding: 0;
            padding-top: 12px;
            :deep .var-cell__content {
              flex: 4;
              .title {
                font-size: $--font-size-lg;
                .label {
                  font-size: $--font-size-sm;
                  padding: 0 2px;
                  border-radius: 5px;
                }
              }
              .description {
                font-size: $--font-size-md;
                color: $--font-color-dark;
              }
            }
            :deep .var-cell__extra {
              flex: 2;
              .extra {
                &:after {
                  position: absolute;
                  border: 2px solid $--theme-color-light;
                  border-bottom-width: 0;
                  border-left-width: 0;
                  content: ' ';
                  top: 50%;
                  right: 0;
                  width: 10px;
                  height: 10px;
                  transform: translateY(-50%) rotate(45deg);
                }
                .status {
                  color: $--theme-color-main;
                }
                .gray {
                  color: $--font-color-dark;
                }
              }
            }
          }
        }
      }
    }
    .actions {
      width: 100%;
      background: #fff;
      .btn {
        border-radius: 25px;
        font-size: $--font-size-lg;
      }
    }
  }
</style>

<style lang="scss">
  .custom-dialog {
    top: 80px !important;
    .cell {
      padding: 10px 16px;
      &.on {
        color: $--theme-color-main;
      }
    }
    .actions {
      background: #fff;
      .btn {
        bottom: 0;
        border-radius: 25px;
        font-size: $--font-size-lg;
      }
    }
  }
</style>
