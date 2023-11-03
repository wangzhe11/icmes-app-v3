<template>
  <div class="production-plan">
    <app-header :title="'生产计划'" @back="back" />
    <basic-list
      :dataList="list"
      :pageModel="pageModel"
      :getListApi="getProductionPlanList"
      @update:dataList="getList"
      @update:pageModel="getPageModel"
    >
      <template #default>
        <ul class="list">
          <li class="p-12 mt-10" v-for="item in list" :key="item.id">
            <header class="flex justify-between pb-11">
              <p>{{ item.code }}</p>
              <p
                >{{ dateFormat(item.startDate, 'YYYYMMDD') }} -
                {{ dateFormat(item.endDate, 'YYYYMMDD') }}</p
              >
            </header>
            <var-cell :title="item.title" class="cell text-left">
              <template #description>
                <!--0 - 待生产 1 - 生产中 2 - 已结束-->
                <div class="description mt-8">{{
                  item.status === 0 ? '待生产' : item.status === 1 ? '生产中' : '已结束'
                }}</div>
              </template>
              <template #extra>
                <div class="extra">
                  <var-progress
                    class="progress mr-20"
                    mode="circle"
                    :value="item.progressPercent"
                    track-color="#EEEFEF"
                    :color="
                      item.statistics.currentPlanWashing <= item.statistics.currentRealWashing
                        ? {
                            '0%': '#09e6bb',
                            '100%': '#00a6fc',
                          }
                        : {
                            '0%': '#FF973A',
                            '100%': '#ED3A3E',
                          }
                    "
                    :line-width="2"
                  />
                  <div
                    class="circle"
                    :style="{
                      background:
                        item.statistics.currentPlanWashing <= item.statistics.currentRealWashing
                          ? 'linear-gradient(-47deg, #09e6bb, #00a6fc)'
                          : 'linear-gradient(-47deg, #FF973A, #ED3A3E)',
                    }"
                    >{{ item.progressPercent }}%</div
                  >
                </div>
              </template>
            </var-cell>
          </li>
        </ul>
      </template>
    </basic-list>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'ProductionPlan',
  };
</script>

<script lang="ts" setup>
  import { getProductionPlanListApi } from '/@/api/production/plan';
  import {
    ProductionPlanBaseModel,
    ProductionPlanListParams,
  } from '/@/api/production/model/planModel';
  import { PageModel } from '/#/page-model';
  import { getDictName } from '/@/hooks/useDict';
  import { usePrecision } from '@vueuse/math';
  import { dateFormat } from '/@/utils/dateHelper';

  const searchData = reactive<ProductionPlanListParams>({
    currentDateFlag: false,
    ascending: false,
    orderBy: 'StartDate',
    pageNo: 1,
    pageSize: 7,
  });
  let pageModel = reactive<PageModel>({
    pageNo: 1,
    totalPages: 0,
  });
  const list = ref<(ProductionPlanBaseModel & { title?: string; progressPercent?: number })[]>([]);
  const router = useRouter();

  const back = () => {
    router.back();
  };

  const getProductionPlanList = async (pageNo: number) => {
    searchData.pageNo = pageNo;
    console.log('pageNo :>> ', pageNo, searchData);
    const { items, totalPages } = await getProductionPlanListApi(searchData);
    (items || []).forEach(
      (item: ProductionPlanBaseModel & { title?: string; progressPercent?: number }) => {
        item.title = `计划${item.productionName} ${
          item.statistics?.planWashingTotal || 0
        }${getDictName('DT_UM', item.unit)}`;

        item.progressPercent =
          item.statistics.planWashingTotal === 0 || item.statistics.currentRealWashing === 0
            ? 0
            : calcProgress(item.statistics.currentRealWashing, item.statistics.planWashingTotal) >
              100
            ? 100
            : item.statistics.planWashingTotal === 0 || item.statistics.currentRealWashing === 0
            ? 0
            : calcProgress(item.statistics.currentRealWashing, item.statistics.planWashingTotal);
      },
    );
    const result = {
      list: items,
      pageNo: pageNo,
      totalPages: totalPages,
    };

    return new Promise((resolve) => resolve(result));
  };

  const getList = (data: ProductionPlanBaseModel[]) => {
    list.value = data;
  };
  const getPageModel = (data: PageModel) => {
    console.log('data :>> ', data);
    pageModel = data;
    searchData.pageNo = data.pageNo;
  };

  const calcProgress = (currentRealWashing: number, planWashingTotal: number) => {
    // 计算进度
    const progress = currentRealWashing / planWashingTotal;
    return usePrecision((progress * 10000) / 100, 0) as unknown as number;
  };
</script>

<style lang="scss" scoped>
  .production-plan {
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
          :deep .var-cell__title {
            font-size: $--font-size-lg;
          }
          .description {
            font-size: $--font-size-md;
          }
          .extra {
            position: relative;
            .progress {
              :deep .var-progress__circle {
                width: 53px !important;
                height: 53px !important;
              }
            }
            .circle {
              position: absolute;
              top: 4.5px;
              right: 24.5px;
              @include radiusCube(44px);
              line-height: 46px;
              font-size: $--font-size-lg;
              text-align: center;
              color: #fff;
            }
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
  }
</style>
