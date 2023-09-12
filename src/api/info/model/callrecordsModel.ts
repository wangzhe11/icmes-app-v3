import { BasicFetchListResult } from '../../model/baseModel';

export interface OrganizationListParams {
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

export interface EmployeesListParams {
  /** 是否正序 */
  ascending?: boolean;
  /** 员工类型 */
  category?: string;
  /** 员工工号 */
  code?: string;
  /** 模糊查询 */
  globalName?: string;
  /** 入职结束时间 */
  joinDateEnd?: number;
  /** 入职开始时间 */
  joinDateStart?: number;
  /** 员工名称 */
  name?: string;
  /** 排序的字段名 */
  orderBy?: string;
  /** 组织机构 */
  organizationId?: number;
  /** 当前页码数 */
  pageNo?: number;
  /** 一页多少条记录 0标识不分页全部显示 */
  pageSize?: number;
  /** 专用设备号 */
  specialDevice?: string;
  /** 工种 */
  workType?: string;
}

export type EmployeesListResultModel = BasicFetchListResult<CallRecordEmployeesModel>;

export interface CallRecordEmployeesModel {
  /** 头像 */
  avatar: string;
  /** 员工工号 */
  code: string;
  /** 员工标识 */
  employeeId: number;
  /** 组织机构全名 */
  fullName: string;
  /** 父级组织机构id集合 */
  fullOrganizationIds: string[];
  /** 用户标识 */
  id: number;
  /** 是否员工 */
  isEmployee: boolean;
  /** 手机号 */
  mobilePhone: string;
  /** 员工名称 */
  name: string;
  /** 员工办公室电话 */
  officePhone: string;
  /** 员工办公室电话区号 */
  officePhoneArea: string;
  /** 员工办公室电话分机号 */
  officePhoneExt: string;
  /** 员工所属组织机构id */
  organizationId: number;
  /** 专用设备号 */
  specialDevice: string;
  /** 员工工种 */
  workType: string;
}

export type OrganizationListResultModel = BasicFetchListResult<CallRecordOrganizationsModel>;

export interface CallRecordOrganizationsModel {
  /** 子集 */
  children?: CallRecordOrganizationsModel[];
  /** 组织机构全称 */
  fullName: string;
  /** 父级组织机构id集合 */
  fullOrganizationIds: string[];
  /** 是否有子集 */
  hasChild?: boolean;
  /** 组织机构ID */
  id: number;
  /** 是否员工 */
  isEmployee: boolean;
  /** 组织机构名称 */
  name: string;
  /** 父级机构ID */
  parentId?: number;
  /** 电话 */
  phone?: string;
}
