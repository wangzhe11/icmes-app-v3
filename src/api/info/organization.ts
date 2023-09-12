import request from '/@/utils/request';
import { DepartmentListParams, DepartmentListResultModel } from './model/organizationModel';

enum Api {
  baseUrl = '/info/organizations/',
}

/** 组织机构查询 */
export function getDepartmentListApi(data: DepartmentListParams, config = { showLoading: true }) {
  return request<any, DepartmentListResultModel>({
    config,
    url: Api.baseUrl + 'list/',
    method: 'post',
    data,
  });
}
