<template>
  <div class="repair-order">
    <app-header :title="'报修单'" @back="back" />
    <var-sticky z-index="4000" :offset-top="'40px'">
      <ul id="dropdown-menu-list" class="dropdown-menu-list flex" ref="modalRef">
        <li>
          <var-menu
            class="item"
            placement="bottom-start"
            v-model:show="statusShow"
            @open="statusShow = true"
          >
            <p class="h-40">状态</p>
            <template #menu>
              <var-cell
                class="cell"
                v-for="item in statusList"
                :key="item.value"
                :class="{ on: item.value === searchData.status[0] }"
                @click="changeStatus(item.value)"
                >{{ item.label }}</var-cell
              >
            </template>
          </var-menu>
        </li>
        <li>
          <var-menu
            class="item"
            placement="bottom-start"
            v-model:show="emergencyLevelShow"
            @open="emergencyLevelShow = true"
          >
            紧急程度
            <template #menu>
              <var-cell
                class="cell"
                v-for="item in emergencyLevelList"
                :key="item.value"
                :class="{ on: item.value === searchData.emergencyLevel[0] }"
                @click="changeEmergencyLevel(item.value)"
                >{{ item.label }}</var-cell
              >
            </template>
          </var-menu>
        </li>
        <li>
          <p class="item" block @click.stop="departmentShow = !departmentShow">报修部门</p>
        </li>
        <li>
          <!-- <var-menu class="item" placement="bottom-start" v-model:show="departmentShow">
            报修部门
            <template #menu> -->
          <!-- <var-popup class="department-dialog" position="top" v-model:show="departmentShow">
                <choose-department />
              </var-popup> -->
          <!-- </template>
          </var-menu> -->
        </li>
      </ul>
    </var-sticky>
    <div class="content"> 11 </div>
  </div>
  <var-popup class="department-dialog" position="top" v-model:show="departmentShow">
    <div v-on-click-outside.bubble="dropdownHandler">
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
  import { getDictOptions } from '/@/hooks/useDict';
  import { RepairOrderListParams } from '../../api/maintenance/model/repairOrdersModel';
  import { OnClickOutsideHandler } from '@vueuse/core';
  import { vOnClickOutside } from '@vueuse/components';

  const router = useRouter();
  const searchData = reactive({
    emergencyLevel: [],
    globalName: '',
    pageNo: 1,
    pageSize: 15,
    ascending: false,
    orderBy: 'createTime',
    status: [],
  }) as RepairOrderListParams;
  const statusShow = ref(false);
  const statusList = getDictOptions('BT_REPAIR_ORDER_STATUS');

  const emergencyLevelShow = ref(false);
  const emergencyLevelList = getDictOptions('EMERGENCY_LEVEL');

  const departmentShow = ref(false);

  const modalRef = ref(null);

  const back = () => {
    router.back();
  };
  const changeStatus = (value: string) => {
    searchData.status = [value];
    statusShow.value = false;
  };
  const changeEmergencyLevel = (value: string) => {
    searchData.emergencyLevel = [value];
    emergencyLevelShow.value = false;
  };

  const dropdownHandler: OnClickOutsideHandler = (event) => {
    console.log(event);
    departmentShow.value = false;
  };

  const getOrganizationId = (value: number) => {
    searchData.organizationId = value;
    departmentShow.value = false;
  };

  const resetOrganizationId = () => {
    delete searchData.organizationId;
    departmentShow.value = false;
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
        height: 40px;
        line-height: 40px;
        .item {
          flex: 1;
          font-size: $--font-size-md;
        }
      }
    }
    .content {
      position: relative;
      flex: 1;
      z-index: 200;
    }
  }
</style>

<style lang="scss">
  .var-menu__menu {
    width: 100%;
    left: 0 !important;
    .cell {
      padding: 10px 16px;
      &.on {
        color: $--theme-color-main;
      }
    }
  }

  .department-dialog {
    top: 80px !important;
  }
</style>
