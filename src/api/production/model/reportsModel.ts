import { BasicFetchListResult } from '../../model/baseModel';

export interface ProductionReportListParams {
  /** 是否正序 */
  ascending?: boolean;
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
  /** 班次标识符 */
  workShiftDetailId?: number;
}

export type ProductionReportListResultModel = BasicFetchListResult<ProductionReportBaseModel>;

export enum Type {
  原煤 = 0,
  洗选产品 = 1,
  半成品 = 2,
}

export interface Production {
  /** 数量 */
  amount: number;
  /** 产品编码 */
  code: string;
  /** 创建时间 */
  createTime: number;
  /** 创建UserID */
  createUserId: number;
  /** 标识符 */
  id: number;
  /** 接口对接产品信息 */
  interfaceProduction: string;
  /** 产品分组 */
  productionGroup: string;
  /** 产率: 产率=数量/入洗总量。保留两位小数。 */
  productivity: number;
  /** 质量指标描述 */
  qualityDesc: string;
  /** 规格 */
  spec: Type;
  /** 类型（物料类型：0、原煤 1、洗选产品 2、半成品） */
  type: string;
  /** 单位（来自数据词典，物料单位：1、吨 （暂时唯一，规避后续合计问题）） */
  unit: string;
  /** 更新时间 */
  updateTime: number;
  /** 更新UserID */
  updateUserId: number;
  /** 品种 */
  varieties: string;
  /** 用于高并发的数据版本控制 */
  versionTag: string;
}

export interface WorkingShiftDetailFullModel {
  createTime: string;
  createUserId: number;
  id: number;
  name: string;
  periodTime: number;
  productionShiftDate: string;
  showEndTime: number;
  showIsPreviousDay: boolean;
  showStartTime: number;
  startTime: number;
  updateTime: string;
  updateUserId: number;
  versionTag: string;
  workShiftId: number;
  workingShiftName: string;
}

export interface ProductionReportBaseModel {
  /** 精煤产量 */
  cleanCoalTotal: string;
  /** 煤泥产量 */
  coalSlimeTotal: string;
  /** 创建时间 */
  createTime: number;
  /** 创建UserID */
  createUserId: number;
  /** 矸石产量 */
  gangueTotal: string;
  /** 标识符 */
  id: number;
  /** 备注 */
  memo: string;
  /** 生产日期 */
  productionDate: number | string;
  /** 生产结束日期 */
  productionEndDate: number;
  /** 生产清单id-可为null为已被汇总或不使用生产清单 */
  productionListId: number;
  /** 相关产品 */
  productions: Production[];
  /** 生产计划中原煤的名称 */
  rawCoalVarieties: string;
  /** 实际产出量 */
  realOutputTotal: number;
  /** 实际入洗量 */
  realWashingTotal: number;
  /** 单位（来自数据词典，物料单位：1、吨 （暂时唯一，规避后续合计问题）） */
  unit: string;
  /** 更新时间 */
  updateTime: number;
  /** 更新UserID */
  updateUserId: number;
  /** 用于高并发的数据版本控制 */
  versionTag: string;
  /** 洗混煤产量 */
  washedCoalTotal: string;
  workingShiftDetailFullModel: WorkingShiftDetailFullModel;
  /** 班次标识符 */
  workingShiftDetailId: number;
  /** 班次名称 */
  workingShiftDetailName: string;
}
