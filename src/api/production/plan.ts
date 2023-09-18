import request from '/@/utils/request';
import { ProductionPlanListParams, ProductionPlanListResultModel } from './model/planModel';

enum Api {
  baseUrl = '/production/plans/',
}

/** 生产计划查询列表 */
export function getProductionPlanListApi(
  data: ProductionPlanListParams,
  config = { showLoading: true },
) {
  return request<any, ProductionPlanListResultModel>({
    config,
    url: Api.baseUrl + 'list/',
    method: 'post',
    data,
  });
}
