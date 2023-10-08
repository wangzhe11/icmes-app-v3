import request from '/@/utils/request';
import { RepairOrderListParams, RepairOrderListResultModel } from './model/repairOrdersModel';

enum Api {
  baseUrl = '/maintenance/repairOrders/',
}

/** 获取消息列表 */
export function getRepairOrderListApi(data: RepairOrderListParams, config = { showLoading: true }) {
  return request<any, RepairOrderListResultModel>({
    config,
    url: Api.baseUrl + 'list',
    method: 'post',
    data,
  });
}
