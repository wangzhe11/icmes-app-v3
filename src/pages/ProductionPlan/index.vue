<template>
  <div class="production-plan">
    <app-header :title="'生产计划'" />
    <basic-list :getListApi="getProductionPlanList" :pageModel="pageModel" @setList="getList">
      <template #default>
        <ul class="list">
          <li class="px-12 pt-15 mt-10">
            <header class="flex justify-between px-9 pb-11">
              <p>JH20180920001</p>
              <p>20180920 - 20181001</p>
            </header>
            <var-cell :title="'计划本矿原煤,二号井原煤 290000吨'" class="cell text-left">
              <template #description>
                <div class="description mt-8">生产中</div>
              </template>
              <template #extra>
                <div class="extra">
                  <var-progress
                    class="progress mr-20"
                    mode="circle"
                    :value="75"
                    track-color="#EEEFEF"
                    color="linear-gradient(-47deg, #09e6bb, #00a6fc)"
                    :line-width="2"
                  />
                  <div class="circle">50%</div>
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
  import { ref } from 'vue';
  import { getProductionPlanListApi } from '/@/api/production/plan';
  import { ProductionPlanListParams } from '/@/api/production/model/planModel';
  import { PageModel } from '/#/page-model';

  const searchData = reactive<ProductionPlanListParams>({
    currentDateFlag: false,
    ascending: false,
    orderBy: 'StartDate',
    pageNo: 1,
    pageSize: 7,
  });
  const pageModel = reactive<PageModel>({
    pageNo: 1,
    pageSize: 7,
    totalCount: 0,
    totalPages: 0,
  });
  const list = ref([]);

  const getList = (value: any) => {
    console.log('value :>> ', value);
    value = [
      {
        aaa: '111',
      },
    ];
    list.value = value;
  };

  const getProductionPlanList = async (pageSize: number, pageNo: number) => {
    const { items, totalCount } = await getProductionPlanListApi(searchData);
    console.log('items :>> ', items);
    let start = pageSize * (pageNo - 1);
    let end = pageSize * pageNo;
    let tempList = items.slice(start, end);
    const result = {
      code: 200,
      message: 'success',
      data: {
        list: tempList,
        pageNo: pageNo,
        pageSize: pageSize,
        totalCount: totalCount,
        totalPages: Math.ceil(totalCount / 15),
      },
    };

    return new Promise((resolve) => resolve(result));
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
          padding: 11px 0 11px 9px;
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
              background: linear-gradient(-47deg, #09e6bb, #00a6fc);
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
