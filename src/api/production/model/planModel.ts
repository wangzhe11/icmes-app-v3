import { BasicFetchListResult } from '../../model/baseModel';

export interface ProductionPlanListParams {
  /** 是否正序 */
  ascending?: boolean;
  /** 是否根据当前日期查询 */
  currentDateFlag?: boolean;
  /** 计划结束日期 */
  endDate?: number;
  /** 排序的字段名 */
  orderBy?: string;
  /** 当前页码 */
  pageNo?: number;
  /** 一页多少条记录 0标识不分页全部显示 */
  pageSize?: number;
  /** 计划开始日期 */
  startDate?: number;
}

export type ProductionPlanListResultModel = BasicFetchListResult<ProductionPlanBaseModel>;

export interface Statistic {
  /** 当前计划入洗量 */
  currentPlanWashing: number;
  /** 当前实际入洗量 */
  currentRealWashing: number;
  /** 计划入洗总量 */
  planWashingTotal: number;
  /** 产品计划标识 */
  productionPlanId: number;
  /** 单位 */
  unit: string;
}

export interface ProductionPlanBaseModel {
  /** 计划单号：1、输入框内系统自动生成,必填，限制只能输入字母+数字。2、格式：JH201809001。3、流水号顺序生成，保持唯一 */
  code: string;
  /** 创建时间 */
  createTime: number;
  /** 创建UserID */
  createUserId: number;
  /** 计划结束日期 */
  endDate: number;
  /** 标识符 */
  id: number;
  /** 备注 */
  memo: string;
  /** 计划入洗总量 */
  planWashingTotal: number;
  /** 产品名字 */
  productionName: string;
  /** 进度依据 */
  rateAccording: number[];
  /** 计划开始日期 */
  startDate: number;
  /** 统计 */
  statistics: Statistic;
  /** 当前计划状态 （0 - 待生产 1 - 生产中 2 - 已结束） */
  status: number;
  /** 单位（来自数据词典，物料单位：1、吨 （暂时唯一，规避后续合计问题）） */
  unit: string;
  /** 更新时间 */
  updateTime: number;
  /** 更新UserID */
  updateUserId: number;
  /** 用于高并发的数据版本控制 */
  versionTag: string;
}
