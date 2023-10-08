import { BasicFetchListResult } from '../../model/baseModel';

export enum EmergencyLevel {
  'A' = 'A类',
  'B' = 'B类',
}

export interface RepairOrderListParams {
  /** 是否正序 */
  ascending?: boolean;
  /** 紧急程度 A - A类 B - B类 */
  emergencyLevel: string[] | [];
  /** 模糊查询 设备名称/工艺号/报修单 */
  globalName?: string;
  /** 排序的字段名 */
  orderBy?: string;
  /** 报修单位 */
  organizationId?: number;
  /** 当前页码数 */
  pageNo?: number;
  /** 一页多少条记录 0标识不分页全部显示 */
  pageSize?: number;
  /** 报修处理结果 */
  processResults?: string[];
  /** 报修结束时间 */
  reportEndTime?: number;
  /** 报修开始时间 */
  reportStartTime?: number;
  /** 责任单位ID */
  responsibleOrganizationIds?: number[];
  /** 状态 */
  status: string[] | [];
}

export type RepairOrderListResultModel = BasicFetchListResult<RepairOrderBaseModel>;

export interface RepairOrderBaseModel {
  /** 附属设备ID */
  auxiliaryDeviceId: number;
  /** 报修单号 */
  code: string;
  /** 报修内容 */
  content: string;
  /** 创建时间 */
  createTime: number;
  /** 创建员工Id */
  createUserId: number;
  /** 报修单创建人 */
  createUserName: string;
  /** 报修单处理结果 */
  dispatchComment: string;
  /** 调度处理时间 */
  dispatchTime: number;
  /** 调度处理人 */
  dispatchUserId: number;
  /** 调度处理人名称 */
  dispatchUserName: string;
  /** 紧急程度 A - A类 B - B类 */
  emergencyLevel: EmergencyLevel;
  /** 报修单标识符 */
  id: number;
  /** 检修单code */
  maintainOrderCode: string;
  /** 检修单ID */
  maintainOrderId: number;
  /** 报修单位ID */
  organizationId: number;
  /** 报修单位 */
  organizationName: string;
  /** 主设备类型图标 */
  primaryDeviceCategoryIcon: string;
  /** 设备ID */
  primaryDeviceId: number;
  /** 主设备名称 */
  primaryDeviceName: string;
  /** 主设备工艺号 */
  primaryDeviceProcessNo: string;
  /** 报修单处理意见 */
  processComment: string;
  /** 报修单调度处理意见 */
  processResult: string;
  /** 报修单处理时间 */
  processTime: number;
  /** 报修单处理人 */
  processUserId: number;
  /** 报修单处理人名称 */
  processUserName: string;
  /** 报修时间 */
  reportTime: number;
  /** 责任部门ID */
  responsibleOrganization: number;
  /** 责任部门名称 */
  responsibleOrganizationName: string;
  /** 报修来源 */
  source: number;
  /** 报修单状态 字典中BT_REPAIR_ORDER_STATUS 待处理/已关闭/已处理 */
  status: string;
  /** 更新时间 */
  updateTime: number;
  /** 修改员工Id */
  updateUserId: number;
  /** 用于高并发的数据版本控制 */
  versionTag: string;
}
