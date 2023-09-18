import request from '/@/utils/request';
import { ProductionReportListParams, ProductionReportListResultModel } from './model/reportsModel';

enum Api {
  baseUrl = '/production/reports/',
}

/** 按照班次日期查询生产报表查询列表 */
export function getProductionReportListApi(
  data: ProductionReportListParams,
  config = { showLoading: true },
) {
  return request<any, ProductionReportListResultModel>({
    config,
    url: Api.baseUrl + 'list/',
    method: 'post',
    data,
  });
}
