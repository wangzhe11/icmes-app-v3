import { BasicFetchListResult } from '../../model/baseModel';

export interface MessageListParams {
  /** 是否正序 */
  ascending: boolean;
  /** 业务类型 */
  businessTypes: string[];
  /** 全局搜索 */
  globalName: string;
  /** 排序的字段名 */
  orderBy: string;
  /** 当前页码 */
  pageNo: number;
  /** 一页多少条记录 0标识不分页全部显示 */
  pageSize: number;
}

export type MessageListResultModel = BasicFetchListResult<MessageModel>;

export interface MessageModel {
  belongeUserId: number;
  businessCreateUserId: number;
  businessCreateUserName: string;
  businessData: string;
  businessKey: string;
  businessType: string;
  id: number;
  readed: boolean;
  updateTime: number;
}

export interface MessageReadResultModel {
  code: number;
}
