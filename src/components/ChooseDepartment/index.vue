<template>
  <div class="choose-department" ref="chooseDepartmentRef">
    <div v-if="commonDepartmentList.length" class="common-department">
      <p class="title px-16 py-8">常用部门</p>
      <ul class="common-department-list flex flex-wrap px-16 py-8">
        <li
          class="mr-10 px-8 py-5"
          :class="item.id === currentDepartmentId ? 'on' : ''"
          v-for="item in commonDepartmentList"
          :key="item.id"
          >{{ item.name }}</li
        >
      </ul>
    </div>
    <div class="all-department">
      <var-breadcrumbs class="breadcrumbs px-16 py-8">
        <var-breadcrumb
          v-for="(item, key) in breadcrumbList"
          :key="key"
          @click="changeBreadCrumb(key)"
        >
          {{ item.name }}
          <template #separator>
            <var-icon name="chevron-right" style="margin: 1px 4px 0" />
          </template>
        </var-breadcrumb>
      </var-breadcrumbs>
      <ul :style="{ marginBottom: componentHeight >= screenHeight - 80 ? '60px' : '0' }">
        <li
          class="px-16"
          v-for="item in allDepartmentList"
          :key="item.id"
          @click="chooseDepartment(item)"
        >
          <var-cell class="cell" :title="item.name">
            <template v-if="item.children.length" #extra>
              <img
                class="w-16 h-16"
                src="./images/icon_children_department.png"
                @click.stop="showChildrenDept(item)"
                alt=""
              />
            </template>
          </var-cell>
        </li>
      </ul>
    </div>
    <div
      class="actions w-full left-0 bottom-0 px-16 py-10"
      :style="{ position: componentHeight >= screenHeight - 80 ? 'fixed' : 'relative' }"
    >
      <var-button
        class="btn w-full"
        color="linear-gradient(45deg, #00a6fb, #1787ff)"
        text-color="#fff"
        @click="reset"
        >重置</var-button
      >
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'ChooseDepartment',
  };
</script>

<script lang="ts" setup>
  import { useUserStore } from '/@/store/modules/user';
  import { DepartmentListModel } from '/@/api/info/model/organizationModel';

  interface breadcrumbModel {
    id: number;
    name: string;
    data: DepartmentListModel[];
  }

  interface ElType extends HTMLElement {
    parentNode: any;
  }

  const { departmentTree } = useUserStore();

  const emit = defineEmits(['organizationId', 'reset']);

  // const props = defineProps({
  //   selectedOrganizationId: {
  //     type: Number,
  //     default: null,
  //   },
  // });

  // 组件本身高度
  const componentHeight = ref(0);
  // 屏幕高度
  const screenHeight = window.screen.height;

  const chooseDepartmentRef = ref<ElType>();
  // 常用部门列表
  const commonDepartmentList = ref<DepartmentListModel[]>([]);
  // 部门列表
  let allDepartmentList = ref<DepartmentListModel[]>([]);
  // 面包屑列表
  const breadcrumbList = ref<breadcrumbModel[]>([]);
  // 当前部门id
  const currentDepartmentId = ref<number | null>(null);

  watch(
    () => allDepartmentList.value,
    () => {
      nextTick(() => {
        componentHeight.value = chooseDepartmentRef.value?.offsetHeight as number;
      });
    },
  );

  const getDepartmentList = () => {
    allDepartmentList.value = departmentTree![0].children;
    breadcrumbList.value.push({
      id: departmentTree![0].id,
      name: departmentTree![0].name,
      data: departmentTree![0].children,
    });
  };
  getDepartmentList();

  const showChildrenDept = (parentItem: DepartmentListModel) => {
    console.log('showChildrenDept :>> ');
    const currentDepartment = allDepartmentList.value.find((item) => {
      return item.id === parentItem.id;
    });
    allDepartmentList.value = currentDepartment!.children;

    breadcrumbList.value.push({
      id: parentItem.id,
      name: parentItem.name,
      data: currentDepartment!.children,
    });
  };

  const changeBreadCrumb = (key: number) => {
    breadcrumbList.value.splice(key + 1);
    allDepartmentList.value = breadcrumbList.value[key].data;
  };

  const chooseDepartment = (item: DepartmentListModel) => {
    componentHeight.value = chooseDepartmentRef.value?.offsetHeight as number;
    currentDepartmentId.value = item.id;
    commonDepartmentList.value = commonDepartmentList.value.filter((val) => val.id !== item.id);
    commonDepartmentList.value.unshift(item);
    emit('organizationId', item.id);
  };

  const reset = () => {
    breadcrumbList.value = [];
    getDepartmentList();
    currentDepartmentId.value = null;
    emit('reset');
  };
</script>

<style lang="scss" scoped>
  .choose-department {
    .common-department,
    .all-department {
      background: #f3f3f3;
      .title {
        font-size: $--font-size-md;
        color: $--font-color-light;
      }
      .common-department-list {
        background: #fff;
        @include border-top-1px($--border-color-default);
        font-size: $--font-size-md;
        .on {
          background: $--theme-color-main;
          color: #fff;
          border-radius: 5px;
        }
      }
      .breadcrumbs {
        font-size: $--font-size-md;
      }
      li {
        background: #fff;
        .cell {
          padding: 0;
          @include border-bottom-1px($--border-color-default);
        }
        &:last-child {
          ::after {
            display: none;
          }
        }
      }
    }
    .actions {
      background: #fff;
      z-index: 3000;
      .btn {
        bottom: 0;
        border-radius: 25px;
        font-size: $--font-size-lg;
      }
    }
  }
</style>
