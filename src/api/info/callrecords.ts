import {
  EmployeesListParams,
  EmployeesListResultModel,
  OrganizationListParams,
  OrganizationListResultModel,
} from './model/callrecordsModel';
import request from '/@/utils/request';

enum Api {
  baseUrl = '/info/callrecords/',
}

/** 获取组织机构列表 */
export function getOrganizationListApi(
  data: OrganizationListParams,
  config = { showLoading: true },
) {
  return request<any, OrganizationListResultModel>({
    config,
    url: Api.baseUrl + 'organization/list/',
    method: 'post',
    data,
  });
}

/** 获取员工列表 */
export function getEmployeesListApi(data: EmployeesListParams, config = { showLoading: true }) {
  return request<any, EmployeesListResultModel>({
    config,
    url: Api.baseUrl + 'employees/list/',
    method: 'post',
    data,
  });
}
