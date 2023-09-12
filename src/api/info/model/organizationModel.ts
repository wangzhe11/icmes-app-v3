import { BasicFetchListResult } from '../../model/baseModel';
export interface DepartmentListParams {
  /** 是否正序 */
  ascending?: boolean;
  /** 厂商编号 */
  code?: string;
  /** 全局搜索 */
  globalName?: string;
  /** 厂商名称 */
  name?: string;
  /** 排序的字段名 */
  orderBy?: string;
  /** 当前页码数 */
  pageNo?: number;
  /** 一页多少条记录 0标识不分页全部显示 */
  pageSize?: number;
  /** 厂商类型 */
  type?: string;
}

export type DepartmentListResultModel = BasicFetchListResult<DepartmentListModel>;

export interface DepartmentListModel {
  /** 组织机构code */
  code: string;
  /** 组织机构全称 */
  fullName: string;
  /** 是否有子集 */
  hasChild: boolean;
  /** 子集 */
  children: DepartmentListModel[];
  /** 组织机构ID */
  id: number;
  /** 是否员工 */
  isEmployee: boolean;
  /** 组织机构名称 */
  name: string;
  /** 父级机构全称 */
  parentFullName: string;
  /** 父级机构ID */
  parentId: number;
  /** 电话 */
  phone: string;
  /** 版本标志 */
  versionTag: string;
}
