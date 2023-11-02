import { BasicFetchListResult } from '../../model/baseModel';

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
  /** 是否查询已超期数据 */
  overdue?: boolean;
  /** 当前页码数 */
  pageNo?: number;
  /** 一页多少条记录 0标识不分页全部显示 */
  pageSize?: number;
  /** 报修结束时间 */
  reportEndTime?: number | null;
  /** 报修开始时间 */
  reportStartTime?: number | null;
  /** 责任单位ID */
  responsibleOrganizationIds?: number[];
  /** 状态 */
  status: string[] | [];
}

export interface CurrnetReapirNum {
  num: number;
  show: boolean;
  type: string;
}

export type RepairOrderListResultModel = BasicFetchListResult<RepairOrderBaseModel> & {
  assign: boolean;
  currnetReapirNum: CurrnetReapirNum[];
};

export interface ProcessTaskModel {
  businessKey: string;
  formKey: string;
  id: string;
  name: string;
  parentTaskId: string;
}

export interface RepairOrderBaseModel {
  /** 验收备注 */
  acceptRemark: string;
  /** 验收时间 */
  acceptTime: number;
  /** 验收人 */
  acceptUserId: number;
  /** 是否报警转入 */
  alarmTransfer: boolean;
  /** 分配备注 */
  assignComment: string;
  /** 分配时间 */
  assignTime: number;
  /** 分配人id */
  assignUserId: number;
  /** 报修单号 */
  code: string;
  /** 报修内容 */
  content: string;
  /** 创建时间 */
  createTime: number;
  /** 创建员工Id、报修人、报警处理人 */
  createUserId: number;
  /** 报修人姓名 */
  createUserName: string;
  /** 设备ID */
  deviceId: number;
  /** 设备名称 */
  deviceName: string;
  /** 紧急程度 */
  emergencyLevel: string;
  /** 报修单标识符 */
  id: number;
  /** 报修部门ID */
  organization: number;
  /** 报修部门名称 */
  organizationName: string;
  /** 预计解决时间 */
  predictProcessTime: number;
  /** 主设备名称 */
  primaryDeviceName: string;
  /** 主设备编号 */
  primaryDeviceProcessNo: string;
  /** 设备编号 */
  processNo: string;
  /** 处理备注 */
  processRemark: string;
  /** 处理结果 */
  processResult: boolean;
  processTaskModel: ProcessTaskModel;
  /** 报修时间 */
  reportTime: number;
  /** 责任部门时间 */
  responsibleOrgTime: number;
  /** 责任部门用户ID */
  responsibleOrgUserId: number;
  /** 责任部门ID */
  responsibleOrganization: number;
  /** 责任部门名称 */
  responsibleOrganizationName: string;
  /** 报修单状态 字典中BT_REPAIR_ORDER_STATUS */
  status: string;
  /** 问题分类 */
  troubleCategory: string;
  /** 更新时间 */
  updateTime: number;
  /** 修改员工Id */
  updateUserId: number;
  /** 用于高并发的数据版本控制 */
  versionTag: string;
}
