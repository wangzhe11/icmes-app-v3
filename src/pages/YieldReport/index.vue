<template>
  <div class="yield-report">
    <app-header :title="'产量报表'" @back="back" />
    <basic-list
      :dataList="list"
      :pageModel="pageModel"
      :getListApi="getProductionReportList"
      @update:dataList="getList"
      @update:pageModel="getPageModel"
    >
      <template #default>
        <ul class="list mt-10">
          <li class="px-13" v-for="item in list" :key="item.id">
            <var-cell
              :title="`${item.productionDate} ${item.workingShiftDetailName}`"
              class="cell text-left"
            >
              <template #extra> <div class="extra mr-20"> 1000 </div> </template></var-cell
            >
          </li>
        </ul>
      </template>
    </basic-list>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'YieldReport',
  };
</script>

<script lang="ts" setup>
  import { reactive } from 'vue';
  import { getProductionReportListApi } from '/@/api/production/reports';
  import {
    ProductionReportBaseModel,
    ProductionReportListParams,
  } from '/@/api/production/model/reportsModel';
  import { PageModel } from '/#/page-model';
  import dayjs from 'dayjs';
  import { useRouter } from 'vue-router';

  const searchData = reactive<ProductionReportListParams>({
    ascending: false,
    orderBy: 'ProductionDate',
    pageNo: 1,
    pageSize: 20,
  });
  let pageModel = reactive<PageModel>({
    pageNo: 1,
    totalPages: 0,
  });
  const list = ref<ProductionReportBaseModel[]>([]);
  const router = useRouter();

  const back = () => {
    console.log('router :>> ', router);
    router.back();
  };

  const getProductionReportList = async (pageNo: number) => {
    searchData.pageNo = pageNo;
    console.log('pageNo :>> ', pageNo, searchData);
    const { items, totalPages } = await getProductionReportListApi(searchData);
    items.forEach((item: ProductionReportBaseModel) => {
      item.productionDate = dayjs(item.productionDate).format('YYYY-MM-DD');
    });
    const result = {
      list: items,
      pageNo: pageNo,
      totalPages: totalPages,
    };

    return new Promise((resolve) => resolve(result));
  };

  const getList = (data: ProductionReportBaseModel[]) => {
    list.value = data;
  };
  const getPageModel = (data: PageModel) => {
    console.log('data :>> ', data);
    pageModel = data;
    searchData.pageNo = data.pageNo;
  };
</script>

<style lang="scss" scoped>
  .yield-report {
    .list {
      li {
        background: #fff;
        .cell {
          padding: 14px 0;
          padding-left: 10px;
          min-height: auto;
          @include border-bottom-1px($--border-color-default);
          font-size: $--font-size-lg;
        }
        .extra {
          font-size: $--font-size-md;
          color: $--font-color-dark;
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
        }
      }
    }
  }
</style>
